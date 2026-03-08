'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rooms, devices } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import DevicePanel from '@/components/device-panels/DevicePanel';
import RoomView from '@/components/rooms/RoomView';
import { Sun, Sunset, Moon, ShoppingBag, ArrowLeft, Grid3X3, LayoutGrid, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Scene = 'day' | 'evening' | 'night';

const sceneConfig: Record<Scene, { label: string; icon: LucideIcon; filter: string; bg: string; accent: string }> = {
  day: {
    label: 'Day',
    icon: Sun,
    filter: 'none',
    bg: '#F0F7FF',
    accent: '#3B82F6',
  },
  evening: {
    label: 'Evening',
    icon: Sunset,
    filter: 'sepia(0.22) saturate(1.15) brightness(0.88)',
    bg: '#1A0A00',
    accent: '#F97316',
  },
  night: {
    label: 'Night',
    icon: Moon,
    filter: 'saturate(0.5) brightness(0.50) hue-rotate(215deg)',
    bg: '#0A0A1A',
    accent: '#818CF8',
  },
};

/* ── Room layout for the floor plan ── */
const roomLayout = [
  { id: 'living-room',    label: 'Living Room',   icon: '🛋️', col: '1 / 3', row: '2 / 3', color: '#FFFBEB', border: '#FCD34D' },
  { id: 'kitchen',        label: 'Kitchen',        icon: '🍳', col: '1 / 2', row: '1 / 2', color: '#ECFDF5', border: '#34D399' },
  { id: 'home-office',    label: 'Home Office',    icon: '💼', col: '2 / 3', row: '1 / 2', color: '#EFF6FF', border: '#60A5FA' },
  { id: 'master-bedroom', label: 'Master Bed',     icon: '🛏️', col: '3 / 4', row: '1 / 2', color: '#F5F3FF', border: '#A78BFA' },
  { id: 'kids-bedroom',   label: 'Kids Room',      icon: '🧸', col: '3 / 4', row: '2 / 3', color: '#FFF1F2', border: '#FB7185' },
  { id: 'patio',          label: 'Patio',          icon: '🌿', col: '2 / 3', row: '2 / 3', color: '#F0FDFA', border: '#2DD4BF' },
  { id: 'garage',         label: 'Garage',         icon: '🚗', col: '1 / 2', row: '3 / 4', color: '#F8FAFC', border: '#94A3B8' },
  { id: '_placeholder',   label: '',               icon: '',   col: '2 / 4', row: '3 / 4', color: '#FAFAFA', border: '#E5E5E5' },
];

export default function ExperienceClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentRoom, setCurrentRoom, currentScene, setScene, bundleItems } = useAppStore();
  const [viewMode, setViewMode] = useState<'floor' | 'grid'>('floor');

  useEffect(() => {
    const roomParam = searchParams.get('room');
    if (roomParam && rooms[roomParam]) {
      setCurrentRoom(roomParam);
    }
  }, [searchParams, setCurrentRoom]);

  const handleRoomClick = (roomId: string) => {
    setCurrentRoom(roomId);
    router.push(`/experience?room=${roomId}`, { scroll: false });
  };

  const handleBack = () => {
    setCurrentRoom(null);
    router.push('/experience', { scroll: false });
  };

  const scene = sceneConfig[currentScene as Scene] || sceneConfig.day;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />
      <NotificationToast />
      <DevicePanel />

      {/* ── Page header ── */}
      <div
        className="pt-[var(--nav-height)] transition-colors duration-700"
        style={{ background: currentRoom ? '#000000' : '#000000' }}
      >
        <div className="page-container py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Breadcrumb / title */}
            <div>
              {currentRoom && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-white/50 hover:text-white
                             text-sm mb-2 transition-colors duration-150 group"
                >
                  <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back to Home
                </button>
              )}
              <div className="flex items-center gap-3">
                {!currentRoom && (
                  <div className="w-8 h-8 bg-[#FFCB00] rounded-lg flex items-center justify-center
                                  font-bold text-[11px] text-black shrink-0">
                    MTN
                  </div>
                )}
                <div>
                  <h1 className="text-white font-bold text-xl sm:text-2xl leading-tight">
                    {currentRoom ? rooms[currentRoom]?.name : 'The Connected Lagos Home'}
                  </h1>
                  <p className="text-white/40 text-sm mt-0.5">
                    {currentRoom
                      ? rooms[currentRoom]?.theme
                      : '7 rooms · 20+ devices · Powered by MTN Fibre Prime'}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Scene switcher */}
              <div className="flex items-center bg-white/6 backdrop-blur rounded-xl p-1 gap-0.5">
                {(Object.keys(sceneConfig) as Scene[]).map((s) => {
                  const Icon = sceneConfig[s].icon;
                  return (
                    <button
                      key={s}
                      onClick={() => setScene(s)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg
                                 text-xs font-semibold min-h-[36px] transition-all duration-150 ${
                        currentScene === s
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/60 hover:text-white hover:bg-white/8'
                      }`}
                    >
                      <Icon size={13} />
                      <span className="hidden sm:inline">{sceneConfig[s].label}</span>
                    </button>
                  );
                })}
              </div>

              {/* View toggle (only on home screen) */}
              {!currentRoom && (
                <div className="flex bg-white/6 backdrop-blur rounded-xl p-1 gap-0.5">
                  {[
                    { mode: 'floor', icon: Grid3X3, label: 'Floor plan' },
                    { mode: 'grid',  icon: LayoutGrid, label: 'Grid' },
                  ].map(({ mode, icon: Icon, label }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as 'floor' | 'grid')}
                      aria-label={label}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg
                                 transition-all duration-150 ${
                        viewMode === mode
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/60 hover:text-white hover:bg-white/8'
                      }`}
                    >
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              )}

              {/* Bundle indicator */}
              {bundleItems.length > 0 && (
                <Link
                  href="/bundles"
                  className="flex items-center gap-2 bg-[#FFCB00] text-black
                             text-xs font-bold px-3 py-2 rounded-xl
                             hover:bg-yellow-300 transition-colors min-h-[36px]"
                >
                  <ShoppingBag size={14} />
                  {bundleItems.length} in bundle
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div
        className="page-container py-8"
        style={{
          filter: scene.filter,
          transition: 'filter 0.9s ease',
        }}
      >
        <AnimatePresence mode="wait">
          {currentRoom ? (
            <motion.div
              key={currentRoom}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <RoomView roomId={currentRoom} />
            </motion.div>
          ) : viewMode === 'floor' ? (
            <motion.div
              key="floor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FloorPlan onRoomClick={handleRoomClick} />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <RoomsGrid onRoomClick={handleRoomClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Floor Plan ─────────────────────────────────────────────── */
function FloorPlan({ onRoomClick }: { onRoomClick: (id: string) => void }) {
  const { deviceStates } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Intro */}
      <p className="text-center text-[#888] text-sm mb-6">
        Click any room to explore its connected devices and services
      </p>

      {/* House card */}
      <div
        className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
      >
        {/* Yellow top accent */}
        <div className="h-1.5 bg-[#FFCB00]" />

        <div className="p-6">
          {/* House label */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold text-[#888] uppercase tracking-widest">
              Floor Plan View
            </span>
            <div className="flex items-center gap-3 text-[11px] text-[#888]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" /> Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-gray-200 rounded-sm" /> Idle
              </span>
            </div>
          </div>

          {/* Grid */}
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows:    'repeat(3, auto)',
            }}
          >
            {roomLayout.map((room) => {
              if (room.id === '_placeholder') {
                return (
                  <div
                    key="_placeholder"
                    style={{
                      gridColumn: room.col,
                      gridRow:    room.row,
                      background: '#FAFAFA',
                      borderRadius: 12,
                      border: '1px dashed #E5E5E5',
                    }}
                    className="flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">🌿</div>
                      <span className="text-[10px] text-[#CCC] font-medium">Garden / Outdoor</span>
                    </div>
                  </div>
                );
              }

              const roomData = rooms[room.id];
              const deviceCount = roomData?.devices.length || 0;
              const activeCount = roomData?.devices.filter((id) => deviceStates[id]?.isOn).length || 0;

              return (
                <motion.button
                  key={room.id}
                  whileHover={{ scale: 1.025, boxShadow: `0 8px 28px ${room.border}35` }}
                  whileTap={{ scale: 0.975 }}
                  onClick={() => onRoomClick(room.id)}
                  style={{
                    gridColumn: room.col,
                    gridRow:    room.row,
                    backgroundColor: room.color,
                    borderColor: room.border,
                  }}
                  className="relative rounded-xl border-2 p-4 text-left
                             transition-shadow group min-h-[100px] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl">{room.icon}</span>
                    <p className="font-bold text-sm text-black mt-1.5 leading-tight">{room.label}</p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-[10px] text-[#888]">{deviceCount} devices</span>
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activeCount > 0 ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                      />
                      <span className="text-[10px] text-[#888]">{activeCount} on</span>
                    </div>
                  </div>
                  {/* Hover arrow */}
                  <div
                    className="absolute top-2.5 right-3 text-[10px] font-bold opacity-0
                               group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: room.border }}
                  >
                    Explore →
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Status bar */}
          <div className="mt-5 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#444]">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-[13px]">Powered by MTN Fibre Prime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-[#888] font-medium">All systems online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {[
          { label: 'Connected Devices', value: Object.keys(devices).length, icon: '📱' },
          { label: 'Active Now',         value: Object.values(deviceStates).filter(d => d.isOn).length, icon: '🟢' },
          { label: 'Monthly Bundle',    value: '₦45,000', icon: '💳' },
          { label: 'Speed',              value: '500 Mbps', icon: '⚡' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[#E5E5E5] p-4 text-center"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="font-bold text-black text-sm">{stat.value}</div>
            <div className="text-[11px] text-[#888] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Grid View ──────────────────────────────────────────────── */
function RoomsGrid({ onRoomClick }: { onRoomClick: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Object.values(rooms).map((room, i) => (
        <motion.button
          key={room.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          onClick={() => onRoomClick(room.id)}
          className="fp-card text-left p-5 group hover:border-[#FFCB00]/40
                     hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                     transition-all duration-200"
        >
          <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-200">
            {room.icon}
          </span>
          <p className="font-bold text-black text-[15px] mb-0.5">{room.name}</p>
          <p className="text-[#888] text-xs mb-3">{room.theme}</p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#AAA]">{room.devices.length} devices</span>
            <span
              className="text-[11px] font-bold text-[#FFCB00]
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              Explore →
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
