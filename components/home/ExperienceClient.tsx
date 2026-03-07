'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rooms, devices } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import RoomCard from '@/components/rooms/RoomCard';
import DevicePanel from '@/components/device-panels/DevicePanel';
import RoomView from '@/components/rooms/RoomView';
import { Grid, List, Sun, Sunset, Moon, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

type ViewMode = 'grid' | 'home';

export default function ExperienceClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentRoom, setCurrentRoom, currentScene, setScene, bundleItems } = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('home');

  // Handle deep-link to a room
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

  const handleBackToHome = () => {
    setCurrentRoom(null);
    router.push('/experience', { scroll: false });
  };

  const sceneConfig = {
    day: { label: 'Day', icon: Sun, bg: 'from-sky-400 via-blue-300 to-indigo-200', filter: 'none' },
    evening: { label: 'Evening', icon: Sunset, bg: 'from-orange-400 via-rose-400 to-purple-500', filter: 'sepia(0.3) saturate(1.2) brightness(0.85)' },
    night: { label: 'Night', icon: Moon, bg: 'from-indigo-900 via-blue-900 to-gray-900', filter: 'sepia(0.2) saturate(0.7) brightness(0.55) hue-rotate(220deg)' },
  };

  const scene = sceneConfig[currentScene];

  return (
    <div className="min-h-screen bg-mtn-bg font-mtn">
      <Navigation />
      <NotificationToast />
      <DevicePanel />

      {/* Page header */}
      <div className={`pt-20 bg-gradient-to-r ${scene.bg} transition-all duration-1000`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {currentRoom ? (
                <button
                  onClick={handleBackToHome}
                  className="text-white/70 text-sm mb-2 hover:text-white flex items-center gap-1 transition-colors"
                >
                  ← Back to Home
                </button>
              ) : null}
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">
                {currentRoom ? rooms[currentRoom]?.name : '🏠 The Connected Lagos Home'}
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {currentRoom
                  ? rooms[currentRoom]?.theme
                  : 'Explore every room powered by MTN Fibre Prime'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Scene switcher */}
              <div className="flex items-center bg-white/20 backdrop-blur rounded-xl p-1 gap-1">
                {(Object.keys(sceneConfig) as Array<keyof typeof sceneConfig>).map((s) => {
                  const Icon = sceneConfig[s].icon;
                  return (
                    <button
                      key={s}
                      onClick={() => setScene(s)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        currentScene === s ? 'bg-white text-mtn-black shadow' : 'text-white hover:bg-white/20'
                      }`}
                    >
                      <Icon size={13} />
                      {sceneConfig[s].label}
                    </button>
                  );
                })}
              </div>

              {/* View toggle (only when no room selected) */}
              {!currentRoom && (
                <div className="flex bg-white/20 backdrop-blur rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setViewMode('home')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'home' ? 'bg-white text-mtn-black shadow' : 'text-white hover:bg-white/20'}`}
                    aria-label="Home view"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-mtn-black shadow' : 'text-white hover:bg-white/20'}`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              )}

              {/* Bundle indicator */}
              {bundleItems.length > 0 && (
                <Link href="/bundles" className="flex items-center gap-2 bg-mtn-yellow text-mtn-black text-xs font-bold px-3 py-2 rounded-xl hover:bg-yellow-400 transition-colors">
                  <ShoppingCart size={14} />
                  {bundleItems.length} items
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" style={{ filter: scene.filter, transition: 'filter 1s ease' }}>
        <AnimatePresence mode="wait">
          {currentRoom ? (
            <motion.div key={currentRoom} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <RoomView roomId={currentRoom} />
            </motion.div>
          ) : viewMode === 'home' ? (
            <motion.div key="isometric" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <IsometricHome onRoomClick={handleRoomClick} />
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RoomsGrid onRoomClick={handleRoomClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Isometric Home Visual ────────────────────────────────────────────
function IsometricHome({ onRoomClick }: { onRoomClick: (id: string) => void }) {
  const { deviceStates } = useAppStore();

  const roomLayout = [
    { id: 'living-room', label: 'Living Room', icon: '🛋️', col: 1, row: 2, color: '#FEF3C7', border: '#F59E0B', w: 2, h: 1 },
    { id: 'kitchen', label: 'Kitchen', icon: '🍳', col: 1, row: 1, color: '#D1FAE5', border: '#10B981', w: 1, h: 1 },
    { id: 'home-office', label: 'Home Office', icon: '💼', col: 2, row: 1, color: '#DBEAFE', border: '#3B82F6', w: 1, h: 1 },
    { id: 'master-bedroom', label: 'Master Bed', icon: '🛏️', col: 3, row: 1, color: '#EDE9FE', border: '#8B5CF6', w: 1, h: 1 },
    { id: 'kids-bedroom', label: 'Kids Room', icon: '🧸', col: 3, row: 2, color: '#FCE7F3', border: '#EC4899', w: 1, h: 1 },
    { id: 'patio', label: 'Patio', icon: '🌿', col: 2, row: 2, color: '#CCFBF1', border: '#14B8A6', w: 1, h: 1 },
    { id: 'garage', label: 'Garage', icon: '🚗', col: 1, row: 3, color: '#F1F5F9', border: '#64748B', w: 1, h: 1 },
  ];

  return (
    <div className="w-full">
      {/* Intro */}
      <div className="text-center mb-8">
        <p className="text-gray-500 text-sm">Click any room to explore its connected devices and services</p>
      </div>

      {/* House visual */}
      <div className="relative max-w-3xl mx-auto">
        {/* House outline */}
        <div className="relative bg-white rounded-3xl border-2 border-mtn-grey p-6 shadow-sm overflow-hidden">
          {/* Roof decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-mtn-yellow via-yellow-400 to-mtn-yellow rounded-t-3xl" />

          {/* Label */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Floor Plan View</div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-3 h-3 bg-mtn-yellow rounded-sm" /> Active
              <span className="w-3 h-3 bg-gray-200 rounded-sm ml-2" /> Idle
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, auto)' }}>
            {roomLayout.map((room) => {
              const roomDevices = rooms[room.id]?.devices || [];
              const activeCount = roomDevices.filter((id) => deviceStates[id]?.isOn).length;
              const deviceList = rooms[room.id]?.devices.slice(0, 2).map((id) => devices[id]?.icon).join(' ') || '';

              return (
                <motion.button
                  key={room.id}
                  whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${room.border}40` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onRoomClick(room.id)}
                  className="relative rounded-2xl p-4 text-left transition-all border-2 group min-h-[100px] flex flex-col justify-between"
                  style={{
                    backgroundColor: room.color,
                    borderColor: room.border,
                    gridColumn: room.id === 'living-room' ? 'span 2' : 'span 1',
                  }}
                >
                  <div>
                    <span className="text-2xl">{room.icon}</span>
                    <p className="font-bold text-sm text-gray-800 mt-1 leading-tight">{room.label}</p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-lg">{deviceList}</span>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${activeCount > 0 ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-[10px] text-gray-500 font-medium">{activeCount} on</span>
                    </div>
                  </div>
                  {/* Hover arrow */}
                  <div className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold" style={{ color: room.border }}>
                    Explore →
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Bottom bar */}
          <div className="mt-6 pt-4 border-t border-mtn-grey flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-xl">⚡</span>
              <span className="font-semibold">Powered by MTN Fibre Prime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 font-medium">All systems online</span>
            </div>
          </div>
        </div>

        {/* Quick stats below house */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Connected Devices', value: Object.keys(devices).length, icon: '📱' },
            { label: 'Active Right Now', value: Object.values(deviceStates).filter(d => d.isOn).length, icon: '🟢' },
            { label: 'Monthly Bundle', value: '₦45,000', icon: '💳' },
            { label: 'Speed', value: '500 Mbps', icon: '⚡' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-mtn-grey p-3 text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="font-bold text-mtn-black text-sm">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Grid View ───────────────────────────────────────────────────────
function RoomsGrid({ onRoomClick }: { onRoomClick: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Object.values(rooms).map((room, i) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
        >
          <RoomCard room={room} onClick={() => onRoomClick(room.id)} />
        </motion.div>
      ))}
    </div>
  );
}
