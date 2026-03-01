import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Shield, Zap, Package } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392186847/EDzFxEe3hncyPXxwjhxxMi/hero_v2-e6HX5fNLSnR3qcagRAHsvq.webp";
const PRODUCT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392186847/EDzFxEe3hncyPXxwjhxxMi/product_hero_v2-FttRWYQzAnSZxQBgTzwe55.webp";
const DETAIL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392186847/EDzFxEe3hncyPXxwjhxxMi/feature_detail_v2-V8K9Xx4SKxLgvqwFtgFTzb.webp";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Built for the Trade",
    desc: "Heavy-gauge powder-coated steel frame rated for cable drums up to 150 kg. Designed with input from working electricians.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Zero-Drag Spin",
    desc: "Precision bearing spindle lets the drum rotate freely under load — no more kinks, no more fighting the reel.",
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Folds Flat in Seconds",
    desc: "Collapses to briefcase dimensions in under 10 seconds. Fits in the back of a ute, van, or site container.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Universal Drum Fit",
    desc: "Adjustable spindle accommodates standard drum flange sizes from 300 mm to 750 mm diameter.",
  },
];

const specs = [
  ["Max load capacity", "150 kg"],
  ["Compatible drum diameter", "300 – 750 mm"],
  ["Frame material", "Structural steel, powder-coated"],
  ["Spindle bearing", "Sealed precision roller bearing"],
  ["Folded dimensions", "700 × 400 × 80 mm"],
  ["Weight", "8.5 kg"],
  ["Finish", "Matte black / trade yellow accents"],
  ["Warranty", "2 years — parts & labour"],
];

