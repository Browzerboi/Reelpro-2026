import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { ENV } from "./_core/env";
import { markOrderPaid } from "./orderDb";

/**
 * Registers the Stripe webhook endpoint at POST /api/stripe/webhook.
 *
 * IMPORTANT: This route must be registered BEFORE express.json() middleware
 * because Stripe requires the raw request body to verify the webhook signature.
 * The raw body is captured here via express.raw().
 */
export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    // Use raw body parser so Stripe can verify the signature
    (req: Request, res: Response, next) => {
      let rawBody = "";
      req.setEncoding("utf8");
      req.on("data", (chunk: string) => {
        rawBody += chunk;
      });
      req.on("end", () => {
        (req as Request & { rawBody: string }).rawBody = rawBody;
        next();
      });
    },
    async (req: Request & { rawBody?: string }, res: Response) => {
      const sig = req.headers["stripe-signature"] as string;
      const webhookSecret = ENV.stripeWebhookSecret;

      // If no webhook secret is configured, skip signature verification (dev mode)
      let event: Stripe.Event;

      if (webhookSecret && sig) {
        try {
          const stripe = new Stripe(ENV.stripeSecretKey, {
            apiVersion: "2026-02-25.clover",
          });
          event = stripe.webhooks.constructEvent(
            req.rawBody ?? "",
            sig,
            webhookSecret
          );
        } catch (err) {
          console.error("Stripe webhook signature verification failed:", err);
          res.status(400).send(`Webhook Error: ${(err as Error).message}`);
          return;
        }
      } else {
        // No webhook secret — parse body directly (development only)
        try {
          event = JSON.parse(req.rawBody ?? "{}") as Stripe.Event;
        } catch {
          res.status(400).send("Invalid JSON");
          return;
        }
      }

      // Handle relevant events
      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            if (session.payment_status === "paid") {
              const sessionId = session.id;
              const paymentIntentId =
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : (session.payment_intent?.id ?? "");
              await markOrderPaid(sessionId, paymentIntentId);
              console.log(`Order marked as paid for session: ${sessionId}`);
            }
            break;
          }

          case "payment_intent.payment_failed": {
            const pi = event.data.object as Stripe.PaymentIntent;
            console.warn(`Payment failed for PaymentIntent: ${pi.id}`);
            break;
          }

          default:
            // Unhandled event type — ignore
            break;
        }

        res.json({ received: true });
      } catch (err) {
        console.error("Error handling Stripe webhook event:", err);
        res.status(500).send("Internal Server Error");
      }
    }
  );
}
