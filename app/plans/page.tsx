'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fibrePlans } from '@/lib/data';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import {
  Check, Wifi, Zap, Shield, Phone, MapPin,
  ArrowRight, ChevronDown, ChevronUp, Star,
} from 'lucide-react';

const faqs = [
  {
    q: 'How long does installation take?',
    a: 'Installation typically takes 3–5 business days after your order is confirmed. Our engineers will call to schedule a convenient time.',
  },
  {
    q: 'Is there a data cap?',
    a: 'No. All MTN Fibre Prime plans come with unlimited data. Stream, browse and work without worrying about limits.',
  },
  {
    q: 'What router is included?',
    a: 'All plans include a free Wi-Fi 6 router. Premium plans (500 Mbps+) include a Wi-Fi 6E mesh router for whole-home coverage.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes. You can upgrade or downgrade at any time. Changes take effect within 24 hours.',
  },
  {
    q: 'Is there a contract?',
    a: 'Plans are available month-to-month. No long-term contract required.',
  },
];

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [address, setAddress] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheck = async () => {
    if (!address.trim()) return;
    setChecking(true);
    setAvailable(null);
    await new Promise((r) => setTimeout(r, 1500));
    setAvailable(true);
    setChecking(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />
      <NotificationToast />

      {/* ── Header ── */}
      <div className="pt-[var(--nav-height)] bg-black">
        <div className="page-container py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFCB00]/12
                          border border-[#FFCB00]/30 text-[#FFCB00]
                          px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Wifi size={14} />
            Fast. Reliable. Unlimited.
          </div>
          <h1 className="text-[32px] sm:text-[48px] font-bold text-white mb-4 leading-tight">
            Find Your Perfect{' '}
            <span className="text-[#FFCB00]">Fibre Plan</span>
          </h1>
          <p className="text-white/45 max-w-lg mx-auto text-base leading-relaxed">
            Blazing-fast fibre internet for Lagos homes. Unlimited data,
            free installation, and 24/7 support.
          </p>
        </div>
      </div>

      <div className="page-container py-12 space-y-16">

        {/* ── Plans grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fibrePlans.map((plan, i) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden
                           transition-all duration-300 ${
                  isSelected
                    ? 'shadow-[0_8px_32px_rgba(255,203,0,0.25)] scale-[1.02] ring-2 ring-[#FFCB00]'
                    : 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-1'
                } ${plan.highlighted ? 'bg-black' : 'bg-white border border-[#E5E5E5]'}`}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="bg-[#FFCB00] text-black text-[11px] font-bold
                                  text-center py-2 uppercase tracking-[0.1em]
                                  flex items-center justify-center gap-1">
                    <Star size={10} fill="currentColor" /> Most Popular
                  </div>
                )}

                <div className="p-6">
                  {/* Speed */}
                  <p
                    className="text-[32px] font-bold leading-none mb-1"
                    style={{ color: plan.highlighted ? '#FFCB00' : '#000' }}
                  >
                    {plan.speed}
                  </p>
                  <p className={`font-bold text-[16px] mb-4 ${plan.highlighted ? 'text-white' : 'text-black'}`}>
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="mb-5">
                    <span className={`text-[28px] font-bold ${plan.highlighted ? 'text-white' : 'text-black'}`}>
                      ₦{plan.price.toLocaleString()}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? 'text-white/40' : 'text-[#888]'}`}>
                      /month
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <Check size={13} className="text-[#FFCB00] shrink-0" />
                        <span className={plan.highlighted ? 'text-white/70' : 'text-[#555]'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 rounded-xl font-bold text-sm
                               transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-[#FFCB00] text-black'
                        : plan.highlighted
                        ? 'bg-white/15 text-white hover:bg-[#FFCB00] hover:text-black'
                        : 'bg-[#F5F5F5] text-black hover:bg-[#FFCB00]'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select Plan'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Availability checker ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-black rounded-3xl p-8 sm:p-14 text-center"
        >
          <div className="w-14 h-14 bg-[#FFCB00]/15 border border-[#FFCB00]/30
                          rounded-2xl flex items-center justify-center mx-auto mb-5">
            <MapPin size={24} className="text-[#FFCB00]" />
          </div>
          <h2 className="text-[24px] sm:text-[32px] font-bold text-white mb-3">
            Check Availability in Your Area
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Enter your Lagos address to check if MTN Fibre Prime is available
            in your neighbourhood.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Enter your address in Lagos..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              className="fp-input-dark flex-1 text-sm"
            />
            <button
              onClick={handleCheck}
              disabled={!address.trim() || checking}
              className="btn-primary px-8 py-3.5 rounded-xl whitespace-nowrap
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {checking ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent
                                   rounded-full animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Wifi size={16} /> Check Now
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {available !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="mt-6 inline-flex items-center gap-3
                           bg-emerald-500/12 border border-emerald-500/30
                           text-emerald-400 px-6 py-3.5 rounded-2xl"
              >
                <Check size={18} />
                <span className="font-semibold text-sm">
                  MTN Fibre Prime is available at your address!
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {available && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5"
            >
              <button className="btn-primary text-[15px] px-10 py-4 rounded-xl">
                Order Now — Get Connected <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* ── Why MTN Fibre ── */}
        <div>
          <h2 className="section-title text-black text-center mb-8">
            Why Choose MTN Fibre?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap size={22} className="text-[#FFCB00]" />,
                title: 'Lightning Fast',
                desc: 'Up to 1 Gbps download. Stream 4K, game online and video call — all at once.',
              },
              {
                icon: <Shield size={22} className="text-[#FFCB00]" />,
                title: '99.9% Uptime',
                desc: 'SLA-backed reliability with redundant infrastructure across Lagos.',
              },
              {
                icon: <Phone size={22} className="text-[#FFCB00]" />,
                title: '24/7 Support',
                desc: 'Nigeria-based support team available around the clock to help you.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="fp-card p-6 text-center"
              >
                <div className="w-12 h-12 bg-[#FFCB00]/10 rounded-2xl
                                flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-black mb-2">{item.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-black text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="fp-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 text-left flex items-center
                               justify-between gap-4 min-h-[56px]"
                  >
                    <span className="font-semibold text-black text-sm leading-snug">
                      {faq.q}
                    </span>
                    {isOpen
                      ? <ChevronUp size={16} className="text-[#888] shrink-0" />
                      : <ChevronDown size={16} className="text-[#888] shrink-0" />
                    }
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-[#F0F0F0]">
                          <p className="text-[#555] text-sm leading-relaxed pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
