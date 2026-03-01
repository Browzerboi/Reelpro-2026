import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Shield, Zap, Package } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392186847/EDzFxEe3hncyPXxwjhxxMi/hero_v5-kY4WcSZNczYowBFdV6F5Fz.webp";
const PRODUCT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392186847/EDzFxEe3hncyPXxwjhxxMi/product_v5-JyncS8zPkScrcCmvpmko4U.webp";
const DETAIL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392186847/EDzFxEe3hncyPXxwjhxxMi/detail_v5-U7tYuHXeqUan3YEcEXomCp.webp";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Built for the Trade",
    desc: "Heavy-duty powder-coated steel panels rated for cable drums up to 150 kg. Designed by electricians, for electricians.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Zero-Drag Spin",
    desc: "The drum axle rests on sealed precision roller bearings at the top of each panel. The drum spins freely under full load — no kinks, no fighting the reel.",
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Folds Flat in Seconds",
    desc: "The two panels separate and stack flat for transport. Four 25 mm magnets on each panel snap them together securely — no straps, no clips, no fuss.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Universal Drum Fit",
    desc: "The axle cradle accommodates standard cable drum flange sizes. Drop the drum in from the top — no threading, no assembly.",
  },
];

const specs = [
  ["Max load capacity", "150 kg"],
  ["Compatible drum diameter", "300 – 750 mm"],
  ["Panel material", "Structural steel, powder-coated matte black"],
  ["Bearing type", "Sealed precision roller bearing"],
  ["Magnets per panel", "4 × 25 mm neodymium"],
  ["Feet", "Yellow rubber levelling feet"],
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
            className="text-4xl font-black uppercase leading-none"
            style={{ letterSpacing: "-0.05em" }}
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
              Drop the drum in. Pull cable. Pack flat.
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
              Two solid steel panels. Drop your drum axle into the top bearing cradles.
              Pull cable freely with zero drag. When the job's done, the panels snap
              together magnetically and pack flat — no tools, no straps, no wasted time.
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

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-[oklch(0.08_0_0)] text-white">
        <div className="container py-16 md:py-24">
          <div className="mb-12">
            <p className="text-[oklch(0.82_0.18_85)] text-xs font-bold uppercase tracking-[0.3em] mb-3">
              [ How It Works ]
            </p>
            <h2
              className="font-black uppercase leading-none text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Three steps.<br />
              <span className="text-[oklch(0.82_0.18_85)]">That's it.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t-4 border-l-4 border-white/20">
            {[
              {
                step: "01",
                title: "Unfold",
                desc: "Pull the two panels apart — they separate instantly. Stand them upright, parallel to each other. Four rubber feet on each panel keep them stable on any surface. No tools. No assembly.",
              },
              {
                step: "02",
                title: "Load Drum",
                desc: "Lift your cable drum and drop the axle down into the open bearing cradles at the top of each panel. The drum sits between the two panels, elevated off the ground, ready to spin.",
              },
              {
                step: "03",
                title: "Pull Cable",
                desc: "Walk the cable out. The drum rotates freely on sealed precision bearings — zero drag, zero kinks. When you're done, lift the drum out, bring the panels together and the 4 × 25 mm magnets on each side snap them flat for easy carry and storage.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="border-r-4 border-b-4 border-white/20 p-8 md:p-10 flex flex-col gap-4"
              >
                <span
                  className="font-black text-[oklch(0.82_0.18_85)] leading-none"
                  style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.05em" }}
                >
                  {step}
                </span>
                <h3
                  className="font-black uppercase text-white"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
                >
                  {title}
                </h3>
                <div className="w-12 h-1 bg-[oklch(0.82_0.18_85)]" />
                <p className="text-white/70 font-semibold uppercase text-sm leading-relaxed">
                  {desc}
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
              alt="Briefcase bearing cradle detail"
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────────── */}
      <section className="border-b-4 border-black bg-[oklch(0.97_0_0)]">
        <div className="container py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[oklch(0.45_0_0)] mb-10">
            [ From the Trade ]
          </p>
          <div className="border-l-8 border-[oklch(0.82_0.18_85)] pl-8 md:pl-12 max-w-4xl">
            <blockquote
              className="font-black uppercase leading-tight text-[oklch(0.08_0_0)] mb-8"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              &ldquo;I've been pulling cable for 15 years and this thing has already
              saved me hours on site. Drop the drum in, pull cable, snap it shut and
              carry it out. Should've existed years ago.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                <span className="text-[oklch(0.82_0.18_85)] font-black text-xl">J</span>
              </div>
              <div>
                <p className="font-black uppercase text-lg" style={{ letterSpacing: "-0.02em" }}>
                  John
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.45_0_0)]">
                  Licensed Electrician — 15 years on the tools
                </p>
              </div>
            </div>
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
