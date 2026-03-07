'use client';
import { Device } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Zap, Star } from 'lucide-react';
import DeviceAnimation from './DeviceAnimation';

export default function DevicePanel() {
  const { activeDevice, isPanelOpen, setPanelOpen, setActiveDevice, addToBundle, removeFromBundle, bundleItems, toggleDevice, deviceStates, triggerAnimation } = useAppStore();

  if (!activeDevice) return null;

  const isInBundle = bundleItems.includes(activeDevice.id);
  const deviceState = deviceStates[activeDevice.id];
  const isOn = deviceState?.isOn ?? true;
  const isAnimating = deviceState?.isAnimating ?? false;

  const statusColors: Record<string, string> = {
    active: 'bg-green-500',
    idle: 'bg-gray-400',
    offline: 'bg-red-500',
    streaming: 'bg-blue-500',
    charging: 'bg-yellow-400',
  };

  const close = () => {
    setPanelOpen(false);
    setTimeout(() => setActiveDevice(null), 300);
  };

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="panel-overlay"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="device-panel"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-mtn-grey">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeDevice.icon}</span>
                  <div>
                    <h2 className="font-bold text-xl text-mtn-black">{activeDevice.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${statusColors[deviceState?.status || 'idle']}`} />
                      <span className="text-xs text-gray-500 capitalize">{deviceState?.status || 'idle'}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500 capitalize">{activeDevice.room.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
                <button onClick={close} className="w-9 h-9 rounded-full hover:bg-mtn-grey flex items-center justify-center transition-colors" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="px-6 py-5 space-y-6 pb-24">
              {/* Animation Area */}
              <div className="rounded-2xl bg-mtn-bg border border-mtn-grey overflow-hidden min-h-[160px] flex items-center justify-center relative">
                <DeviceAnimation
                  type={activeDevice.animationType}
                  isOn={isOn}
                  isAnimating={isAnimating}
                />
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">{activeDevice.description}</p>
              </div>

              {/* Experience Button */}
              {activeDevice.experience && (
                <div className="bg-mtn-black rounded-2xl p-4">
                  <p className="text-mtn-yellow text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Zap size={12} />
                    Simulate Experience
                  </p>
                  <p className="text-white text-sm mb-4">{activeDevice.experience}</p>
                  <button
                    onClick={() => triggerAnimation(activeDevice.id)}
                    className="w-full bg-mtn-yellow text-mtn-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition-all active:scale-95 text-sm"
                  >
                    {isAnimating ? '⏳ Running simulation...' : '▶ Run Simulation'}
                  </button>
                </div>
              )}

              {/* Features */}
              <div>
                <h4 className="font-bold text-sm text-mtn-black uppercase tracking-wider mb-3">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {activeDevice.features.map((f) => (
                    <span key={f} className="bg-mtn-grey text-mtn-black text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                      <Star size={10} className="text-mtn-yellow" fill="currentColor" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Partners */}
              {activeDevice.partners && (
                <div>
                  <h4 className="font-bold text-sm text-mtn-black uppercase tracking-wider mb-3">Powered By</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDevice.partners.map((p) => (
                      <span key={p} className="border border-mtn-grey bg-white text-mtn-black text-xs px-3 py-1.5 rounded-full font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="bg-mtn-yellow/10 border border-mtn-yellow/30 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">Monthly Price</span>
                  <span className="text-2xl font-bold text-mtn-black">
                    ₦{activeDevice.monthlyPrice.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/mo</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500">Part of the <strong>{activeDevice.bundleName}</strong></p>
              </div>

              {/* Device On/Off Toggle */}
              <div className="flex items-center justify-between p-4 bg-mtn-bg rounded-2xl border border-mtn-grey">
                <div>
                  <p className="font-semibold text-sm text-mtn-black">Device Power</p>
                  <p className="text-xs text-gray-500">{isOn ? 'Currently active' : 'Currently off'}</p>
                </div>
                <button
                  onClick={() => toggleDevice(activeDevice.id)}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isOn ? 'bg-mtn-yellow' : 'bg-gray-300'}`}
                  aria-label="Toggle device"
                >
                  <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${isOn ? 'translate-x-7' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-mtn-grey p-4">
              <button
                onClick={() => isInBundle ? removeFromBundle(activeDevice.id) : addToBundle(activeDevice.id)}
                className={`w-full font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm ${
                  isInBundle
                    ? 'bg-mtn-grey text-mtn-black hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-transparent'
                    : 'bg-mtn-yellow text-mtn-black hover:bg-yellow-400'
                }`}
              >
                {isInBundle ? (
                  <><Minus size={16} /> Remove from Bundle</>
                ) : (
                  <><Plus size={16} /> Add to Bundle — ₦{activeDevice.monthlyPrice.toLocaleString()}/mo</>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
