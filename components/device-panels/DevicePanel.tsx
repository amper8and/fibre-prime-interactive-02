'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Play, Plus, Power, Sparkles, X } from 'lucide-react';
import DeviceAnimation from '@/components/device-panels/DeviceAnimation';
import { roomVisuals } from '@/lib/room-visuals';
import { useAppStore } from '@/store/useAppStore';

const statusBadge: Record<string, { label: string; className: string; dot: string }> = {
  active: { label: 'Active', className: 'status-badge-active', dot: 'bg-emerald-500' },
  idle: { label: 'Idle', className: 'status-badge-idle', dot: 'bg-black/25' },
  offline: { label: 'Offline', className: 'status-badge-offline', dot: 'bg-red-500' },
  streaming: { label: 'Streaming', className: 'status-badge-streaming', dot: 'bg-sky-500' },
  charging: { label: 'Charging', className: 'status-badge-charging', dot: 'bg-[#ffcb00]' },
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

  if (!activeDevice) {
    return null;
  }

  const isInBundle = bundleItems.includes(activeDevice.id);
  const deviceState = deviceStates[activeDevice.id];
  const isOn = deviceState?.isOn ?? true;
  const isAnimating = deviceState?.isAnimating ?? false;
  const status = deviceState?.status || (isOn ? 'active' : 'idle');
  const badge = statusBadge[status] || statusBadge.idle;
  const visual = roomVisuals[activeDevice.room];

  const close = () => {
    setPanelOpen(false);
    setTimeout(() => setActiveDevice(null), 220);
  };

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          <motion.button
            type="button"
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="device-panel-overlay"
            onClick={close}
            aria-label="Close device details"
          />

          <motion.aside
            key="modal"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="device-panel-drawer"
            aria-label="Device details"
          >
            <div className="relative overflow-hidden">
              <div className="relative h-[210px] border-b border-black/8 bg-[#ece8df]">
                {visual && <img src={visual.image} alt={activeDevice.name} className="absolute inset-0 h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-white/22 backdrop-blur-[2px]" />
                <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4">
                  <div className="rounded-full border border-white/60 bg-white/86 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-black/55 backdrop-blur-md">
                    {activeDevice.room.replace(/-/g, ' ')}
                  </div>
                  <button
                    onClick={close}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/84 text-black/70 backdrop-blur-md transition hover:bg-white"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="absolute inset-x-5 bottom-5 rounded-[28px] border border-white/50 bg-white/82 p-5 shadow-[0_20px_50px_rgba(17,17,17,0.12)] backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#ffcb00]/22 text-[1.6rem] shadow-[inset_0_0_0_1px_rgba(255,203,0,0.38)]">
                      {activeDevice.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-[2rem] font-bold leading-none tracking-[-0.05em] text-black">{activeDevice.name}</h2>
                        <span className={badge.className}>
                          <span className={`inline-flex h-1.5 w-1.5 rounded-full ${badge.dot} ${isAnimating ? 'animate-pulse' : ''}`} />
                          {isAnimating ? 'Running' : badge.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-black/58">Powered by MTN Fibre Prime orchestration.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 px-6 pb-6 pt-16 sm:px-7">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/42">Monthly price</p>
                    <p className="mt-2 text-[2.6rem] font-bold leading-none tracking-[-0.05em] text-black">
                      N{activeDevice.monthlyPrice.toLocaleString()}
                      <span className="ml-2 text-base font-medium tracking-normal text-black/46">per month</span>
                    </p>
                  </div>
                  <button
                    onClick={() => triggerAnimation(activeDevice.id)}
                    disabled={isAnimating}
                    className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <Play size={16} />
                    {isAnimating ? 'Running experience' : 'Run experience'}
                  </button>
                </div>

                <div className="rounded-[26px] border border-black/8 bg-[#f4f1ea] p-5">
                  <div className="relative overflow-hidden rounded-[22px] border border-black/8 bg-white/70 p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,203,0,0.16),transparent_60%)]" />
                    <div className="relative flex min-h-[170px] items-center justify-center">
                      <DeviceAnimation type={activeDevice.animationType} isOn={isOn} isAnimating={isAnimating} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-black/62">{activeDevice.description}</p>
                </div>

                {activeDevice.features?.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/42">Included experience</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeDevice.features.map((feature) => (
                        <span key={feature} className="fp-tag">
                          <Sparkles size={12} className="text-[#8d6b00]" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between rounded-[24px] border border-black/8 bg-white px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-black">Device power</p>
                    <p className="mt-1 text-xs text-black/48">Turn the device on or place it in standby.</p>
                  </div>
                  <button
                    onClick={() => toggleDevice(activeDevice.id)}
                    className={`inline-flex h-12 min-w-[120px] items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition ${isOn ? 'bg-black text-white' : 'bg-black/6 text-black'}`}
                  >
                    <Power size={16} />
                    {isOn ? 'Power on' : 'Standby'}
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => (isInBundle ? removeFromBundle(activeDevice.id) : addToBundle(activeDevice.id))}
                    className={`flex-1 rounded-full px-5 py-3.5 text-sm font-bold transition ${
                      isInBundle ? 'bg-black text-white hover:bg-black/88' : 'bg-[#ffcb00] text-black hover:translate-y-[-1px]'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {isInBundle ? <Minus size={16} /> : <Plus size={16} />}
                      {isInBundle ? 'Remove from bundle' : 'Add to bundle'}
                    </span>
                  </button>
                  <button onClick={close} className="btn-secondary flex-1 justify-center">
                    Keep exploring
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


