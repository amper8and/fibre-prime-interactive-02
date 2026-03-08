'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { devices, rooms, bundles, fibrePlans } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import DevicePanel from '@/components/device-panels/DevicePanel';
import { Trash2, Plus, Minus, Zap, Check, ShoppingBag, ArrowRight, Package, Star } from 'lucide-react';
import Link from 'next/link';

export default function BundlesPage() {
  const { bundleItems, addToBundle, removeFromBundle, clearBundle, getBundleTotal, setActiveDevice } = useAppStore();
  const total = getBundleTotal();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />
      <NotificationToast />
      <DevicePanel />

      {/* ── Header ── */}
      <div className="pt-[var(--nav-height)] bg-black">
        <div className="page-container py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFCB00]/15 border border-[#FFCB00]/30
                            rounded-xl flex items-center justify-center">
              <Package size={20} className="text-[#FFCB00]" />
            </div>
            <div>
              <h1 className="text-[28px] sm:text-[32px] font-bold text-white leading-tight">
                Bundle Builder
              </h1>
              <p className="text-white/40 text-sm mt-0.5">
                Build your custom Fibre Prime bundle — one monthly price.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Configure ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Fibre Plan */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-[#FFCB00] rounded-lg flex items-center justify-center
                                font-bold text-[12px] text-black">
                  1
                </div>
                <h2 className="font-bold text-[17px] text-black">Choose Your Fibre Plan</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fibrePlans.map((plan) => {
                  const selected = bundleItems.includes('fibre-connection') && plan.highlighted;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => addToBundle('fibre-connection')}
                      className={`p-5 rounded-2xl border-2 text-left transition-all
                                 hover:border-[#FFCB00]/60 group relative ${
                        plan.highlighted
                          ? selected
                            ? 'border-[#FFCB00] bg-[#FFCB00]/6'
                            : 'border-[#FFCB00]/45 bg-[#FFCB00]/4'
                          : selected
                          ? 'border-[#FFCB00] bg-[#FFCB00]/4'
                          : 'border-[#E5E5E5] bg-white hover:bg-[#FAFAFA]'
                      }`}
                    >
                      {plan.highlighted && (
                        <div className="flex items-center gap-1 text-[10px] font-bold
                                        text-[#FFCB00] uppercase tracking-wider mb-3">
                          <Star size={9} fill="#FFCB00" /> Most Popular
                        </div>
                      )}
                      <div className="text-[26px] font-bold text-black mb-0.5">{plan.speed}</div>
                      <div className="font-semibold text-sm text-black mb-2">{plan.name}</div>
                      <div className="text-[22px] font-bold text-black mb-3">
                        ₦{plan.price.toLocaleString()}
                        <span className="text-sm font-normal text-[#888]">/mo</span>
                      </div>
                      <div className="space-y-1.5">
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-[12px] text-[#555]">
                            <Check size={11} className="text-emerald-500 shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Devices by room */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-[#FFCB00] rounded-lg flex items-center justify-center
                                font-bold text-[12px] text-black">
                  2
                </div>
                <h2 className="font-bold text-[17px] text-black">Add Devices & Services</h2>
              </div>

              <div className="space-y-4">
                {Object.values(rooms).map((room) => {
                  const roomDevices = room.devices.map((id) => devices[id]).filter(Boolean);
                  const addedCount  = roomDevices.filter((d) => bundleItems.includes(d.id)).length;

                  return (
                    <div
                      key={room.id}
                      className="fp-card rounded-2xl overflow-hidden"
                    >
                      {/* Room header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0F0F0]">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{room.icon}</span>
                          <div>
                            <p className="font-bold text-black text-[14px]">{room.name}</p>
                            <p className="text-[11px] text-[#888]">{room.theme}</p>
                          </div>
                        </div>
                        {addedCount > 0 && (
                          <span className="text-[11px] font-bold text-[#FFCB00] bg-[#FFCB00]/10
                                           border border-[#FFCB00]/30 px-2.5 py-1 rounded-full">
                            {addedCount} added
                          </span>
                        )}
                      </div>

                      {/* Devices */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-x-0 divide-y sm:divide-y-0 divide-[#F0F0F0]">
                        {roomDevices.map((device) => {
                          const inBundle = bundleItems.includes(device.id);
                          return (
                            <div
                              key={device.id}
                              className={`flex items-center justify-between p-4 transition-colors ${
                                inBundle ? 'bg-[#FFFDF0]' : 'hover:bg-[#FAFAFA]'
                              }`}
                            >
                              <button
                                onClick={() => setActiveDevice(device)}
                                className="flex items-center gap-3 flex-1 text-left group"
                              >
                                <span className="text-2xl shrink-0">{device.icon}</span>
                                <div className="min-w-0">
                                  <p className="text-[13px] font-bold text-black truncate leading-tight">
                                    {device.name}
                                  </p>
                                  <p className="text-[11px] text-[#888] mt-0.5">
                                    ₦{device.monthlyPrice.toLocaleString()}/mo
                                  </p>
                                </div>
                              </button>

                              <button
                                onClick={() => inBundle ? removeFromBundle(device.id) : addToBundle(device.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center
                                           flex-shrink-0 ml-3 transition-all ${
                                  inBundle
                                    ? 'bg-[#FFCB00] text-black hover:bg-red-400 hover:text-white'
                                    : 'bg-[#F5F5F5] border border-[#E5E5E5] hover:bg-[#FFCB00] hover:border-[#FFCB00]'
                                }`}
                                aria-label={inBundle ? `Remove ${device.name}` : `Add ${device.name}`}
                              >
                                {inBundle ? <Minus size={13} /> : <Plus size={13} />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-[calc(var(--nav-height)+24px)] space-y-4">

              {/* Bundle summary card */}
              <div className="fp-card rounded-2xl overflow-hidden">
                {/* Dark header */}
                <div className="bg-black px-5 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={18} className="text-[#FFCB00]" />
                      <h3 className="text-white font-bold text-[16px]">Your Bundle</h3>
                    </div>
                    {bundleItems.length > 0 && (
                      <button
                        onClick={clearBundle}
                        className="w-8 h-8 rounded-lg flex items-center justify-center
                                   text-white/40 hover:text-red-400 hover:bg-white/6
                                   transition-all"
                        aria-label="Clear bundle"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                  <p className="text-white/35 text-[12px] mt-1.5">
                    {bundleItems.length} {bundleItems.length === 1 ? 'item' : 'items'} selected
                  </p>
                </div>

                <div className="p-5">
                  {bundleItems.length === 0 ? (
                    <div className="text-center py-10">
                      <span className="text-4xl block mb-3">📦</span>
                      <p className="text-[#555] text-sm font-semibold">Your bundle is empty</p>
                      <p className="text-[#AAA] text-xs mt-1">Add devices from the left to get started.</p>
                    </div>
                  ) : (
                    <>
                      {/* Items list */}
                      <div className="space-y-0 max-h-[280px] overflow-y-auto -mx-1 px-1">
                        <AnimatePresence>
                          {bundleItems.map((id) => {
                            const device = devices[id];
                            if (!device) return null;
                            return (
                              <motion.div
                                key={id}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between py-3
                                           border-b border-[#F0F0F0] last:border-0"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="text-[18px]">{device.icon}</span>
                                  <div>
                                    <p className="text-[12px] font-semibold text-black leading-tight">
                                      {device.name}
                                    </p>
                                    <p className="text-[10px] text-[#888]">
                                      ₦{device.monthlyPrice.toLocaleString()}/mo
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFromBundle(id)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center
                                             text-[#CCC] hover:text-red-400 hover:bg-red-50
                                             transition-all"
                                  aria-label={`Remove ${device.name}`}
                                >
                                  <Minus size={13} />
                                </button>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>

                      {/* Total */}
                      <div className="mt-4 pt-4 border-t-2 border-[#F0F0F0]">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-[#555] text-sm">Monthly Total</span>
                          <span className="text-[26px] font-bold text-black">
                            ₦{total.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#AAA] mb-5">
                          Billed monthly. Cancel anytime.
                        </p>

                        <button className="btn-primary w-full text-sm rounded-xl mb-2">
                          Get This Bundle <ArrowRight size={16} />
                        </button>
                        <Link
                          href="/plans"
                          className="w-full flex items-center justify-center
                                     text-[12px] text-[#888] hover:text-black
                                     py-2.5 transition-colors"
                        >
                          Check fibre availability first →
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pre-built bundles */}
              <div>
                <h4 className="font-bold text-[13px] text-black mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-[#FFCB00]" />
                  Pre-built Bundles
                </h4>
                <div className="space-y-3">
                  {Object.values(bundles).slice(0, 3).map((bundle) => (
                    <div
                      key={bundle.id}
                      className={`rounded-2xl overflow-hidden relative`}
                      style={{
                        background: `linear-gradient(135deg, ${bundle.color.includes('from-') ? '#1A1A1A' : '#1A1A1A'}, #111)`,
                      }}
                    >
                      {/* Gradient overlay based on bundle color */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: bundle.highlighted
                            ? 'linear-gradient(135deg, rgba(255,203,0,0.3), transparent)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.06), transparent)',
                        }}
                      />
                      <div className="relative p-4">
                        {bundle.highlighted && (
                          <span className="text-[10px] font-bold bg-[#FFCB00]/20 text-[#FFCB00]
                                           border border-[#FFCB00]/30
                                           px-2 py-0.5 rounded-full mb-2 inline-flex items-center gap-1">
                            <Star size={8} fill="#FFCB00" /> Popular
                          </span>
                        )}
                        <h5 className="font-bold text-white text-sm mb-0.5">{bundle.name}</h5>
                        <p className="text-white/50 text-[11px] mb-3">{bundle.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[15px]">
                            ₦{bundle.monthlyPrice.toLocaleString()}
                            <span className="text-[11px] font-normal text-white/40">/mo</span>
                          </span>
                          <button
                            onClick={() => bundle.devices.forEach((id) => addToBundle(id))}
                            className="text-[11px] bg-white/10 hover:bg-white/20
                                       text-white px-3 py-1.5 rounded-full font-semibold
                                       transition-colors"
                          >
                            Use Bundle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
