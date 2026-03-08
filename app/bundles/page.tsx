'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Minus, Package, Sparkles, Star, Trash2, Zap } from 'lucide-react';
import DevicePanel from '@/components/device-panels/DevicePanel';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import SiteFooter from '@/components/ui/SiteFooter';
import { bundleItemsCatalog, bundles, devices, fibrePlans, rooms } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';

const builderSteps = ['Select fibre', 'Customize bundle', 'Review and subscribe'];

export default function BundlesPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const { bundleItems, addToBundle, removeFromBundle, clearBundle, getBundleTotal, setActiveDevice } = useAppStore();
  const total = getBundleTotal();

  return (
    <div className="min-h-screen">
      <Navigation />
      <NotificationToast />
      <DevicePanel />

      <main className="pt-[calc(var(--nav-height)+0.75rem)]">
        <section className="page-container pb-8">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div>
              <p className="section-label">Bundle builder</p>
              <h1 className="text-page mt-3 max-w-[10ch] text-black">Build your bundle.</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/60">
                Combine your fibre plan with devices and services, then review the total monthly connected-home package.
              </p>

              <div className="mt-8 grid gap-3 rounded-[26px] border border-black/8 bg-white/76 p-5 backdrop-blur-sm sm:grid-cols-3">
                {builderSteps.map((step, index) => (
                  <div key={step}>
                    <p className={`text-sm font-semibold ${index === 1 ? 'text-black' : 'text-black/48'}`}>Step {index + 1}</p>
                    <p className="mt-1 text-base font-bold text-black">{step}</p>
                    <div className="mt-4 h-1.5 rounded-full bg-black/8">
                      <div className={`h-full rounded-full ${index <= 1 ? 'bg-[#ffcb00]' : 'bg-transparent'}`} style={{ width: index === 1 ? '72%' : '100%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fp-card-yellow overflow-hidden p-4 sm:p-5">
              <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div className="rounded-[24px] bg-black p-6 text-white">
                  <p className="section-label text-white/42">Your summary</p>
                  <p className="mt-3 text-[2.2rem] font-bold leading-none tracking-[-0.05em]">N{total.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-white/58">Current monthly bundle value</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/46">Design principle</p>
                  <p className="mt-2 text-xl font-bold tracking-[-0.04em] text-black">One household subscription with room-by-room control.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-container pb-16">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ffcb00] text-sm font-bold text-black">1</div>
                  <div>
                    <p className="section-label">Foundation</p>
                    <h2 className="text-2xl font-bold tracking-[-0.04em] text-black">Choose your fibre plan</h2>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {fibrePlans.map((plan, index) => {
                    const selected = selectedPlan === plan.id;
                    return (
                      <motion.button
                        key={plan.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.32, delay: index * 0.04 }}
                        onClick={() => {
                          setSelectedPlan(plan.id);
                          addToBundle('fibre-connection');
                        }}
                        className={`rounded-[28px] border p-5 text-left transition ${selected ? 'border-[#ffcb00] bg-white shadow-[0_20px_45px_rgba(255,203,0,0.16)]' : 'border-black/8 bg-white hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(5,5,5,0.08)]'}`}
                      >
                        {plan.highlighted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#ffcb00]/18 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black">
                            <Star size={11} fill="currentColor" />
                            Recommended
                          </span>
                        )}
                        <p className="mt-4 text-[2rem] font-bold leading-none tracking-[-0.05em] text-black">{plan.speed}</p>
                        <p className="mt-2 text-base font-semibold text-black/75">{plan.name}</p>
                        <p className="mt-4 text-xl font-bold text-black">N{plan.price.toLocaleString()}<span className="text-sm font-medium text-black/40"> / month</span></p>
                        <div className="mt-5 space-y-2">
                          {plan.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-black/60">
                              <Check size={14} className="text-[#8b6b00]" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ffcb00] text-sm font-bold text-black">2</div>
                  <div>
                    <p className="section-label">Customization</p>
                    <h2 className="text-2xl font-bold tracking-[-0.04em] text-black">Add devices by room</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {Object.values(rooms).map((room) => {
                    const roomDevices = room.devices.map((id) => devices[id]).filter(Boolean);
                    const addedCount = roomDevices.filter((device) => bundleItems.includes(device.id)).length;
                    return (
                      <section key={room.id} className="fp-card overflow-hidden p-5 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/8 pb-5">
                          <div>
                            <p className="section-label">{room.theme}</p>
                            <h3 className="mt-2 text-[1.8rem] font-bold leading-none tracking-[-0.05em] text-black">{room.name}</h3>
                          </div>
                          <span className="rounded-full bg-black/5 px-4 py-2 text-sm font-semibold text-black/64">{addedCount} selected</span>
                        </div>
                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                          {roomDevices.map((device) => {
                            const inBundle = bundleItems.includes(device.id);
                            return (
                              <div key={device.id} className={`rounded-[24px] border p-4 transition ${inBundle ? 'border-[#ffcb00]/55 bg-[#fff8da]' : 'border-black/8 bg-[#faf8f2]'}`}>
                                <div className="flex items-start justify-between gap-3">
                                  <button onClick={() => setActiveDevice(device)} className="text-left">
                                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg shadow-[inset_0_0_0_1px_rgba(5,5,5,0.06)]">{device.icon}</div>
                                    <p className="mt-4 text-xl font-bold leading-none tracking-[-0.04em] text-black">{device.name}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-black/58">N{device.monthlyPrice.toLocaleString()} / month</p>
                                  </button>
                                  <button
                                    onClick={() => (inBundle ? removeFromBundle(device.id) : addToBundle(device.id))}
                                    className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition ${inBundle ? 'bg-black text-white' : 'bg-[#ffcb00] text-black'}`}
                                  >
                                    {inBundle ? <Minus size={15} /> : <Package size={15} />}
                                    {inBundle ? 'Remove' : 'Add'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </section>
            </div>

            <aside className="space-y-5 xl:sticky xl:top-[calc(var(--nav-height)+16px)]">
              <div className="fp-card overflow-hidden">
                <div className="bg-black px-6 py-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="section-label text-white/38">Review</p>
                      <h2 className="mt-2 text-[2.2rem] font-bold leading-none tracking-[-0.05em]">Your bundle</h2>
                    </div>
                    {bundleItems.length > 0 && (
                      <button onClick={clearBundle} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/56 transition hover:bg-white/12 hover:text-white">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-white/56">{bundleItems.length} selections currently active</p>
                </div>

                <div className="p-6">
                  {bundleItems.length === 0 ? (
                    <div className="rounded-[24px] border border-dashed border-black/12 bg-[#faf8f2] p-8 text-center">
                      <p className="text-lg font-bold text-black">Your bundle is empty.</p>
                      <p className="mt-2 text-sm leading-relaxed text-black/56">Select a plan and add devices from the left to begin building your connected-home package.</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
                        {bundleItems.map((id) => {
                          const item = bundleItemsCatalog[id];
                          if (!item) {
                            return null;
                          }
                          return (
                            <div key={id} className="flex items-center justify-between gap-3 rounded-[22px] border border-black/8 bg-[#faf8f2] px-4 py-4">
                              <div className="min-w-0">
                                <p className="truncate text-base font-bold text-black">{item.name}</p>
                                <p className="mt-1 text-sm text-black/52">N{item.monthlyPrice.toLocaleString()} / month</p>
                              </div>
                              <button
                                onClick={() => removeFromBundle(id)}
                                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black/48 shadow-[inset_0_0_0_1px_rgba(5,5,5,0.08)] transition hover:text-red-500"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Minus size={14} />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-6 rounded-[26px] border border-black/8 bg-[#f7f3e9] p-5">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/42">Total</p>
                            <p className="mt-2 text-[2.5rem] font-bold leading-none tracking-[-0.05em] text-black">N{total.toLocaleString()}</p>
                          </div>
                          <p className="text-sm text-black/48">per month</p>
                        </div>
                        <button className="btn-primary mt-5 w-full justify-center">
                          Subscribe now
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="fp-card-dark p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label text-white/38">Shortcuts</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-white">Pre-built bundles</h3>
                  </div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffcb00]/18 text-[#ffcb00]">
                    <Zap size={19} />
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {Object.values(bundles).slice(0, 3).map((bundle) => (
                    <div key={bundle.id} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-bold text-white">{bundle.name}</p>
                          <p className="mt-2 text-sm leading-relaxed text-white/56">{bundle.description}</p>
                        </div>
                        {bundle.highlighted && <span className="rounded-full bg-[#ffcb00] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black">Popular</span>}
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="text-lg font-bold text-white">N{bundle.monthlyPrice.toLocaleString()}<span className="text-sm font-medium text-white/42"> / month</span></p>
                        <button onClick={() => bundle.devices.forEach((id) => addToBundle(id))} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16">
                          Use bundle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/marketplace" className="btn-ghost mt-5 w-full justify-center">
                  <Sparkles size={16} />
                  Add marketplace services
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

