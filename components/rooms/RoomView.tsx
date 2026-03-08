'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MoonStar, ShoppingBag, Sparkles, Zap } from 'lucide-react';
import { devices, rooms } from '@/lib/data';
import { roomVisuals } from '@/lib/room-visuals';
import { useAppStore } from '@/store/useAppStore';

interface RoomViewProps {
  roomId: string;
}

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  active: { label: 'Active', className: 'status-badge-active', dot: 'bg-emerald-500' },
  idle: { label: 'Idle', className: 'status-badge-idle', dot: 'bg-black/25' },
  offline: { label: 'Offline', className: 'status-badge-offline', dot: 'bg-red-500' },
  streaming: { label: 'Streaming', className: 'status-badge-streaming', dot: 'bg-sky-500' },
  charging: { label: 'Charging', className: 'status-badge-charging', dot: 'bg-[#ffcb00]' },
};

export default function RoomView({ roomId }: RoomViewProps) {
  const room = rooms[roomId];
  const visual = roomVisuals[roomId];
  const { setActiveDevice, deviceStates, triggerAnimation } = useAppStore();

  if (!room || !visual) {
    return (
      <div className="fp-card p-10 text-center">
        <p className="text-lg font-semibold text-black">Room not found.</p>
      </div>
    );
  }

  const roomDevices = room.devices.map((id) => devices[id]).filter(Boolean);
  const activeCount = room.devices.filter((id) => deviceStates[id]?.isOn).length;
  const modeLabel = roomId === 'master-bedroom' ? 'Sleep mode' : ['kids-bedroom', 'home-office'].includes(roomId) ? 'Focus mode' : 'Run scene';

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="media-frame overflow-hidden rounded-[38px]"
      >
        <div className="relative min-h-[420px] bg-[#eae6de] sm:min-h-[560px]">
          <img src={visual.image} alt={room.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
          <div className="absolute left-6 top-6 max-w-sm rounded-[26px] bg-white/80 p-5 backdrop-blur-lg">
            <p className="section-label">{room.theme}</p>
            <h2 className="mt-2 text-[2.6rem] font-bold leading-none tracking-[-0.05em] text-black sm:text-[3.2rem]">
              {room.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-black/62">{visual.headline}</p>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
            <div className="glass-panel px-4 py-3 text-sm font-semibold text-black">{roomDevices.length} connected devices</div>
            <div className="glass-panel px-4 py-3 text-sm font-semibold text-black">{activeCount} currently active</div>
            <div className="glass-panel px-4 py-3 text-sm font-semibold text-black">MTN Fibre Prime orchestration</div>
          </div>
        </div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="fp-card-dark flex h-full flex-col overflow-hidden p-6 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/44">Home / {room.name}</p>
            <h3 className="mt-3 text-[2rem] font-bold leading-none tracking-[-0.04em] text-white">Control layer</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/62">{visual.mood}</p>
          </div>
          <button
            onClick={() => room.devices.forEach((id) => triggerAnimation(id))}
            className="inline-flex items-center gap-2 rounded-full bg-[#ffcb00] px-4 py-2.5 text-sm font-bold text-black transition hover:translate-y-[-1px]"
          >
            <MoonStar size={15} />
            {modeLabel}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
          {roomDevices.map((device, index) => {
            const state = deviceStates[device.id];
            const status = state?.status || (state?.isOn === false ? 'idle' : device.status);
            const statusMeta = statusConfig[status] || statusConfig.idle;
            const isAnimating = state?.isAnimating ?? false;

            return (
              <motion.button
                key={device.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setActiveDevice(device)}
                className={`rounded-[24px] border border-white/10 bg-white/5 p-4 text-left transition hover:border-[#ffcb00]/55 hover:bg-white/8 ${isAnimating ? 'gold-outline' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/9 text-lg">
                    {device.icon}
                  </div>
                  <span className={statusMeta.className}>
                    <span className={`inline-flex h-1.5 w-1.5 rounded-full ${statusMeta.dot} ${isAnimating ? 'animate-pulse' : ''}`} />
                    {isAnimating ? 'Running' : statusMeta.label}
                  </span>
                </div>
                <p className="mt-4 text-[1.35rem] font-bold leading-none tracking-[-0.04em] text-white">{device.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/56">{device.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="font-semibold text-white/76">N{device.monthlyPrice.toLocaleString()} / mo</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#ffcb00]">
                    Open
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-label text-white/42">Bundle next step</p>
              <h4 className="mt-2 text-xl font-bold tracking-[-0.04em] text-white">Take this room into your plan</h4>
              <p className="mt-3 text-sm leading-relaxed text-white/56">
                Add the whole room to your bundle, then compare the impact on your monthly connected-home package.
              </p>
            </div>
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ffcb00]/16 text-[#ffcb00]">
              <Zap size={20} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/bundles" className="btn-primary">
              <ShoppingBag size={16} />
              Build bundle
            </Link>
            <Link href="/marketplace" className="btn-ghost">
              <Sparkles size={16} />
              Browse marketplace
            </Link>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}


