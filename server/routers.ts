import Stripe from "stripe";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createOrder, getOrderById, getOrderBySessionId } from "./orderDb";
import { BRIEFCASE } from "./products";
import { orders } from "../drizzle/schema";
import { getDb } from "./db";
import { ENV } from "./_core/env";

const stripe = new Stripe(ENV.stripeSecretKey || process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

const shippingSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  companyName: z.string().optional(),
  abn: z.string().optional(),
  shippingLine1: z.string().min(1),
  shippingLine2: z.string().optional(),
  shippingCity: z.string().min(1),
  shippingState: z.string().min(1),
  shippingPostcode: z.string().min(1),
  shippingCountry: z.string().default("Australia"),
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  orders: router({
    createCheckout: publicProcedure
      .input(shippingSchema)
      .mutation(async ({ input, ctx }) => {
        const origin =
          (ctx.req.headers.origin as string) ||
          (ctx.req.headers.referer as string)?.replace(/\/$/, "") ||
          "http://localhost:3000";

        // Attempt to create an order record in the DB.
        // If the DB is unavailable (e.g. local dev without DATABASE_URL),
        // we fall back to creating the Stripe session without an order ID.
        let orderId: number | null = null;
        try {
          const order = await createOrder({
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone ?? null,
            companyName: input.companyName ?? null,
            abn: input.abn ?? null,
            shippingLine1: input.shippingLine1,
            shippingLine2: input.shippingLine2 ?? null,
            shippingCity: input.shippingCity,
            shippingState: input.shippingState,
            shippingPostcode: input.shippingPostcode,
            shippingCountry: input.shippingCountry,
            productName: BRIEFCASE.name,
            quantity: 1,
            amountCents: BRIEFCASE.priceCents,
            status: "pending",
          });
          orderId = order.id;
        } catch (err) {
          console.warn("[Orders] DB unavailable — proceeding without order record:", (err as Error).message);
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: BRIEFCASE.currency,
                product_data: {
                  name: BRIEFCASE.name,
                  description: BRIEFCASE.description,
                  images: [BRIEFCASE.imageUrl],
                },
                unit_amount: BRIEFCASE.priceCents,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          customer_email: input.customerEmail,
          ...(orderId !== null ? { client_reference_id: orderId.toString() } : {}),
          metadata: {
            ...(orderId !== null ? { order_id: orderId.toString() } : {}),
            customer_name: input.customerName,
            customer_email: input.customerEmail,
          },
          success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/checkout?cancelled=1`,
          allow_promotion_codes: true,
        });

        // Update the order with the Stripe session ID if we have a DB record
        if (orderId !== null) {
          const db = await getDb();
          if (db) {
            await db
              .update(orders)
              .set({ stripeSessionId: session.id })
              .where(eq(orders.id, orderId));
          }
        }

        return { checkoutUrl: session.url, orderId };
      }),

    getBySessionId: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        return getOrderBySessionId(input.sessionId);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getOrderById(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
