'use client';
import { motion } from 'framer-motion';
import { rooms, devices } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import { Zap, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface RoomViewProps {
  roomId: string;
}

const roomScenes: Record<string, { bg: string; accent: string; ambientEmoji: string[] }> = {
  'living-room': { bg: 'from-amber-50 to-orange-50', accent: 'border-amber-200', ambientEmoji: ['📺', '🎮', '💡'] },
  'master-bedroom': { bg: 'from-purple-50 to-indigo-50', accent: 'border-purple-200', ambientEmoji: ['🌙', '💤', '🌡️'] },
  'kids-bedroom': { bg: 'from-pink-50 to-rose-50', accent: 'border-pink-200', ambientEmoji: ['🎈', '⭐', '🎨'] },
  'kitchen': { bg: 'from-green-50 to-emerald-50', accent: 'border-green-200', ambientEmoji: ['🍳', '☕', '🌿'] },
  'home-office': { bg: 'from-blue-50 to-cyan-50', accent: 'border-blue-200', ambientEmoji: ['💻', '📊', '☕'] },
  'patio': { bg: 'from-teal-50 to-green-50', accent: 'border-teal-200', ambientEmoji: ['🌅', '🌿', '🎵'] },
  'garage': { bg: 'from-slate-100 to-gray-100', accent: 'border-slate-300', ambientEmoji: ['🔧', '☀️', '🔋'] },
};

const sleepModeRooms = ['master-bedroom'];
const studyModeRooms = ['kids-bedroom', 'home-office'];

export default function RoomView({ roomId }: RoomViewProps) {
  const room = rooms[roomId];
  const { setActiveDevice, deviceStates, triggerAnimation } = useAppStore();

  if (!room) return <div className="text-gray-500 text-center py-20">Room not found</div>;

  const roomDevices = room.devices.map((id) => devices[id]).filter(Boolean);
  const scene = roomScenes[roomId] || { bg: 'from-gray-50 to-gray-100', accent: 'border-gray-200', ambientEmoji: [] };

  const handleDeviceClick = (deviceId: string) => {
    const device = devices[deviceId];
    if (device) setActiveDevice(device);
  };

  const handleSceneAction = () => {
    room.devices.forEach((id) => triggerAnimation(id));
  };

  return (
    <div className="space-y-8">
      {/* Room hero */}
      <div className={`relative bg-gradient-to-br ${scene.bg} rounded-3xl border-2 ${scene.accent} p-6 sm:p-10 overflow-hidden`}>
        {/* Ambient floating emojis */}
        {scene.ambientEmoji.map((emoji, i) => (
          <motion.div
            key={i}
            animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 1.2 }}
            className="absolute text-4xl sm:text-6xl opacity-10 select-none pointer-events-none"
            style={{ right: `${15 + i * 15}%`, top: `${10 + i * 10}%` }}
          >
            {emoji}
          </motion.div>
        ))}

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{room.icon}</span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-mtn-black">{room.name}</h2>
                <p className="text-gray-600 text-sm font-semibold">{room.theme}</p>
              </div>
            </div>
            <p className="text-gray-700 max-w-xl leading-relaxed">{room.description}</p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="bg-white/70 backdrop-blur px-3 py-1.5 rounded-full text-sm font-semibold text-gray-700">
                {roomDevices.length} devices
              </div>
              <div className="bg-white/70 backdrop-blur px-3 py-1.5 rounded-full text-sm font-semibold text-green-700 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                {room.devices.filter((id) => deviceStates[id]?.isOn).length} active
              </div>
              <div className="bg-mtn-yellow/80 backdrop-blur px-3 py-1.5 rounded-full text-sm font-bold text-mtn-black flex items-center gap-1">
                <Zap size={12} />
                MTN Fibre Prime
              </div>
            </div>
          </div>

          {/* Scene action button */}
          {(sleepModeRooms.includes(roomId) || studyModeRooms.includes(roomId)) && (
            <button
              onClick={handleSceneAction}
              className="mtn-btn-primary text-sm whitespace-nowrap"
            >
              {sleepModeRooms.includes(roomId) ? '🌙 Activate Sleep Mode' : '📚 Activate Study Mode'}
            </button>
          )}
        </div>
      </div>

      {/* Devices grid */}
      <div>
        <h3 className="text-lg font-bold text-mtn-black mb-4 flex items-center gap-2">
          <span>Connected Devices</span>
          <span className="text-sm font-normal text-gray-500">— click to interact</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomDevices.map((device, i) => {
            const state = deviceStates[device.id];
            const isOn = state?.isOn ?? true;
            const isAnimating = state?.isAnimating ?? false;

            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                onClick={() => handleDeviceClick(device.id)}
                className={`mtn-card cursor-pointer group transition-all relative overflow-hidden ${!isOn ? 'opacity-60' : ''}`}
              >
                {/* Animated top border */}
                <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
                  isAnimating ? 'bg-mtn-yellow animate-pulse' : isOn ? 'bg-green-400' : 'bg-gray-300'
                }`} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <motion.span
                      animate={isAnimating ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0 }}
                      className="text-4xl"
                    >
                      {device.icon}
                    </motion.span>

                    {/* Status badge */}
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      isAnimating ? 'bg-mtn-yellow/20 text-amber-700' :
                      isOn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isAnimating ? 'bg-mtn-yellow animate-pulse' : isOn ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      {isAnimating ? 'Running' : isOn ? state?.status || 'active' : 'off'}
                    </div>
                  </div>

                  <h4 className="font-bold text-mtn-black text-sm mb-1">{device.name}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{device.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">₦{device.monthlyPrice.toLocaleString()}/mo</span>
                    <span className="text-xs font-bold text-mtn-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                      Tap to interact →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bundle CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-mtn-black rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-white font-bold text-lg mb-1">
            Love what you see in the {room.name}?
          </h3>
          <p className="text-gray-400 text-sm">
            Add all {room.name.toLowerCase()} devices to your Fibre Prime bundle.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/bundles" className="mtn-btn-primary text-sm whitespace-nowrap">
            <ShoppingCart size={16} />
            Build Bundle
          </Link>
          <Link href="/marketplace" className="text-white border border-white/20 hover:border-white/50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            Browse All
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
