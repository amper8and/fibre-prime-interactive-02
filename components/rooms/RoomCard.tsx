'use client';
import { motion } from 'framer-motion';
import { Room, Device, devices } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import { ArrowRight, Cpu } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

export default function RoomCard({ room, onClick }: RoomCardProps) {
  const { deviceStates } = useAppStore();
  const roomDevices = room.devices.map((id) => devices[id]).filter(Boolean);
  const activeCount = room.devices.filter((id) => deviceStates[id]?.isOn).length;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="room-card mtn-card cursor-pointer group"
    >
      {/* Header gradient */}
      <div className={`bg-gradient-to-br ${room.gradient} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)'
        }} />
        <div className="flex items-start justify-between relative z-10">
          <span className="text-5xl">{room.icon}</span>
          <div className="bg-white/20 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            {activeCount}/{room.devices.length} active
          </div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-white relative z-10">{room.name}</h3>
        <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mt-1 relative z-10">{room.theme}</p>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{room.description}</p>

        {/* Device chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {roomDevices.slice(0, 4).map((device) => (
            <span key={device.id} className="flex items-center gap-1 text-[11px] bg-mtn-bg border border-mtn-grey px-2 py-1 rounded-full font-medium text-gray-700">
              {device.icon} {device.name}
            </span>
          ))}
          {roomDevices.length > 4 && (
            <span className="text-[11px] bg-mtn-grey px-2 py-1 rounded-full font-medium text-gray-500">
              +{roomDevices.length - 4} more
            </span>
          )}
        </div>

        <button className="w-full flex items-center justify-between text-sm font-bold text-mtn-black group-hover:text-mtn-yellow transition-colors">
          <span className="flex items-center gap-2">
            <Cpu size={14} />
            Explore Room
          </span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
