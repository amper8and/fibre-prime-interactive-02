'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Wifi, Play, Check, ChevronDown, Zap, Shield, Clock, Home } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import BundleWidget from '@/components/ui/BundleWidget';

/* ── Fade helpers ─────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const InView = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Data ─────────────────────────────────────────── */
const rooms = [
  { id: 'living-room',    icon: '🛋️', name: 'Living Room',    theme: 'Entertainment Hub',     devices: 5 },
  { id: 'master-bedroom', icon: '🛏️', name: 'Master Bedroom', theme: 'Sleep & Comfort',       devices: 3 },
  { id: 'kitchen',        icon: '🍳', name: 'Kitchen',         theme: 'Smart Convenience',     devices: 2 },
  { id: 'home-office',    icon: '💼', name: 'Home Office',     theme: 'Productivity',          devices: 2 },
  { id: 'kids-bedroom',   icon: '🧸', name: 'Kids Bedroom',    theme: 'Safety + Fun',          devices: 3 },
  { id: 'patio',          icon: '🌿', name: 'Patio',           theme: 'Outdoor Living',        devices: 2 },
  { id: 'garage',         icon: '🚗', name: 'Garage',          theme: 'Green Technology',      devices: 2 },
];

const stats = [
  { value: '1 Gbps',  label: 'Max Speed' },
  { value: '99.9%',   label: 'Uptime SLA' },
  { value: '7',       label: 'Connected Rooms' },
  { value: '20+',     label: 'Smart Devices' },
];

const features = [
  {
    icon: <Play size={20} className="text-[#FFCB00]" />,
    title: 'Entertainment',
    desc: 'Stream Netflix, Showmax and DSTV in 4K. Completely buffer-free.',
  },
  {
    icon: <Zap size={20} className="text-[#FFCB00]" />,
    title: 'Ultra-Low Latency',
    desc: 'Sub-5ms ping for competitive gaming. Zero packet loss on video calls.',
  },
  {
    icon: <Home size={20} className="text-[#FFCB00]" />,
    title: 'Smart Home Control',
    desc: 'Lights, climate, security — all managed from a single app.',
  },
  {
    icon: <Shield size={20} className="text-[#FFCB00]" />,
    title: 'Family Safety',
    desc: 'Parental controls, baby monitors and family bundles built in.',
  },
  {
    icon: <Clock size={20} className="text-[#FFCB00]" />,
    title: '24 / 7 Support',
    desc: 'Nigeria-based team available round the clock with SLA-backed uptime.',
  },
  {
    icon: <Wifi size={20} className="text-[#FFCB00]" />,
    title: 'Whole-Home Coverage',
    desc: 'Wi-Fi 6 mesh router included. Every room, full signal, no dead zones.',
  },
];

const testimonials = [
  {
    name: 'Chioma A.', loc: 'Victoria Island', init: 'C',
    quote: 'MTN Fibre transformed our home. The kids love gaming, I love streaming, my husband works from home — zero drops.',
  },
  {
    name: 'Emeka O.', loc: 'Lekki Phase 1', init: 'E',
    quote: 'Unreal speeds. I run HD video calls all day. The smart home bundle was the best investment we\'ve made.',
  },
  {
    name: 'Amaka B.', loc: 'Ikeja GRA', init: 'A',
    quote: 'Robot vacuum, smart lighting, everything works together seamlessly. Fibre Prime is a lifestyle upgrade.',
  },
];

const bundleItems = ['Fibre 500 Mbps', 'Netflix', 'Smart TV', 'Robot Vacuum', 'Smart Lights', 'Solar System'];

