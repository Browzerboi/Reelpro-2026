import { Link, useLocation } from "wouter";
import { CheckCircle2, ArrowLeft, Package, Truck, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function OrderConfirmation() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id") ?? "";

  const { data: order, isLoading } = trpc.orders.getBySessionId.useQuery(
    { sessionId },
    { enabled: !!sessionId, retry: 3, retryDelay: 1500 }
  );

  return (
    <div
      className="min-h-screen bg-white text-[oklch(0.08_0_0)]"
      style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif" }}
    >
      {/* NAV */}
      <nav className="border-b-4 border-black">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <span
              className="text-2xl font-black tracking-tighter uppercase cursor-pointer"
              style={{ letterSpacing: "-0.04em" }}
            >
              REEL<span className="text-[oklch(0.82_0.18_85)]">-PRO</span>
            </span>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[oklch(0.45_0_0)] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </button>
          </Link>
        </div>
      </nav>

      <div className="container py-12 md:py-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-black border-t-[oklch(0.82_0.18_85)] rounded-full animate-spin" />
            <p className="font-black uppercase text-lg tracking-widest">Confirming your order...</p>
          </div>
        ) : (
          <>
            {/* Success header */}
            <div className="border-b-4 border-black pb-10 mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-black flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-[oklch(0.82_0.18_85)]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)]">
                    [ Order Confirmed ]
                  </p>
                  <h1
                    className="font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 5rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.9,
                    }}
                  >
                    THANK<br />
                    <span className="text-[oklch(0.82_0.18_85)]">YOU.</span>
                  </h1>
                </div>
              </div>
              <p className="text-lg font-semibold uppercase text-[oklch(0.35_0_0)] max-w-xl">
                Your order for <strong>The Briefcase</strong> has been received and payment confirmed.
                A confirmation email will be sent to{" "}
                <strong>{order?.customerEmail ?? "your email address"}</strong>.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 lg:gap-12">
              {/* Order details */}
              <div>
                <h2
                  className="font-black uppercase text-2xl border-b-4 border-black pb-3 mb-6"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Order Details
                </h2>

                {order ? (
                  <div className="border-4 border-black">
                    {/* Product row */}
                    <div className="border-b-4 border-black p-5 flex justify-between items-center">
                      <div>
                        <p className="font-black uppercase text-lg" style={{ letterSpacing: "-0.02em" }}>
                          {order.productName}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-wide text-[oklch(0.45_0_0)]">
                          Qty: {order.quantity}
                        </p>
                      </div>
                      <p
                        className="font-black text-3xl"
                        style={{ letterSpacing: "-0.04em" }}
                      >
                        ${(order.amountCents / 100).toFixed(2)}
                      </p>
                    </div>

                    {/* Shipping */}
                    <div className="border-b-4 border-black p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)] mb-2">
                        Shipping To
                      </p>
                      <p className="font-black uppercase text-base">{order.customerName}</p>
                      {order.companyName && (
                        <p className="font-semibold uppercase text-sm text-[oklch(0.45_0_0)]">
                          {order.companyName}
                        </p>
                      )}
                      <p className="font-semibold uppercase text-sm mt-1">
                        {order.shippingLine1}
                        {order.shippingLine2 ? `, ${order.shippingLine2}` : ""}
                      </p>
                      <p className="font-semibold uppercase text-sm">
                        {order.shippingCity} {order.shippingState} {order.shippingPostcode}
                      </p>
                      <p className="font-semibold uppercase text-sm">{order.shippingCountry}</p>
                    </div>

                    {/* Status */}
                    <div className="p-5 flex justify-between items-center">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)]">
                        Payment Status
                      </p>
                      <span
                        className={`text-xs font-black uppercase tracking-widest px-3 py-1 ${
                          order.status === "paid"
                            ? "bg-[oklch(0.82_0.18_85)] text-black"
                            : "bg-[oklch(0.93_0_0)] text-[oklch(0.45_0_0)]"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="border-4 border-black p-8 text-center">
                    <p className="font-bold uppercase text-[oklch(0.45_0_0)] text-sm tracking-wide">
                      Order details are being processed. Check your email for confirmation.
                    </p>
                  </div>
                )}
              </div>

              {/* What's next */}
              <div className="mt-10 lg:mt-0">
                <h2
                  className="font-black uppercase text-2xl border-b-4 border-black pb-3 mb-6"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  What Happens Next
                </h2>
                <div className="flex flex-col gap-0 border-t-4 border-l-4 border-black">
                  {[
                    {
                      icon: <CheckCircle2 className="w-5 h-5" />,
                      title: "Order Confirmed",
                      desc: "Your payment has been processed securely via Stripe.",
                    },
                    {
                      icon: <Package className="w-5 h-5" />,
                      title: "Packed & Prepared",
                      desc: "Your Briefcase will be packed and prepared for dispatch within 1–2 business days.",
                    },
                    {
                      icon: <Truck className="w-5 h-5" />,
                      title: "Shipped",
                      desc: "You'll receive a tracking number via email once your order has been dispatched.",
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      title: "Delivered",
                      desc: "Estimated delivery: 5–7 business days Australia-wide.",
                    },
                  ].map((step) => (
                    <div
                      key={step.title}
                      className="border-r-4 border-b-4 border-black p-5 flex gap-4"
                    >
                      <div className="w-9 h-9 bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.icon}
                      </div>
                      <div>
                        <p className="font-black uppercase text-base" style={{ letterSpacing: "-0.01em" }}>
                          {step.title}
                        </p>
                        <p className="text-sm font-semibold uppercase text-[oklch(0.45_0_0)] leading-relaxed mt-1">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/">
                    <button className="w-full flex items-center justify-center gap-3 border-4 border-black text-black font-black uppercase tracking-widest py-4 text-lg hover:bg-black hover:text-white transition-colors">
                      <ArrowLeft className="w-5 h-5" />
                      Back to Reel-Pro
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t-4 border-black bg-white mt-16">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-xl font-black tracking-tighter uppercase"
            style={{ letterSpacing: "-0.04em" }}
          >
            REEL<span className="text-[oklch(0.82_0.18_85)]">-PRO</span>
          </span>
          <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.45_0_0)]">
            © 2026 Reel-Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
