'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, MapPin, Shield, Sparkles, Wifi, Zap } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import SiteFooter from '@/components/ui/SiteFooter';
import { fibrePlans } from '@/lib/data';

const faqs = [
  {
    question: 'How long does installation take?',
    answer: 'Installation typically takes 3 to 5 business days after order confirmation, subject to location readiness and scheduling.',
  },
  {
    question: 'Is the service capped?',
    answer: 'The plans showcased here are designed around an unlimited home-fibre experience for streaming, work and entertainment.',
  },
  {
    question: 'Can I upgrade later?',
    answer: 'Yes. Fibre Prime is designed to support upgrades as your household usage grows and more devices come online.',
  },
  {
    question: 'Do plans include support?',
    answer: 'Every plan includes support access, while higher tiers prioritize faster resolution and stronger whole-home performance guarantees.',
  },
];

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [address, setAddress] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedPlanData = useMemo(
    () => fibrePlans.find((plan) => plan.id === selectedPlan) || fibrePlans[2],
    [selectedPlan]
  );

  const handleCheck = async () => {
    if (!address.trim()) {
      return;
    }
    setChecking(true);
    setAvailable(null);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setAvailable(true);
    setChecking(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <NotificationToast />

      <main className="pt-[calc(var(--nav-height)+0.75rem)]">
        <section className="page-container pb-10">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <div>
              <p className="section-label">Fibre plans</p>
              <h1 className="text-page mt-3 max-w-[10ch] text-black">Choose the plan that fits your home.</h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60">
                Scale from everyday streaming to a full premium connected-home setup with stronger support, lower latency and more simultaneous devices.
              </p>

              <div className="mt-8 space-y-4">
                {fibrePlans.map((plan, index) => {
                  const selected = selectedPlan === plan.id;
                  return (
                    <motion.button
                      key={plan.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, delay: index * 0.05 }}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full rounded-[28px] border p-5 text-left transition ${selected ? 'border-[#ffcb00] bg-white shadow-[0_18px_42px_rgba(255,203,0,0.16)]' : 'border-black/8 bg-white hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(5,5,5,0.08)]'}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          {plan.highlighted && <span className="rounded-full bg-[#ffcb00]/18 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black">Recommended</span>}
                          <p className="mt-3 text-[2rem] font-bold leading-none tracking-[-0.05em] text-black">{plan.speed}</p>
                          <p className="mt-2 text-base font-semibold text-black/72">{plan.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-black">N{plan.price.toLocaleString()}</p>
                          <p className="text-sm text-black/44">per month</p>
                        </div>
                      </div>
                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-black/60">
                            <Check size={14} className="text-[#8d6b00]" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6 xl:sticky xl:top-[calc(var(--nav-height)+16px)]">
              <div className="fp-card-yellow p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label text-black/48">Recommended upgrade</p>
                    <h2 className="mt-3 text-[2.4rem] font-bold leading-none tracking-[-0.05em] text-black">{selectedPlanData.speed}</h2>
                    <p className="mt-2 text-base font-semibold text-black/72">{selectedPlanData.name}</p>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                    <Wifi size={20} />
                  </div>
                </div>
                <div className="mt-6 rounded-[24px] bg-white/78 p-5">
                  <p className="text-3xl font-bold leading-none tracking-[-0.05em] text-black">N{selectedPlanData.price.toLocaleString()}<span className="ml-2 text-base font-medium tracking-normal text-black/42">per month</span></p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {selectedPlanData.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-black/64">
                        <Check size={14} className="text-[#8d6b00]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary mt-6 w-full justify-center">
                    Upgrade now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="fp-card p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcb00]/18 text-black">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="section-label">Availability</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-black">Check your address</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/58">Enter your home or office location to confirm Fibre Prime coverage.</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className="fp-input flex-1"
                    placeholder="Enter your address"
                  />
                  <button onClick={handleCheck} disabled={!address.trim() || checking} className="btn-primary disabled:cursor-not-allowed disabled:opacity-55">
                    {checking ? 'Checking...' : 'Check now'}
                  </button>
                </div>
                <AnimatePresence>
                  {available !== null && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-4 rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-700">
                      Fibre Prime is available at this address.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section className="page-container pb-12">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="fp-card p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcb00]/18 text-black">
                <Zap size={20} />
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-black">Lower latency</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/58">Responsive enough for streaming, calls, gaming and simultaneous connected-home automation.</p>
            </div>
            <div className="fp-card p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcb00]/18 text-black">
                <Shield size={20} />
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-black">Priority support</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/58">Higher tiers unlock stronger reliability and more premium support expectations for busy households.</p>
            </div>
            <div className="fp-card p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcb00]/18 text-black">
                <Sparkles size={20} />
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-black">Room-ready bundles</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/58">Plans are designed to sit beneath a room-based ecosystem of devices, media and household services.</p>
            </div>
          </div>
        </section>

        <section className="page-container pb-16">
          <div className="mx-auto max-w-3xl">
            <p className="section-label text-center">FAQ</p>
            <h2 className="section-title mt-3 text-center text-black">Questions about installation, upgrades and plan fit.</h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.question} className="fp-card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-base font-semibold text-black">{faq.question}</span>
                      <ChevronDown size={18} className={`transition ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-black/8">
                          <p className="px-5 py-5 text-sm leading-relaxed text-black/58">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