/* ── Page ─────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-[MTN_Brighter_Sans,system-ui,sans-serif]">
      <Navigation />
      <NotificationToast />
      <BundleWidget />

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden pt-[var(--nav-height)]">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Yellow radial glow */}
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2
                     w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,203,0,0.08) 0%, transparent 65%)' }}
        />
        {/* Decorative house silhouette hint */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.03] pointer-events-none
                     hidden lg:block"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(255,203,0,0.4) 0%, transparent 60%)',
          }}
        />

        <div className="page-container relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Pill badge */}
            <FadeUp delay={0}>
              <div
                className="inline-flex items-center gap-2 mb-8
                           border border-[#FFCB00]/25 text-[#FFCB00]
                           text-[11px] font-bold uppercase tracking-[0.14em]
                           px-4 py-2 rounded-full"
              >
                <span className="w-1.5 h-1.5 bg-[#FFCB00] rounded-full animate-pulse" />
                Now Live in Lagos
              </div>
            </FadeUp>

            {/* Headline */}
            <FadeUp delay={0.08}>
              <h1 className="text-hero text-white mb-6">
                Not just internet.
                <br />
                <span className="text-[#FFCB00]">An ecosystem.</span>
              </h1>
            </FadeUp>

            {/* Sub */}
            <FadeUp delay={0.16}>
              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-[520px]">
                Explore the digital twin of a connected Lagos home. Interact with smart
                devices across 7 rooms and build your perfect Fibre Prime bundle.
              </p>
            </FadeUp>

            {/* CTA row */}
            <FadeUp delay={0.24} className="flex flex-wrap items-center gap-4">
              <Link href="/experience" className="btn-primary text-[15px] px-8 py-4 rounded-xl group">
                Enter the Home
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/plans" className="btn-ghost text-[15px] px-8 py-4 rounded-xl">
                <Wifi size={18} />
                Check Availability
              </Link>
            </FadeUp>

            {/* Stats */}
            <FadeUp delay={0.38}>
              <div className="flex flex-wrap gap-8 mt-16 pt-12 border-t border-white/8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[#FFCB00] text-[22px] font-bold leading-none">{s.value}</p>
                    <p className="text-white/35 text-[12px] mt-1 tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ─── ROOMS OVERVIEW ───────────────────────────────── */}
      <section className="section bg-[#F5F5F5]">
        <div className="page-container">
          <InView className="text-center mb-12">
            <p className="section-label mb-3">Interactive Experience</p>
            <h2 className="section-title text-black">Explore Every Room</h2>
            <p className="text-[#888] text-base mt-3 max-w-md mx-auto leading-relaxed">
              Click any room to discover the devices, services and bundles that make life smarter.
            </p>
          </InView>

          {/* House card */}
          <div
            className="bg-white rounded-[20px] border border-[#E5E5E5] p-6 sm:p-10"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 bg-[#FFCB00] rounded-lg flex items-center justify-center
                             font-bold text-[11px] text-black"
                >
                  MTN
                </div>
                <span className="font-bold text-black text-sm">3-Bedroom Lagos Smart Home</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#888]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All systems online
              </div>
            </div>

            {/* Rooms grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {rooms.map((room, i) => (
                <InView key={room.id} delay={i * 0.055}>
                  <Link
                    href={`/experience?room=${room.id}`}
                    className="group fp-card flex flex-col
                               p-5 min-h-[120px]
                               hover:-translate-y-1 hover:border-[#FFCB00]/50
                               hover:shadow-[0_8px_24px_rgba(255,203,0,0.12)]
                               transition-all duration-200"
                  >
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">
                      {room.icon}
                    </span>
                    <p className="font-bold text-[13px] text-black leading-tight mb-0.5">
                      {room.name}
                    </p>
                    <p className="text-[#888] text-[11px]">{room.theme}</p>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <span className="text-[10px] text-[#888]">{room.devices} devices</span>
                      <span
                        className="text-[10px] font-bold text-[#FFCB00]
                                   opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Explore →
                      </span>
                    </div>
                  </Link>
                </InView>
              ))}

              {/* Full tour card */}
              <InView delay={rooms.length * 0.055}>
                <Link
                  href="/experience"
                  className="group flex flex-col items-center justify-center
                             min-h-[120px] fp-card-dark rounded-[12px]
                             text-center p-5
                             hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                             transition-all duration-200 border border-white/6"
                >
                  <div
                    className="w-11 h-11 rounded-full bg-[#FFCB00]/15 border border-[#FFCB00]/30
                               flex items-center justify-center mb-3
                               group-hover:bg-[#FFCB00]/25 transition-colors"
                  >
                    <Play size={18} className="text-[#FFCB00]" />
                  </div>
                  <p className="font-bold text-white text-[13px]">Full Home Tour</p>
                  <p className="text-white/35 text-[11px] mt-0.5">All 7 rooms →</p>
                </Link>
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="page-container">
          <InView className="text-center mb-12">
            <p className="section-label mb-3">Powered by Fibre Prime</p>
            <h2 className="section-title text-black">One Platform. Every Room.</h2>
          </InView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <InView key={f.title} delay={i * 0.07}>
                <div
                  className="fp-card p-6 hover:-translate-y-1
                             hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]
                             hover:border-[#FFCB00]/30
                             transition-all duration-200 group"
                >
                  <div
                    className="w-11 h-11 bg-[#FFCB00]/10 rounded-xl
                               flex items-center justify-center mb-4
                               group-hover:bg-[#FFCB00]/20 transition-colors duration-200"
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-black mb-2 text-[15px]">{f.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUNDLE CTA ───────────────────────────────────── */}
      <section className="section bg-black">
        <div className="page-container">
          <InView className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-4">Bundle Builder</p>
            <h2 className="text-page text-white mb-5 leading-tight">
              Build Your Perfect
              <br />
              <span className="text-[#FFCB00]">Fibre Prime Bundle</span>
            </h2>
            <p className="text-white/45 text-base mb-10 leading-relaxed">
              Mix devices, content and services into one monthly subscription.
              Cancel anytime.
            </p>

            {/* Bundle items preview */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {bundleItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5
                             border border-white/12 bg-white/4
                             text-white/65 text-xs font-medium
                             px-3.5 py-1.5 rounded-full"
                >
                  <Check size={10} className="text-[#FFCB00]" />
                  {item}
                </span>
              ))}
            </div>

            <Link href="/bundles" className="btn-primary text-[15px] px-10 py-4 rounded-xl">
              Build My Bundle
              <ArrowRight size={18} />
            </Link>
          </InView>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="section bg-[#F5F5F5]">
        <div className="page-container">
          <InView className="text-center mb-12">
            <p className="section-label mb-3">Customer Stories</p>
            <h2 className="section-title text-black">What Lagos homes are saying</h2>
          </InView>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((r, i) => (
              <InView key={r.name} delay={i * 0.1}>
                <div className="fp-card p-6 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-[#FFCB00] text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-[#555] text-sm leading-relaxed flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#E5E5E5]">
                    <div
                      className="w-10 h-10 bg-[#FFCB00] rounded-full
                                 flex items-center justify-center
                                 font-bold text-sm text-black shrink-0"
                    >
                      {r.init}
                    </div>
                    <div>
                      <p className="font-bold text-[13px] text-black">{r.name}</p>
                      <p className="text-[#AAA] text-[12px]">{r.loc}</p>
                    </div>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────── */}
      <section className="section bg-[#FFCB00]">
        <div className="page-container text-center">
          <InView>
            <h2 className="section-title text-black mb-4">
              Ready to connect your home?
            </h2>
            <p className="text-black/55 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Check if MTN Fibre Prime is available in your area and get started today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/plans" className="btn-secondary px-10 py-4 rounded-xl text-[15px]">
                <Wifi size={18} /> Check Availability
              </Link>
              <Link
                href="/experience"
                className="btn-ghost-dark px-8 py-4 rounded-xl text-[15px]"
              >
                <Play size={18} /> Explore the Home
              </Link>
            </div>
          </InView>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/8 py-12">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 bg-[#FFCB00] rounded-lg flex items-center justify-center
                           font-bold text-[11px] text-black"
              >
                MTN
              </div>
              <div>
                <p className="text-white font-bold text-sm">Fibre Prime</p>
                <p className="text-white/25 text-[11px]">Nigeria's #1 Home Fibre</p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-6 text-[13px] text-white/35">
              {[
                { href: '/experience',  l: 'Home Experience' },
                { href: '/marketplace', l: 'Marketplace' },
                { href: '/bundles',     l: 'Bundles' },
                { href: '/plans',       l: 'Fibre Plans' },
              ].map(({ href, l }) => (
                <Link key={href} href={href} className="hover:text-white transition-colors duration-150">
                  {l}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-white/8">
            <p className="text-white/18 text-xs text-center">
              © {new Date().getFullYear()} MTN Nigeria Communications Plc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