export default function Home() {
  return (
    <div
      className="min-h-screen bg-white text-[oklch(0.08_0_0)]"
      style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif" }}
    >
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="border-b-4 border-black">
        <div className="container flex items-center justify-between py-4">
          <span
            className="text-2xl font-black tracking-tighter uppercase"
            style={{ letterSpacing: "-0.04em" }}
          >
            REEL<span className="text-[oklch(0.82_0.18_85)]">-PRO</span>
          </span>
          <Link href="/checkout">
            <button className="bg-black text-white text-sm font-bold uppercase tracking-widest px-6 py-2 hover:bg-[oklch(0.82_0.18_85)] hover:text-black transition-colors">
              Order Now — $499
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-4 border-black">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="The Briefcase on a job site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative container py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-[oklch(0.82_0.18_85)] text-sm font-bold uppercase tracking-[0.3em] mb-4">
              [ Reel-Pro — New Product ]
            </p>

            <h1
              className="text-white font-black uppercase leading-none mb-6"
              style={{
                fontSize: "clamp(4rem, 12vw, 9rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              THE<br />
              BRIEF<span className="text-[oklch(0.82_0.18_85)]">CASE</span>
            </h1>

            <div className="w-24 h-1 bg-[oklch(0.82_0.18_85)] mb-6" />

            <p className="text-white/90 text-xl md:text-2xl font-semibold uppercase tracking-wide max-w-xl mb-10">
              The cable reel stand built for electrical trades.
              Safe. Fast. Folds flat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/checkout">
                <button className="flex items-center gap-3 bg-[oklch(0.82_0.18_85)] text-black font-black uppercase tracking-widest px-8 py-4 text-lg hover:bg-white transition-colors">
                  Order Now — $499
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a href="#product">
                <button className="flex items-center gap-3 border-2 border-white text-white font-bold uppercase tracking-widest px-8 py-4 text-lg hover:bg-white hover:text-black transition-colors">
                  See Details
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT INTRO ───────────────────────────────────────────────────── */}
      <section id="product" className="border-b-4 border-black">
        <div className="container grid md:grid-cols-2 gap-0">
          <div className="border-b-4 md:border-b-0 md:border-r-4 border-black">
            <img
              src={PRODUCT_IMG}
              alt="The Briefcase cable stand — product shot"
              className="w-full h-full object-cover min-h-[320px] md:min-h-[500px]"
            />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)] mb-3">
              [ Product ]
            </p>
            <h2
              className="font-black uppercase leading-none mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
              }}
            >
              ONE STAND.<br />
              EVERY<br />
              <span className="underline decoration-[oklch(0.82_0.18_85)] decoration-4 underline-offset-4">
                JOB SITE.
              </span>
            </h2>
            <p className="text-lg font-semibold uppercase text-[oklch(0.35_0_0)] leading-relaxed mb-8">
              The Briefcase holds your cable drum off the ground, lets it spin freely,
              and folds flat when you're done. No more rolling drums down hallways.
              No more cable kinks. No more wasted time.
            </p>
            <div className="border-t-4 border-black pt-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.45_0_0)]">
                  Price
                </p>
                <p
                  className="font-black text-5xl"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  $499
                </p>
                <p className="text-xs text-[oklch(0.45_0_0)] uppercase tracking-wide mt-1">
                  AUD — inc. GST — Free shipping AU
                </p>
              </div>
              <Link href="/checkout">
                <button className="bg-black text-white font-black uppercase tracking-widest px-8 py-4 text-lg hover:bg-[oklch(0.82_0.18_85)] hover:text-black transition-colors flex items-center gap-2">
                  Order <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-[oklch(0.97_0_0)]">
        <div className="container py-16 md:py-24">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)] mb-3">
              [ Why The Briefcase ]
            </p>
            <h2
              className="font-black uppercase leading-none"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Engineered for<br />
              <span className="bg-[oklch(0.82_0.18_85)] px-2">the trade.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t-4 border-l-4 border-black">
            {features.map((f) => (
              <div
                key={f.title}
                className="border-r-4 border-b-4 border-black p-6 md:p-8"
              >
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3
                  className="font-black uppercase text-xl mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {f.title}
                </h3>
                <p className="text-[oklch(0.35_0_0)] font-semibold uppercase text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAIL / SPECS ──────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black">
        <div className="container grid md:grid-cols-5 gap-0">
          <div className="md:col-span-3 border-b-4 md:border-b-0 md:border-r-4 border-black p-8 md:p-12 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)] mb-3">
              [ Specifications ]
            </p>
            <h2
              className="font-black uppercase leading-none mb-8"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Built to last.<br />
              <span className="underline decoration-[oklch(0.82_0.18_85)] decoration-4 underline-offset-4">
                Spec sheet.
              </span>
            </h2>
            <div className="border-t-4 border-black">
              {specs.map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex justify-between items-center py-3 ${
                    i < specs.length - 1 ? "border-b-2 border-black/20" : ""
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-[oklch(0.45_0_0)]">
                    {label}
                  </span>
                  <span className="text-sm font-black uppercase text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <img
              src={DETAIL_IMG}
              alt="Briefcase spindle detail"
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────────── */}
      <section className="bg-black text-white border-b-4 border-black">
        <div className="container py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[oklch(0.82_0.18_85)] text-xs font-bold uppercase tracking-[0.3em] mb-2">
              [ Limited First Run ]
            </p>
            <h2
              className="font-black uppercase leading-none text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              GET YOURS<br />
              <span className="text-[oklch(0.82_0.18_85)]">TODAY.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-white/70 font-semibold uppercase text-sm tracking-wide max-w-xs text-left md:text-right">
              Free shipping Australia-wide. 2-year warranty. Ships within 5–7 business days.
            </p>
            <Link href="/checkout">
              <button className="flex items-center gap-3 bg-[oklch(0.82_0.18_85)] text-black font-black uppercase tracking-widest px-10 py-5 text-xl hover:bg-white transition-colors">
                Order Now — $499
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t-4 border-black bg-white">
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
          <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.45_0_0)]">
            Made in Australia
          </p>
        </div>
      </footer>
    </div>
  );
}
