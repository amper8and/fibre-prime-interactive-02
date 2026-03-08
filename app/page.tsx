'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Play, ShieldCheck, Sparkles, Wifi, Zap } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import BundleWidget from '@/components/ui/BundleWidget';
import SiteFooter from '@/components/ui/SiteFooter';
import { assetPath } from '@/lib/site';

const heroStats = [
  { value: '12+', label: 'Devices online' },
  { value: '7', label: 'Immersive rooms' },
  { value: '1 Gbps', label: 'Peak throughput' },
  { value: '24/7', label: 'Premium support' },
];

const promiseCards = [
  {
    title: 'Ultra-fast fibre speeds',
    copy: 'Whole-home throughput designed for streaming, gaming, video calls and simultaneous device use.',
    image: assetPath('/mockups/exterior-view.png'),
  },
  {
    title: 'Seamless smart-home integration',
    copy: 'Room scenes, connected appliances, security and entertainment all coordinated through one experience.',
    image: assetPath('/mockups/home-office-experience.png'),
  },
  {
    title: 'Advanced security and control',
    copy: 'Security, parental controls and device monitoring remain visible wherever you are in the home.',
    image: assetPath('/mockups/device-management.png'),
  },
  {
    title: 'Premium entertainment everywhere',
    copy: 'Content, hardware and connectivity are bundled into a single household ecosystem.',
    image: assetPath('/mockups/living-room-experience.png'),
  },
];

const roomCards = [
  { href: '/experience?room=living-room', title: 'Living Room', copy: 'Streaming, gaming and ambient comfort.', image: assetPath('/mockups/living-room-experience.png') },
  { href: '/experience?room=kitchen', title: 'Kitchen', copy: 'Recipes, deliveries and household automation.', image: assetPath('/mockups/kitchen-experience.png') },
  { href: '/experience?room=home-office', title: 'Home Office', copy: 'Reliable productivity for work-from-home routines.', image: assetPath('/mockups/home-office-experience.png') },
  { href: '/experience?room=garage', title: 'Garage', copy: 'Energy systems, solar monitoring and EV readiness.', image: assetPath('/mockups/garage-experience.png') },
];

const ecosystemPoints = [
  'Interactive home exploration with room-based navigation',
  'Unified bundle builder for plans, services and devices',
  'Context-aware scenes for comfort, focus and family routines',
  'Marketplace discovery for content, hardware and household services',
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <NotificationToast />
      <BundleWidget />

      <main>
        <section className="relative overflow-hidden pt-[calc(var(--nav-height)+1rem)]">
          <div className="page-container grid gap-10 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/74 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black/64 backdrop-blur-md">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                MTN Fibre Prime connected
              </div>

              <h1 className="text-hero mt-6 max-w-[11ch] text-black">
                Experience the connected home.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/64">
                Explore a premium interactive household where fibre, media, devices and home services work together as one responsive ecosystem.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/experience" className="btn-primary px-7">
                  Enter the home
                  <ArrowRight size={16} />
                </Link>
                <Link href="/bundles" className="btn-secondary px-7">
                  <Sparkles size={16} />
                  Build my bundle
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="metric-card bg-white/80 backdrop-blur-sm">
                    <p className="text-lg font-bold text-black">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-black/45">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="relative"
            >
              <div className="absolute inset-x-[12%] top-8 h-[72%] rounded-full bg-[#ffcb00]/22 blur-3xl" />
              <div className="media-frame rounded-[40px] bg-transparent p-3">
                <div className="relative aspect-[1.12/0.86] overflow-hidden rounded-[32px] bg-[#f5f2eb]">
                  <img src={assetPath('/mockups/exterior-view.png')} alt="Connected MTN Fibre Prime home" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 right-6 glass-panel max-w-[270px] p-4 sm:right-10">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcb00] text-black">
                    <Wifi size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">Whole-home orchestration</p>
                    <p className="mt-1 text-xs leading-relaxed text-black/58">
                      A spatial interface built around rooms, devices and subscription layers.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-sm">
          <div className="page-container grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {promiseCards.map((card, index) => (
              <motion.article key={card.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }} className="fp-card-hover overflow-hidden bg-white/82">
                <div className="relative aspect-[1.4/0.8] overflow-hidden border-b border-black/8">
                  <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-lg font-bold text-black">{card.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{card.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="page-container">
            <motion.div {...fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Interactive rooms</p>
                <h2 className="section-title mt-3 max-w-xl text-black">A cinematic walkthrough of how Fibre Prime improves life in every part of the home.</h2>
              </div>
              <Link href="/experience" className="btn-ghost-dark w-fit">
                <Play size={16} />
                Explore all rooms
              </Link>
            </motion.div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {roomCards.map((room, index) => (
                <motion.div key={room.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }}>
                  <Link href={room.href} className="media-frame block overflow-hidden rounded-[34px] bg-white">
                    <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
                      <div className="relative min-h-[280px]">
                        <img src={room.image} alt={room.title} className="absolute inset-0 h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between p-7">
                        <div>
                          <p className="section-label">Room experience</p>
                          <h3 className="mt-3 text-[2rem] font-bold leading-none tracking-[-0.04em] text-black">{room.title}</h3>
                          <p className="mt-4 text-sm leading-relaxed text-black/60">{room.copy}</p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-black">
                          View room controls
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div {...fadeUp} className="fp-card-dark p-8 sm:p-10">
              <p className="section-label text-white/45">Why the platform works</p>
              <h2 className="section-title mt-3 max-w-[12ch] text-white">Designed around lived household experiences, not product lists.</h2>
              <div className="mt-8 space-y-4">
                {ecosystemPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/4 px-4 py-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ffcb00] text-black">
                      <Check size={15} />
                    </span>
                    <p className="text-sm leading-relaxed text-white/76">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="grid gap-4 sm:grid-cols-2">
              <div className="fp-card p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcb00]/18 text-black">
                  <Zap size={22} />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-black">Service layering</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  Broadband, entertainment, devices and home services can be bundled into one recurring household plan.
                </p>
              </div>
              <div className="fp-card p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcb00]/18 text-black">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-black">Context visibility</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  Users always know which room they are in, what is active, and how each device contributes to the home setup.
                </p>
              </div>
              <div className="fp-card p-7 sm:col-span-2">
                <div className="relative aspect-[1.8/0.78] overflow-hidden rounded-[24px] border border-black/8">
                  <img src={assetPath('/mockups/interactive-home.png')} alt="Interactive home preview" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <div className="page-container">
            <motion.div {...fadeUp} className="fp-card-yellow overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <p className="section-label text-black/52">Bundle builder</p>
                  <h2 className="section-title mt-3 max-w-[12ch] text-black">Build a premium household stack with one monthly commitment.</h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-black/66">
                    Start with fibre, layer on devices and content, and review the full experience before you subscribe.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/bundles" className="btn-primary px-7">
                      Build bundle
                      <ArrowRight size={16} />
                    </Link>
                    <Link href="/plans" className="btn-secondary px-7">
                      View plans
                    </Link>
                  </div>
                </div>

                <div className="media-frame rounded-[30px] bg-white/70 p-3">
                  <div className="relative aspect-[1.2/0.86] overflow-hidden rounded-[24px]">
                    <img src={assetPath('/mockups/bundle-builder.png')} alt="Bundle builder preview" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}




