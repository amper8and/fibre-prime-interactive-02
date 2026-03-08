'use client';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Zap, Star, Play, Pause } from 'lucide-react';
import DeviceAnimation from './DeviceAnimation';

/* Status config */
const statusBadge: Record<string, { label: string; classes: string; dot: string }> = {
  active:    { label: 'Active',    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  idle:      { label: 'Idle',      classes: 'bg-gray-50 text-gray-600 border border-gray-200',          dot: 'bg-gray-400' },
  offline:   { label: 'Offline',   classes: 'bg-red-50 text-red-700 border border-red-200',             dot: 'bg-red-500' },
  streaming: { label: 'Streaming', classes: 'bg-blue-50 text-blue-700 border border-blue-200',          dot: 'bg-blue-500' },
  charging:  { label: 'Charging',  classes: 'bg-yellow-50 text-yellow-700 border border-yellow-200',    dot: 'bg-[#FFCB00] animate-pulse' },
};

export default function DevicePanel() {
  const {
    activeDevice,
    isPanelOpen,
    setPanelOpen,
    setActiveDevice,
    addToBundle,
    removeFromBundle,
    bundleItems,
    toggleDevice,
    deviceStates,
    triggerAnimation,
  } = useAppStore();

  if (!activeDevice) return null;

  const isInBundle  = bundleItems.includes(activeDevice.id);
  const devState    = deviceStates[activeDevice.id];
  const isOn        = devState?.isOn ?? true;
  const isAnimating = devState?.isAnimating ?? false;
  const status      = devState?.status || (isOn ? 'active' : 'idle');
  const badge       = statusBadge[status] || statusBadge.idle;

  const close = () => {
    setPanelOpen(false);
    setTimeout(() => setActiveDevice(null), 320);
  };

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* ── Overlay ── */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="device-panel-overlay"
            onClick={close}
          />

          {/* ── Drawer ── */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="device-panel-drawer"
            aria-label="Device details"
          >
            {/* ── Header ── */}
            <div className="sticky top-0 bg-white z-10 border-b border-[#E5E5E5]">
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 bg-[#F5F5F5] rounded-2xl
                                 flex items-center justify-center text-3xl
                                 shrink-0 border border-[#E5E5E5]"
                    >
                      {activeDevice.icon}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-[18px] text-black leading-tight truncate">
                        {activeDevice.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {/* Status badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5
                                     rounded-full text-[11px] font-bold uppercase tracking-wide
                                     ${badge.classes}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {isAnimating ? 'Running' : badge.label}
                        </span>
                        {/* Room */}
                        <span className="text-[11px] text-[#888] capitalize">
                          {activeDevice.room.replace(/-/g, ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Close */}
                  <button
                    onClick={close}
                    className="w-9 h-9 rounded-xl border border-[#E5E5E5]
                               flex items-center justify-center
                               hover:bg-[#F5F5F5] transition-colors shrink-0"
                    aria-label="Close panel"
                  >
                    <X size={16} className="text-[#555]" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="px-6 py-5 pb-28 space-y-6 overflow-y-auto">

              {/* Animation area */}
              <div
                className="rounded-2xl bg-[#F8F8F8] border border-[#E5E5E5]
                           overflow-hidden min-h-[160px] flex items-center justify-center
                           relative"
              >
                <DeviceAnimation
                  type={activeDevice.animationType}
                  isOn={isOn}
                  isAnimating={isAnimating}
                />
                {/* Glow when animating */}
                {isAnimating && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl
                               border-2 border-[#FFCB00]/40"
                    style={{ boxShadow: 'inset 0 0 32px rgba(255,203,0,0.08)' }}
                  />
                )}
              </div>

              {/* Description */}
              <p className="text-[#555] text-sm leading-relaxed">
                {activeDevice.description}
              </p>

              {/* Simulate experience */}
              {activeDevice.experience && (
                <div className="fp-card-dark rounded-2xl p-5">
                  <p className="text-[#FFCB00] text-[11px] font-bold uppercase tracking-[0.1em] mb-2
                                flex items-center gap-2">
                    <Zap size={11} />
                    Simulate Experience
                  </p>
                  <p className="text-white/65 text-sm mb-4 leading-relaxed">
                    {activeDevice.experience}
                  </p>
                  <button
                    onClick={() => triggerAnimation(activeDevice.id)}
                    className={`w-full py-3 rounded-xl font-bold text-sm
                               flex items-center justify-center gap-2 transition-all
                               active:scale-[0.98] ${
                      isAnimating
                        ? 'bg-white/10 text-white/60 cursor-not-allowed'
                        : 'bg-[#FFCB00] text-black hover:bg-yellow-300'
                    }`}
                    disabled={isAnimating}
                  >
                    {isAnimating ? (
                      <><Pause size={15} /> Simulation running...</>
                    ) : (
                      <><Play size={15} /> Run Simulation</>
                    )}
                  </button>
                </div>
              )}

              {/* Features */}
              {activeDevice.features && activeDevice.features.length > 0 && (
                <div>
                  <h4 className="font-bold text-[12px] text-black uppercase tracking-[0.09em] mb-3">
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDevice.features.map((f) => (
                      <span
                        key={f}
                        className="fp-tag text-[12px] flex items-center gap-1"
                      >
                        <Star size={9} className="text-[#FFCB00]" fill="#FFCB00" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Partners */}
              {activeDevice.partners && activeDevice.partners.length > 0 && (
                <div>
                  <h4 className="font-bold text-[12px] text-black uppercase tracking-[0.09em] mb-3">
                    Powered By
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDevice.partners.map((p) => (
                      <span
                        key={p}
                        className="fp-tag text-[12px] border-[#E5E5E5]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="fp-card-yellow rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#888] mb-1">Monthly Price</p>
                    <p className="text-[26px] font-bold text-black leading-none">
                      ₦{activeDevice.monthlyPrice.toLocaleString()}
                      <span className="text-sm font-normal text-[#888] ml-1">/mo</span>
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 bg-[#FFCB00]/15 rounded-xl
                               flex items-center justify-center text-2xl"
                  >
                    {activeDevice.icon}
                  </div>
                </div>
                <p className="text-[11px] text-[#888] mt-3">
                  Part of the{' '}
                  <span className="font-bold text-black">{activeDevice.bundleName}</span>
                </p>
              </div>

              {/* Power toggle */}
              <div
                className="flex items-center justify-between p-4 rounded-2xl
                           bg-[#F8F8F8] border border-[#E5E5E5]"
              >
                <div>
                  <p className="font-semibold text-sm text-black">Device Power</p>
                  <p className="text-[11px] text-[#888] mt-0.5">
                    {isOn ? 'Currently active' : 'Currently off'}
                  </p>
                </div>
                <button
                  onClick={() => toggleDevice(activeDevice.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300
                             ${isOn ? 'bg-[#FFCB00]' : 'bg-[#D1D5DB]'}`}
                  aria-label={isOn ? 'Turn off' : 'Turn on'}
                  role="switch"
                  aria-checked={isOn}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow
                               transition-transform duration-300
                               ${isOn ? 'translate-x-6' : 'translate-x-0.5'}`}
                  />
                </button>
              </div>
            </div>

            {/* ── Sticky CTA ── */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] p-4">
              <button
                onClick={() => isInBundle ? removeFromBundle(activeDevice.id) : addToBundle(activeDevice.id)}
                className={`w-full py-4 rounded-xl font-bold text-sm
                           flex items-center justify-center gap-2
                           transition-all active:scale-[0.98] ${
                  isInBundle
                    ? 'bg-[#F5F5F5] text-black border border-[#E5E5E5] hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                    : 'bg-[#FFCB00] text-black hover:bg-yellow-300'
                }`}
              >
                {isInBundle ? (
                  <>
                    <Minus size={16} />
                    Remove from Bundle
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add to Bundle — ₦{activeDevice.monthlyPrice.toLocaleString()}/mo
                  </>
                )}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
