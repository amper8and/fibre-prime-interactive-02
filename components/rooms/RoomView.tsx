'use client';
import { motion } from 'framer-motion';
import { rooms, devices } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import { Zap, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RoomViewProps {
  roomId: string;
}

/* Scene per room */
const roomScenes: Record<string, { bg: string; accent: string; text: string }> = {
  'living-room':    { bg: '#FFFBEB', accent: '#F59E0B', text: '#78350F' },
  'master-bedroom': { bg: '#F5F3FF', accent: '#7C3AED', text: '#4C1D95' },
  'kids-bedroom':   { bg: '#FFF1F2', accent: '#F43F5E', text: '#881337' },
  'kitchen':        { bg: '#ECFDF5', accent: '#059669', text: '#064E3B' },
  'home-office':    { bg: '#EFF6FF', accent: '#2563EB', text: '#1E3A8A' },
  'patio':          { bg: '#F0FDFA', accent: '#0D9488', text: '#134E4A' },
  'garage':         { bg: '#F8FAFC', accent: '#475569', text: '#1E293B' },
};

/* Status config */
const statusConfig: Record<string, { label: string; dotClass: string; badgeClass: string }> = {
  active:    { label: 'Active',     dotClass: 'bg-emerald-500',   badgeClass: 'status-badge-active' },
  idle:      { label: 'Idle',       dotClass: 'bg-gray-400',      badgeClass: 'status-badge-idle' },
  offline:   { label: 'Offline',    dotClass: 'bg-red-500',       badgeClass: 'status-badge-offline' },
  streaming: { label: 'Streaming',  dotClass: 'bg-blue-500',      badgeClass: 'status-badge-streaming' },
  charging:  { label: 'Charging',   dotClass: 'bg-[#FFCB00]',     badgeClass: 'status-badge-charging' },
};

export default function RoomView({ roomId }: RoomViewProps) {
  const room = rooms[roomId];
  const { setActiveDevice, deviceStates, triggerAnimation } = useAppStore();

  if (!room) {
    return (
      <div className="text-center py-24 text-[#888]">
        <div className="text-5xl mb-4">🏠</div>
        <p>Room not found.</p>
      </div>
    );
  }

  const roomDevices = room.devices.map((id) => devices[id]).filter(Boolean);
  const scene = roomScenes[roomId] || { bg: '#F5F5F5', accent: '#888', text: '#333' };
  const activeCount = room.devices.filter((id) => deviceStates[id]?.isOn).length;

  const handleDeviceClick = (deviceId: string) => {
    const device = devices[deviceId];
    if (device) setActiveDevice(device);
  };

  const handleSceneAction = () => {
    room.devices.forEach((id) => triggerAnimation(id));
  };

  const isSleepRoom  = roomId === 'master-bedroom';
  const isStudyRoom  = ['kids-bedroom', 'home-office'].includes(roomId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* ── Room Hero ── */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          background:   scene.bg,
          borderColor:  `${scene.accent}25`,
          boxShadow:    `0 4px 24px ${scene.accent}12`,
        }}
      >
        <div
          className="h-1"
          style={{ background: scene.accent }}
        />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{room.icon}</span>
                <div>
                  <h2 className="text-[24px] sm:text-[28px] font-bold text-black leading-tight">
                    {room.name}
                  </h2>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: scene.accent }}>
                    {room.theme}
                  </p>
                </div>
              </div>

              <p className="text-[#555] text-sm leading-relaxed max-w-lg mb-4">
                {room.description}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                <span className="fp-tag text-[12px]">
                  {roomDevices.length} devices
                </span>
                <span
                  className="fp-tag text-[12px]"
                  style={{ background: `${scene.accent}12`, borderColor: `${scene.accent}25`, color: scene.text }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {activeCount} active
                </span>
                <span
                  className="fp-tag-yellow text-[12px]"
                >
                  <Zap size={11} />
                  MTN Fibre Prime
                </span>
              </div>
            </div>

            {/* Scene mode button */}
            {(isSleepRoom || isStudyRoom) && (
              <button
                onClick={handleSceneAction}
                className="btn-primary text-sm whitespace-nowrap shrink-0"
              >
                {isSleepRoom ? '🌙 Sleep Mode' : '📚 Study Mode'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Devices ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-bold text-black text-[17px]">Connected Devices</h3>
          <span className="text-[#888] text-sm">— click to interact</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomDevices.map((device, i) => {
            const state    = deviceStates[device.id];
            const isOn     = state?.isOn ?? true;
            const isAnim   = state?.isAnimating ?? false;
            const status   = state?.status || (isOn ? 'active' : 'idle');
            const sConfig  = statusConfig[status] || statusConfig.idle;

            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(0,0,0,0.09)' }}
                onClick={() => handleDeviceClick(device.id)}
                className={`fp-card cursor-pointer group transition-all relative overflow-hidden ${
                  !isOn ? 'opacity-55' : ''
                } ${isAnim ? 'ring-1 ring-[#FFCB00]/50' : ''}`}
              >
                {/* Status bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500 ${
                    isAnim ? 'bg-[#FFCB00]' : isOn ? 'bg-emerald-400' : 'bg-gray-200'
                  }`}
                />

                <div className="p-5">
                  {/* Icon + Status */}
                  <div className="flex items-start justify-between mb-3">
                    <motion.span
                      animate={isAnim ? { scale: [1, 1.12, 1] } : {}}
                      transition={{ duration: 0.6, repeat: isAnim ? Infinity : 0 }}
                      className="text-[38px] leading-none"
                    >
                      {device.icon}
                    </motion.span>

                    <span className={sConfig.badgeClass}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sConfig.dotClass} ${isAnim ? 'animate-pulse' : ''}`} />
                      {isAnim ? 'Running' : sConfig.label}
                    </span>
                  </div>

                  {/* Name + desc */}
                  <h4 className="font-bold text-black text-sm mb-1 leading-snug">{device.name}</h4>
                  <p className="text-[#888] text-xs leading-relaxed line-clamp-2 mb-3">
                    {device.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
                    <span className="text-xs text-[#AAA] font-medium">
                      ₦{device.monthlyPrice.toLocaleString()}/mo
                    </span>
                    <span
                      className="text-[11px] font-bold text-[#FFCB00]
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      Tap to interact →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Bundle CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fp-card-dark rounded-2xl p-6 sm:p-8
                   flex flex-col sm:flex-row items-start sm:items-center
                   justify-between gap-4"
      >
        <div>
          <h3 className="text-white font-bold text-[17px] mb-1">
            Love what you see in {room.name}?
          </h3>
          <p className="text-white/40 text-sm">
            Add all {room.name.toLowerCase()} devices to your Fibre Prime bundle.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/bundles" className="btn-primary text-sm whitespace-nowrap">
            <ShoppingBag size={15} />
            Build Bundle
          </Link>
          <Link
            href="/marketplace"
            className="text-white/60 hover:text-white border border-white/15
                       hover:border-white/35 px-4 py-2.5 rounded-xl text-sm
                       font-semibold transition-all flex items-center gap-1.5"
          >
            Browse All <ArrowRight size={13} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
