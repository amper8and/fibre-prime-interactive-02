'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { devices, rooms, bundles, fibrePlans } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import DevicePanel from '@/components/device-panels/DevicePanel';
import { Trash2, Plus, Minus, Zap, Check, ShoppingCart, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

export default function BundlesPage() {
  const { bundleItems, addToBundle, removeFromBundle, clearBundle, getBundleTotal, setActiveDevice } = useAppStore();
  const total = getBundleTotal();

  const suggestedBundles = Object.values(bundles);

  return (
    <div className="min-h-screen bg-mtn-bg font-mtn">
      <Navigation />
      <NotificationToast />
      <DevicePanel />

      {/* Header */}
      <div className="pt-20 bg-gradient-to-r from-mtn-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Package size={24} className="text-mtn-yellow" />
            <h1 className="text-3xl font-bold text-white">Bundle Builder</h1>
          </div>
          <p className="text-gray-400">Build your custom Fibre Prime bundle. Pay one price. Get everything.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Add devices by room */}
          <div className="lg:col-span-2 space-y-6">

            {/* Fibre Plan selector */}
            <div>
              <h2 className="text-lg font-bold text-mtn-black mb-4 flex items-center gap-2">
                <Zap size={18} className="text-mtn-yellow" />
                1. Choose Your Fibre Plan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fibrePlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => addToBundle(`fibre-connection`)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all hover:border-mtn-yellow group ${
                      bundleItems.includes('fibre-connection') && plan.highlighted
                        ? 'border-mtn-yellow bg-mtn-yellow/5'
                        : plan.highlighted
                        ? 'border-mtn-yellow/50 bg-mtn-yellow/5'
                        : 'border-mtn-grey bg-white hover:bg-mtn-bg'
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="text-[10px] font-bold text-mtn-yellow uppercase tracking-wider mb-2 flex items-center gap-1">
                        ⭐ Most Popular
                      </div>
                    )}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl font-bold text-mtn-black">{plan.speed}</span>
                    </div>
                    <div className="text-mtn-black font-semibold text-sm mb-1">{plan.name}</div>
                    <div className="text-xl font-bold text-mtn-black">₦{plan.price.toLocaleString()}<span className="text-sm font-normal text-gray-500">/mo</span></div>
                    <div className="mt-2 space-y-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                          <Check size={11} className="text-green-500 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Devices by room */}
            <div>
              <h2 className="text-lg font-bold text-mtn-black mb-4 flex items-center gap-2">
                <span className="text-xl">🏠</span>
                2. Add Devices & Services by Room
              </h2>

              <div className="space-y-4">
                {Object.values(rooms).map((room) => {
                  const roomDevices = room.devices.map((id) => devices[id]).filter(Boolean);
                  return (
                    <div key={room.id} className="mtn-card p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">{room.icon}</span>
                        <div>
                          <h3 className="font-bold text-mtn-black">{room.name}</h3>
                          <p className="text-xs text-gray-500">{room.theme}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {roomDevices.map((device) => {
                          const inBundle = bundleItems.includes(device.id);
                          return (
                            <div
                              key={device.id}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                inBundle ? 'bg-mtn-yellow/10 border-mtn-yellow' : 'bg-mtn-bg border-mtn-grey hover:border-gray-300'
                              }`}
                            >
                              <button
                                onClick={() => setActiveDevice(device)}
                                className="flex items-center gap-2 flex-1 text-left"
                              >
                                <span className="text-xl">{device.icon}</span>
                                <div>
                                  <p className="text-xs font-bold text-mtn-black leading-tight">{device.name}</p>
                                  <p className="text-[10px] text-gray-500">₦{device.monthlyPrice.toLocaleString()}/mo</p>
                                </div>
                              </button>
                              <button
                                onClick={() => inBundle ? removeFromBundle(device.id) : addToBundle(device.id)}
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                                  inBundle
                                    ? 'bg-mtn-yellow text-mtn-black hover:bg-red-400 hover:text-white'
                                    : 'bg-white border border-mtn-grey hover:bg-mtn-yellow hover:border-mtn-yellow'
                                }`}
                                aria-label={inBundle ? 'Remove' : 'Add'}
                              >
                                {inBundle ? <Minus size={12} /> : <Plus size={12} />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Bundle summary (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="mtn-card overflow-hidden">
                {/* Header */}
                <div className="bg-mtn-black p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <ShoppingCart size={18} className="text-mtn-yellow" />
                      Your Bundle
                    </h3>
                    {bundleItems.length > 0 && (
                      <button onClick={clearBundle} className="text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">{bundleItems.length} items selected</p>
                </div>

                <div className="p-5">
                  {bundleItems.length === 0 ? (
                    <div className="text-center py-8">
                      <span className="text-4xl mb-3 block">📦</span>
                      <p className="text-gray-500 text-sm">Your bundle is empty.</p>
                      <p className="text-gray-400 text-xs mt-1">Add devices from the left to get started.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        <AnimatePresence>
                          {bundleItems.map((id) => {
                            const device = devices[id];
                            if (!device) return null;
                            return (
                              <motion.div
                                key={id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center justify-between py-2 border-b border-mtn-grey last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{device.icon}</span>
                                  <div>
                                    <p className="text-xs font-semibold text-mtn-black leading-tight">{device.name}</p>
                                    <p className="text-[10px] text-gray-500">₦{device.monthlyPrice.toLocaleString()}/mo</p>
                                  </div>
                                </div>
                                <button onClick={() => removeFromBundle(id)} className="text-gray-300 hover:text-red-400 transition-colors ml-2">
                                  <Minus size={14} />
                                </button>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>

                      <div className="mt-4 pt-4 border-t-2 border-mtn-grey">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-gray-600 text-sm">Monthly Total</span>
                          <span className="text-2xl font-bold text-mtn-black">₦{total.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">Billed monthly. Cancel anytime.</p>

                        <button className="w-full mtn-btn-primary text-sm mb-2">
                          Get This Bundle <ArrowRight size={16} />
                        </button>
                        <Link href="/plans" className="w-full flex items-center justify-center text-xs text-gray-500 hover:text-mtn-black py-2 transition-colors">
                          Check fibre availability first →
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Suggested bundles */}
              <div className="mt-4">
                <h4 className="font-bold text-sm text-mtn-black mb-3">Pre-built Bundles</h4>
                <div className="space-y-3">
                  {suggestedBundles.slice(0, 3).map((bundle) => (
                    <div key={bundle.id} className={`mtn-card p-4 bg-gradient-to-r ${bundle.color} text-white relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10 bg-white" />
                      <div className="relative z-10">
                        {bundle.highlighted && (
                          <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full mb-2 inline-block">⭐ Popular</span>
                        )}
                        <h5 className="font-bold text-sm">{bundle.name}</h5>
                        <p className="text-white/80 text-xs my-1">{bundle.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold">₦{bundle.monthlyPrice.toLocaleString()}/mo</span>
                          <button
                            onClick={() => {
                              bundle.devices.forEach((id) => addToBundle(id));
                            }}
                            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full font-semibold transition-colors"
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
