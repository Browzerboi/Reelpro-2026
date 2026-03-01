import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const PRODUCT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392186847/EDzFxEe3hncyPXxwjhxxMi/product_hero_d2fd42a9.jpg";

const AU_STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

type FormData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string;
  abn: string;
  shippingLine1: string;
  shippingLine2: string;
  shippingCity: string;
  shippingState: string;
  shippingPostcode: string;
  shippingCountry: string;
};

const empty: FormData = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  companyName: "",
  abn: "",
  shippingLine1: "",
  shippingLine2: "",
  shippingCity: "",
  shippingState: "",
  shippingPostcode: "",
  shippingCountry: "Australia",
};

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black uppercase tracking-widest text-[oklch(0.08_0_0)]">
        {label}
        {required && <span className="text-[oklch(0.82_0.18_85)] ml-1">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-[oklch(0.55_0_0)] uppercase tracking-wide font-semibold">
          {hint}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "border-2 border-black bg-white px-4 py-3 text-base font-semibold uppercase tracking-wide focus:outline-none focus:border-[oklch(0.82_0.18_85)] transition-colors placeholder:text-[oklch(0.7_0_0)] placeholder:font-normal placeholder:normal-case";

export default function Checkout() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [, navigate] = useLocation();

  const checkout = trpc.orders.createCheckout.useMutation({
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        toast.success("Redirecting to secure payment...");
        window.open(data.checkoutUrl, "_blank");
      }
    },
    onError: (err) => {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    },
  });

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.customerName.trim()) e.customerName = "Required";
    if (!form.customerEmail.trim()) e.customerEmail = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail))
      e.customerEmail = "Invalid email";
    if (!form.shippingLine1.trim()) e.shippingLine1 = "Required";
    if (!form.shippingCity.trim()) e.shippingCity = "Required";
    if (!form.shippingState.trim()) e.shippingState = "Required";
    if (!form.shippingPostcode.trim()) e.shippingPostcode = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    checkout.mutate(form);
  };

  const cancelled = new URLSearchParams(window.location.search).get("cancelled") === "1";

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
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </Link>
        </div>
      </nav>

      {/* Cancelled banner */}
      {cancelled && (
        <div className="bg-[oklch(0.97_0_0)] border-b-4 border-black">
          <div className="container py-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[oklch(0.55_0.22_27)]" />
            <p className="text-sm font-bold uppercase tracking-wide">
              Your payment was cancelled. You can try again below.
            </p>
          </div>
        </div>
      )}

      <div className="container py-12 md:py-16">
        {/* Page heading */}
        <div className="mb-10 border-b-4 border-black pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)] mb-2">
            [ Checkout ]
          </p>
          <h1
            className="font-black uppercase leading-none"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
          >
            YOUR<br />
            <span className="text-[oklch(0.82_0.18_85)]">ORDER</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-0 lg:gap-12">
          {/* ── FORM ──────────────────────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-8"
          >
            {/* Contact */}
            <div>
              <h2
                className="font-black uppercase text-2xl border-b-4 border-black pb-3 mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Contact Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <input
                    className={inputClass + (errors.customerName ? " border-red-500" : "")}
                    placeholder="John Smith"
                    value={form.customerName}
                    onChange={set("customerName")}
                  />
                  {errors.customerName && (
                    <span className="text-xs text-red-600 font-bold uppercase">{errors.customerName}</span>
                  )}
                </Field>
                <Field label="Email Address" required>
                  <input
                    type="email"
                    className={inputClass + (errors.customerEmail ? " border-red-500" : "")}
                    placeholder="john@example.com"
                    value={form.customerEmail}
                    onChange={set("customerEmail")}
                  />
                  {errors.customerEmail && (
                    <span className="text-xs text-red-600 font-bold uppercase">{errors.customerEmail}</span>
                  )}
                </Field>
                <Field label="Phone Number" hint="Optional">
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="0400 000 000"
                    value={form.customerPhone}
                    onChange={set("customerPhone")}
                  />
                </Field>
                <Field label="Company Name" hint="Optional">
                  <input
                    className={inputClass}
                    placeholder="Smith Electrical Pty Ltd"
                    value={form.companyName}
                    onChange={set("companyName")}
                  />
                </Field>
                <Field label="ABN" hint="Optional — for trade invoicing">
                  <input
                    className={inputClass}
                    placeholder="12 345 678 901"
                    value={form.abn}
                    onChange={set("abn")}
                  />
                </Field>
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2
                className="font-black uppercase text-2xl border-b-4 border-black pb-3 mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Shipping Address
              </h2>
              <div className="flex flex-col gap-4">
                <Field label="Street Address" required>
                  <input
                    className={inputClass + (errors.shippingLine1 ? " border-red-500" : "")}
                    placeholder="123 Trade Street"
                    value={form.shippingLine1}
                    onChange={set("shippingLine1")}
                  />
                  {errors.shippingLine1 && (
                    <span className="text-xs text-red-600 font-bold uppercase">{errors.shippingLine1}</span>
                  )}
                </Field>
                <Field label="Apartment / Suite / Unit" hint="Optional">
                  <input
                    className={inputClass}
                    placeholder="Unit 4"
                    value={form.shippingLine2}
                    onChange={set("shippingLine2")}
                  />
                </Field>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="City / Suburb" required>
                    <input
                      className={inputClass + (errors.shippingCity ? " border-red-500" : "")}
                      placeholder="Melbourne"
                      value={form.shippingCity}
                      onChange={set("shippingCity")}
                    />
                    {errors.shippingCity && (
                      <span className="text-xs text-red-600 font-bold uppercase">{errors.shippingCity}</span>
                    )}
                  </Field>
                  <Field label="State" required>
                    <select
                      className={inputClass + " cursor-pointer" + (errors.shippingState ? " border-red-500" : "")}
                      value={form.shippingState}
                      onChange={set("shippingState")}
                    >
                      <option value="">Select</option>
                      {AU_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.shippingState && (
                      <span className="text-xs text-red-600 font-bold uppercase">{errors.shippingState}</span>
                    )}
                  </Field>
                  <Field label="Postcode" required>
                    <input
                      className={inputClass + (errors.shippingPostcode ? " border-red-500" : "")}
                      placeholder="3000"
                      value={form.shippingPostcode}
                      onChange={set("shippingPostcode")}
                    />
                    {errors.shippingPostcode && (
                      <span className="text-xs text-red-600 font-bold uppercase">{errors.shippingPostcode}</span>
                    )}
                  </Field>
                </div>
                <Field label="Country">
                  <input
                    className={inputClass + " bg-[oklch(0.95_0_0)] cursor-not-allowed"}
                    value="Australia"
                    readOnly
                  />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={checkout.isPending}
              className="flex items-center justify-center gap-3 bg-black text-white font-black uppercase tracking-widest py-5 text-xl hover:bg-[oklch(0.82_0.18_85)] hover:text-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {checkout.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-xs font-bold uppercase tracking-wide text-[oklch(0.55_0_0)] text-center">
              You will be redirected to Stripe's secure checkout to complete payment.
            </p>
          </form>

          {/* ── ORDER SUMMARY ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 mt-10 lg:mt-0">
            <div className="border-4 border-black sticky top-6">
              <div className="border-b-4 border-black p-5">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)] mb-1">
                  [ Order Summary ]
                </p>
                <h2
                  className="font-black uppercase text-2xl"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  The Briefcase
                </h2>
              </div>
              <div className="p-0">
                <img
                  src={PRODUCT_IMG}
                  alt="The Briefcase"
                  className="w-full object-cover border-b-4 border-black"
                  style={{ maxHeight: 220 }}
                />
              </div>
              <div className="p-5 border-b-4 border-black flex flex-col gap-2">
                <div className="flex justify-between text-sm font-bold uppercase tracking-wide">
                  <span>The Briefcase × 1</span>
                  <span>$499.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold uppercase tracking-wide text-[oklch(0.45_0_0)]">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold uppercase tracking-wide text-[oklch(0.45_0_0)]">
                  <span>GST included</span>
                  <span>$45.36</span>
                </div>
              </div>
              <div className="p-5 flex justify-between items-center">
                <span className="font-black uppercase text-lg tracking-tight">Total</span>
                <span
                  className="font-black text-4xl"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  $499
                </span>
              </div>
              <div className="px-5 pb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[oklch(0.55_0_0)] border-t-2 border-black/20 pt-4">
                  Free shipping Australia-wide. 2-year warranty. Ships within 5–7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
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
