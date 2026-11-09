/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Check, 
  Sparkles, 
  Music, 
  FileText, 
  Zap, 
  Layers, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ThumbsUp,
  Hash,
  ArrowRight,
  Flame,
  Sliders,
  Target
} from "lucide-react";

import VideoPlayerMock from "./components/VideoPlayerMock";
import FaqSection from "./components/FaqSection";
import SocialProofToast from "./components/SocialProofToast";
import CheckoutModal from "./components/CheckoutModal";
import TestimonialsSection from "./components/TestimonialsSection";
import { BenefitCard } from "./types";

const benefitsData: BenefitCard[] = [
  {
    id: "frases",
    title: "PRO MUSICAL LICKS",
    description: "Carefully curated bass licks and fills engineered to add flavor, color, and melodic sophistication to your basslines.",
    label: "Direct & Practical",
    iconName: "music"
  },
  {
    id: "impacto",
    title: "HIGH-IMPACT CHOPS",
    description: "Expressive, head-turning fills designed for standout moments that elevate your playing and surprise the crowd.",
    label: "Phrasing & Timing",
    iconName: "flame"
  },
  {
    id: "ritmicas",
    title: "🥁 GROOVE & POCKET RUNS",
    description: "Rhythmically locked patterns focused on timing, ghost notes, and pocket feel to glue your tone directly to the kick drum.",
    label: "Rhythmic Precision",
    iconName: "target"
  },
  {
    id: "versoes",
    title: "3 PRACTICE TEMPOS & TRACKS",
    description: "Every single lick comes with:\n\n• Full Backing Track to hear the lick in a real musical mix.\n• Metronome Track to lock in the exact entrance and tempo.\n• Slow Motion Breakdown to master every note effortlessly.",
    label: "Accelerated Mastery",
    iconName: "sliders"
  },
  {
    id: "tablaturas",
    title: "FULL BASS TABLATURES (PDF)",
    description: "Note-for-note bass tabs for every lick, making it easier to learn the notes, fingerings, and fretboard positions.",
    label: "Accurate Tabs Included",
    iconName: "fileText"
  },
  {
    id: "acesso",
    title: "INSTANT DIGITAL ACCESS",
    description: "As soon as your order is confirmed, you get immediate access to the full library delivered straight to your inbox.",
    label: "Lifetime Access",
    iconName: "clock"
  },
  {
    id: "membros",
    title: "EXCLUSIVE MEMBER PORTAL",
    description: "Stream video breakdown lessons, download tabs, and access audio backing tracks organized in a clean, modern, high-speed portal.",
    label: "Private Member Portal",
    iconName: "lock"
  }
];

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Countdown Timer of 15 minutes
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("bass_countdown_time");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 15 * 60;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = prev <= 1 ? 15 * 60 : prev - 1;
        localStorage.setItem("bass_countdown_time", nextTime.toString());
        return nextTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to render lucide icons dynamically
  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-brand-orange" };
    switch (name) {
      case "music": return <Music {...props} />;
      case "flame": return <Flame {...props} />;
      case "sliders": return <Sliders {...props} />;
      case "hash": return <Hash {...props} />;
      case "fileText": return <FileText {...props} />;
      case "zap": return <Zap {...props} />;
      case "layers": return <Layers {...props} />;
      case "clock": return <Clock {...props} />;
      case "target": return <Target {...props} />;
      case "lock": return <Lock {...props} />;
      default: return <Music {...props} />;
    }
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleScrollToOffer = () => {
    const ctaSection = document.getElementById("cta-section");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-orange selection:text-white relative overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] ambient-glow-orange pointer-events-none opacity-40" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] ambient-glow-amber pointer-events-none opacity-30" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] ambient-glow-orange pointer-events-none opacity-30" />

      {/* Header Announcement Badge */}
      <div className="w-full bg-red-600 py-2 px-4 text-center relative z-50">
        <p className="text-xs md:text-sm font-bold text-white flex items-center justify-center gap-2 truncate">
          <Clock className="w-4 h-4 text-white animate-pulse flex-shrink-0" />
          <span>🔥 Final days to claim your exclusive promotional discount!</span>
        </p>
      </div>

      <main className="w-full space-y-24 py-12 md:py-20">
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero-section" className="text-center space-y-8 max-w-6xl mx-auto px-6">
          {/* Main Headings */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-mono uppercase tracking-[0.25em] text-slate-400 font-medium">
              Every great bassist has one secret weapon:
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold italic tracking-tight text-white uppercase leading-none">
              A massive repertoire of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber drop-shadow-[0_2px_15px_rgba(249,115,22,0.3)] px-2">PRO LICKS</span> ready to go.
            </h1>
          </div>

          {/* Cover Artwork directly below headline with fast-loading optimization */}
          <div className="w-full max-w-sm md:max-w-md mx-auto aspect-square relative group">
            {/* Glowing border frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-amber rounded-2xl blur opacity-35 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/40 via-white/5 to-brand-amber/40 rounded-2xl p-[1px]">
              <div className="h-full w-full bg-brand-dark rounded-2xl overflow-hidden relative">
                <img
                  src="/hero-artwork.webp"
                  alt="The Bass Lick Library"
                  width={600}
                  height={600}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Headline description paragraph */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed px-4">
              An exclusive library of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold">HIGH-IMPACT</span> bass licks, fills, and runs designed for you to practice, adapt, and craft basslines that command attention.
            </p>
            
            <div className="flex justify-center items-center">
              <button 
                onClick={handleScrollToOffer}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold text-white text-sm tracking-wide uppercase hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 group"
              >
                Get My Bass Lick Library
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= DEMO VIDEO SECTION ================= */}
        <section id="video-section" className="text-center space-y-10 py-10 max-w-6xl mx-auto px-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold italic tracking-tight text-white uppercase">
              Battle-tested licks ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber px-2">practice and apply</span>
            </h2>
          </div>

          {/* Styled Demo Image */}
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-brand-card shadow-2xl shadow-brand-orange/5 group">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-amber rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
            <img
              src="/sample-licks-fills.webp"
              alt="Sample Licks & Fills"
              width={1200}
              height={675}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover rounded-2xl relative z-10 transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
        </section>

        {/* ================= GRID / BENEFITS SECTION ================= */}
        <section className="space-y-14 py-10 relative max-w-6xl mx-auto px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] ambient-glow-orange pointer-events-none opacity-20" />
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-orange">
              HD Video Lessons + Backing Tracks + Full Bass Tabs
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold italic tracking-tight text-white uppercase">
              Everything Included <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber px-2">Inside</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {benefitsData.map((item) => (
              <div
                key={item.id}
                className="group relative p-6 md:p-8 rounded-2xl bg-brand-card/40 border border-white/[0.05] hover:border-brand-orange/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-6 hover:shadow-xl hover:shadow-brand-orange/5"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/30 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="space-y-4">
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shadow-inner">
                    {renderIcon(item.iconName)}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white uppercase font-display tracking-tight group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Badge Bottom label */}
                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-amber font-semibold tracking-wide uppercase flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-brand-orange" />
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS SECTION ================= */}
        <div className="!mt-8 md:!mt-12 w-full">
          <TestimonialsSection />
        </div>

        {/* ================= WHY STUDY PHRASES SECTION ================= */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="py-16 md:py-24 relative z-10 border-t border-b border-white/[0.04] overflow-hidden w-full bg-gradient-to-b from-brand-dark via-brand-orange/[0.04] to-brand-dark"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] ambient-glow-orange pointer-events-none opacity-10 blur-3xl" />
          
          <div className="max-w-3xl mx-auto px-6 space-y-8 relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-orange flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                WHY STUDY PRO LICKS & FILLS?
              </span>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white uppercase italic tracking-tight leading-none">
                THE FASTEST SHORTCUT TO A <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber drop-shadow-[0_2px_10px_rgba(249,115,22,0.2)] px-2">PRO BASS SOUND</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed pt-2">
                <p>
                  Great bassists don't create every single idea from scratch on stage or in the studio.
                </p>
                <p>
                  They build a deep mental library of licks, adapt proven phrases on the fly, and weave them naturally into their own musical style.
                </p>
                <p>
                  The larger your repertoire of fills and licks, the more effortlessly you'll build captivating basslines, improvise with rock-solid confidence, and sound seasoned.
                </p>
                <p className="text-white font-semibold border-l-2 border-brand-orange pl-3 py-0.5">
                  The Bass Lick Library was created specifically to accelerate this exact process—giving you practical, battle-tested ideas you can study, adapt, and apply today.
                </p>
              </div>
            </div>

            {/* Três pequenos benefícios com ícones */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-brand-orange/15 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Music className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base uppercase font-display tracking-wide">
                    Expand Your Musical Vocabulary
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    Discover melodic pathways and rhythmic hooks that turn simple root-note grooves into pro-level basslines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-brand-orange/15 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Zap className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base uppercase font-display tracking-wide">
                    Never Run Out of Ideas Again
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    Say goodbye to "bassist's block" and repetitive patterns when creating bass parts or taking a solo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-brand-orange/15 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Target className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base uppercase font-display tracking-wide">
                    Study Ready Licks & Adapt Them
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    Absorb authentic musical phrasing quickly and integrate it directly into your own signature sound.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= CTA BUY SECTION ================= */}
        <section id="cta-section" className="py-12 relative z-10 max-w-xl mx-auto px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-amber rounded-3xl blur-2xl opacity-10 -z-10" />

          {/* Urgency countdown timer */}
          <div className="mb-6 inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/25 px-5 py-2.5 rounded-full shadow-inner animate-pulse">
            <Clock className="w-4 h-4 text-brand-orange" />
            <span className="text-sm md:text-base font-semibold text-white tracking-wide">
              Special Discount Offer Expires In: <span className="text-brand-orange font-mono font-bold">{formatTime(timeLeft)}</span>
            </span>
          </div>

          {/* Golden Badge Border styling */}
          <div className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-b from-[#121634]/90 to-brand-card/90 border border-brand-orange/30 shadow-2xl space-y-8">
            <div className="flex justify-center">
              <span className="px-4 py-1.5 rounded-full bg-brand-orange text-white font-mono text-xs font-bold uppercase tracking-wider animate-pulse shadow-md shadow-brand-orange/20">
                START TODAY & LEVEL UP
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-slate-400 text-sm font-medium">
                Regular Price <span className="line-through text-red-500 font-bold">$38</span> — Special Today:
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-brand-orange">$</span>
                <span className="text-7xl md:text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-none drop-shadow-md px-2">
                  26
                </span>
              </div>
              <p className="text-2xs font-mono text-brand-amber uppercase tracking-widest pt-2">
                * One-time payment. Lifetime access. No subscriptions.
              </p>

              <div className="pt-6 pb-4 border-t border-white/[0.05] text-left max-w-xs md:max-w-sm mx-auto space-y-2.5">
                {[
                  "The Bass Lick Library",
                  "Instant Private Member Portal Access",
                  "Pro Musical Licks & Fills",
                  "High-Impact Lead Chops & Runs",
                  "Complete Note-for-Note Bass Tabs (PDF)",
                  "Rhythmic Grooves & Pocket Exercises",
                  "Full High-Quality Backing Tracks",
                  "Metronome Practice Speed Tracks",
                  "Slow Motion Breakdown Video Lessons",
                  "Complete High-Definition Video Lessons",
                  "Direct Member Support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-brand-orange font-bold text-base select-none leading-none shrink-0">✔</span>
                    <span className="font-medium text-slate-200 leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Big Action Button */}
            <div className="space-y-4">
              <a
                id="btn-checkout-hotmart"
                href="https://pay.hotmart.com/T107153142I"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  try {
                    // Preserva os parâmetros UTM atuais da URL no link da Hotmart
                    const currentParams = window.location.search;
                    if (currentParams && currentParams.length > 1) {
                      const baseHotmart = "https://pay.hotmart.com/T107153142I";
                      const cleanParams = currentParams.startsWith('?') ? currentParams.substring(1) : currentParams;
                      e.currentTarget.href = `${baseHotmart}?${cleanParams}`;
                    }
                  } catch (err) {
                    // fallback silencioso
                  }
                }}
                className="btn-checkout go-to-checkout utmify-btn w-full py-5 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold text-white text-base tracking-wider uppercase hover:opacity-95 transition-all cursor-pointer shadow-xl shadow-brand-orange/25 flex justify-center items-center gap-2 group relative overflow-hidden"
              >
                {/* Simple shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
                
                <span>GET INSTANT ACCESS</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secure checkout seals */}
              <div className="flex justify-center items-center gap-6 text-[10px] font-mono text-slate-400 pt-2 border-t border-white/[0.04]">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-brand-orange" />
                  100% Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  Instant Access
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-brand-orange" />
                  Satisfaction Guarantee
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <FaqSection />

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="w-full border-t border-white/[0.05] bg-black/40 py-10 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-1.5 text-slate-400 text-sm">
          <p className="font-bold text-white font-display tracking-wider uppercase">THE BASS LICK LIBRARY</p>
          <p className="text-xs text-slate-500">All rights reserved © 2026. Made for bass players, by bass players.</p>
        </div>
      </footer>

      {/* ================= POPUP / PORTAL WIDGETS ================= */}
      <SocialProofToast />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        price={26.0}
      />
    </div>
  );
}
