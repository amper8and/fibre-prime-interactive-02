'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Wifi, Zap, Shield, Star, ChevronDown, Play, Check } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';

const stats = [
  { value: '1 Gbps', label: 'Max Speed', icon: '⚡' },
  { value: '99.9%', label: 'Uptime SLA', icon: '🛡️' },
  { value: '7+', label: 'Connected Rooms', icon: '🏠' },
  { value: '20+', label: 'Smart Devices', icon: '📱' },
];

const features = [
  { icon: '📺', title: 'Entertainment', desc: 'Stream Netflix, Showmax, DSTV in 4K with zero buffering.' },
  { icon: '🎮', title: 'Gaming', desc: 'Low-latency gaming with <5ms ping for competitive play.' },
  { icon: '💼', title: 'Work From Home', desc: 'HD video calls and fast uploads for productivity.' },
  { icon: '🏠', title: 'Smart Home', desc: 'Control lights, security, and appliances from one app.' },
  { icon: '🌱', title: 'Green Tech', desc: 'Solar + EV charging for a sustainable Lagos home.' },
  { icon: '👨‍👩‍👧', title: 'Family Safety', desc: 'Parental controls, baby monitors and family bundles.' },
];

const rooms = [
  { name: 'Living Room', icon: '🛋️', color: 'bg-amber-50 border-amber-200', href: '/experience?room=living-room' },
  { name: 'Master Bedroom', icon: '🛏️', color: 'bg-purple-50 border-purple-200', href: '/experience?room=master-bedroom' },
  { name: 'Kitchen', icon: '🍳', color: 'bg-green-50 border-green-200', href: '/experience?room=kitchen' },
  { name: 'Home Office', icon: '💼', color: 'bg-blue-50 border-blue-200', href: '/experience?room=home-office' },
  { name: 'Kids Bedroom', icon: '🧸', color: 'bg-pink-50 border-pink-200', href: '/experience?room=kids-bedroom' },
  { name: 'Patio', icon: '🌿', color: 'bg-teal-50 border-teal-200', href: '/experience?room=patio' },
  { name: 'Garage', icon: '🚗', color: 'bg-gray-50 border-gray-200', href: '/experience?room=garage' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-mtn-bg font-mtn">
      <Navigation />
      <NotificationToast />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-mtn-black via-gray-900 to-gray-800" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #FFCB00 0%, transparent 50%), radial-gradient(circle at 75% 20%, #FFCB00 0%, transparent 40%)' }} />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,203,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,203,0,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-mtn-yellow/10 border border-mtn-yellow/30 text-mtn-yellow px-4 py-2 rounded-full text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 bg-mtn-yellow rounded-full animate-pulse" />
            MTN Fibre Prime — Now in Lagos
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Not just internet.
            <br />
            <span className="text-mtn-yellow">An ecosystem.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Explore the digital twin of a connected Lagos home. Walk through 7 rooms,
            interact with smart devices, and build your perfect Fibre Prime bundle.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/experience" className="mtn-btn-primary text-base px-8 py-4 rounded-2xl shadow-lg shadow-yellow-500/20 group">
              <span>Enter the Home</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/plans" className="flex items-center gap-2 text-white border border-white/20 hover:border-white/50 px-8 py-4 rounded-2xl transition-all text-base font-semibold group">
              <Wifi size={20} />
              Check Availability
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-mtn-yellow">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* INTERACTIVE HOME PREVIEW */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mtn-black mb-4">
              Explore Every Room
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Click any room to discover the connected devices, services and bundles 
              that make life smarter with MTN Fibre Prime.
            </p>
          </motion.div>

          {/* Home floor plan grid */}
          <div className="relative bg-mtn-bg rounded-3xl p-6 sm:p-10 border-2 border-mtn-grey overflow-hidden">
            {/* Decorative label */}
            <div className="absolute top-4 right-4 bg-mtn-yellow text-mtn-black text-xs font-bold px-3 py-1 rounded-full">
              🏠 Interactive Home
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {rooms.map((room, i) => (
                <motion.div
                  key={room.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={room.href}
                    className={`room-card flex flex-col items-center justify-center p-6 border-2 ${room.color} group min-h-[120px]`}
                  >
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                      {room.icon}
                    </span>
                    <span className="text-sm font-bold text-mtn-black text-center leading-tight">
                      {room.name}
                    </span>
                    <span className="mt-2 text-xs text-mtn-yellow font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Explore <ArrowRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Full experience CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: rooms.length * 0.08 }}
              >
                <Link
                  href="/experience"
                  className="room-card flex flex-col items-center justify-center p-6 bg-mtn-black text-white border-2 border-mtn-black group min-h-[120px]"
                >
                  <Play size={32} className="mb-2 text-mtn-yellow group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-center leading-tight">Full Home Tour</span>
                  <span className="mt-1 text-xs text-gray-400">All rooms →</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 sm:px-6 bg-mtn-bg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mtn-black mb-4">
              Powered by MTN Fibre Prime
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              One platform. Every room. Every device. Every lifestyle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mtn-card p-6 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg text-mtn-black mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLE TEASER */}
      <section className="py-20 px-4 sm:px-6 bg-mtn-black text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FFCB00 0%, transparent 60%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-mtn-yellow font-bold text-sm uppercase tracking-widest mb-4">Bundle Builder</div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Build Your Perfect <br /><span className="text-mtn-yellow">Fibre Prime Bundle</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Mix and match devices, content, and services. Pay one monthly price. 
              Cancel anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Fibre 500 Mbps', 'Netflix', 'Smart TV', 'Robot Vacuum', 'Smart Lights', '+ More'].map((item) => (
                <span key={item} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                  <Check size={14} className="text-mtn-yellow" />
                  {item}
                </span>
              ))}
            </div>
            <Link href="/bundles" className="mtn-btn-primary text-base px-10 py-4 rounded-2xl">
              Build My Bundle <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-mtn-black mb-2">What Lagos homes are saying</h2>
            <div className="flex justify-center gap-1 text-mtn-yellow">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Chioma A.', loc: 'Victoria Island', quote: 'MTN Fibre changed our home completely. The kids love the gaming, I love the streaming, and my husband works from home seamlessly.', rating: 5 },
              { name: 'Emeka O.', loc: 'Lekki Phase 1', quote: 'The speed is incredible. I run video calls all day with zero drops. The smart home bundle was the best investment we made.', rating: 5 },
              { name: 'Amaka B.', loc: 'Ikeja GRA', quote: 'From the robot vacuum to the smart lighting, everything just works together. Fibre Prime is a lifestyle upgrade.', rating: 5 },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="mtn-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-mtn-yellow" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-mtn-yellow rounded-full flex items-center justify-center text-mtn-black font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-mtn-black">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.loc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 bg-mtn-yellow">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-mtn-black mb-6">
              Ready to connect your home?
            </h2>
            <p className="text-mtn-black/70 text-lg mb-10">
              Check if MTN Fibre Prime is available in your area and get connected today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plans" className="mtn-btn-secondary text-base px-10 py-4 rounded-2xl">
                <Wifi size={20} />
                Check Availability
              </Link>
              <Link href="/experience" className="mtn-btn-outline text-base px-10 py-4 rounded-2xl border-mtn-black">
                <Play size={20} />
                Explore the Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-mtn-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mtn-yellow rounded-xl flex items-center justify-center font-bold text-sm text-mtn-black">
                MTN
              </div>
              <div>
                <div className="font-bold text-white">MTN Fibre Prime</div>
                <div className="text-xs text-gray-500">Nigeria's #1 Home Fibre Experience</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link href="/experience" className="hover:text-mtn-yellow transition-colors">Home Experience</Link>
              <Link href="/marketplace" className="hover:text-mtn-yellow transition-colors">Marketplace</Link>
              <Link href="/bundles" className="hover:text-mtn-yellow transition-colors">Bundles</Link>
              <Link href="/plans" className="hover:text-mtn-yellow transition-colors">Fibre Plans</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} MTN Nigeria. All rights reserved. MTN Fibre Prime Interactive Home Experience.
          </div>
        </div>
      </footer>
    </div>
  );
}
