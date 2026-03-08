'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, ShoppingBag, Sparkles, Sun, Sunset } from 'lucide-react';
import DevicePanel from '@/components/device-panels/DevicePanel';
import RoomView from '@/components/rooms/RoomView';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import { homeHotspots } from '@/lib/room-visuals';
import { assetPath } from '@/lib/site';
import { rooms } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';

const sceneConfig = {
  day: {
    label: 'Day',
    icon: Sun,
    filter: 'none',
    copy: 'Bright, high-visibility mode for the full connected home.',
  },
  evening: {
    label: 'Evening',
    icon: Sunset,
    filter: 'saturate(0.95) contrast(1.02) sepia(0.12)',
    copy: 'A warmer presentation for entertainment and ambient scenes.',
  },
  night: {
    label: 'Night',
    icon: Moon,
    filter: 'brightness(0.76) saturate(0.86) hue-rotate(6deg)',
    copy: 'Lower-light mode for rest, energy and security awareness.',
  },
} as const;

const roomOrder = ['living-room', 'kitchen', 'master-bedroom', 'kids-bedroom', 'home-office', 'patio', 'garage'];

export default function ExperienceClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentRoom, setCurrentRoom, currentScene, setScene, bundleItems } = useAppStore();

  useEffect(() => {
    const roomParam = searchParams.get('room');
    if (roomParam && rooms[roomParam]) {
      setCurrentRoom(roomParam);
    } else {
      setCurrentRoom(null);
    }
  }, [searchParams, setCurrentRoom]);

  const scene = sceneConfig[currentScene];

  const openRoom = (roomId: string) => {
    setCurrentRoom(roomId);
    router.push(`/experience?room=${roomId}`, { scroll: false });
  };

  const clearRoom = () => {
    setCurrentRoom(null);
    router.push('/experience', { scroll: false });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <NotificationToast />
      <DevicePanel />

      <main className="pt-[calc(var(--nav-height)+0.75rem)]">
        <div className="page-container pb-16">
          <AnimatePresence mode="wait">
            {currentRoom ? (
              <motion.div key={currentRoom} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.32 }}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <button onClick={clearRoom} className="inline-flex items-center gap-2 text-sm font-semibold text-black/56 transition hover:text-black">
                      <ArrowLeft size={15} />
                      Back to full home
                    </button>
                    <h1 className="mt-3 text-page text-black">{rooms[currentRoom]?.name}</h1>
                    <p className="mt-2 text-base text-black/58">{rooms[currentRoom]?.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {(Object.keys(sceneConfig) as Array<keyof typeof sceneConfig>).map((key) => {
                      const Icon = sceneConfig[key].icon;
                      const active = currentScene === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setScene(key)}
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${active ? 'bg-black text-white' : 'border border-black/10 bg-white/74 text-black/65'}`}
                        >
                          <Icon size={15} />
                          {sceneConfig[key].label}
                        </button>
                      );
                    })}
                    {bundleItems.length > 0 && (
                      <Link href="/bundles" className="btn-primary">
                        <ShoppingBag size={16} />
                        {bundleItems.length} in bundle
                      </Link>
                    )}
                  </div>
                </div>

                <div style={{ filter: scene.filter, transition: 'filter 400ms ease' }}>
                  <RoomView roomId={currentRoom} />
                </div>
              </motion.div>
            ) : (
              <motion.div key="home" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.32 }}>
                <section className="grid gap-8 xl:grid-cols-[0.42fr_0.58fr] xl:items-start">
                  <div className="space-y-6">
                    <div>
                      <p className="section-label">Interactive home</p>
                      <h1 className="text-page mt-3 max-w-[10ch] text-black">Explore your smart home.</h1>
                      <p className="mt-4 max-w-lg text-base leading-relaxed text-black/62">Navigate a room-based connected-home model where devices, scenes and bundle options stay visually tied to the space they serve.</p>
                    </div>

                    <div className="glass-panel p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/42">Scene mode</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(Object.keys(sceneConfig) as Array<keyof typeof sceneConfig>).map((key) => {
                          const Icon = sceneConfig[key].icon;
                          const active = currentScene === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setScene(key)}
                              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${active ? 'bg-black text-white' : 'bg-white text-black/70 shadow-[inset_0_0_0_1px_rgba(5,5,5,0.08)]'}`}
                            >
                              <Icon size={15} />
                              {sceneConfig[key].label}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-black/58">{scene.copy}</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="metric-card">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/42">Navigation model</p>
                        <p className="mt-3 text-lg font-bold text-black">Home to room to device</p>
                        <p className="mt-2 text-sm leading-relaxed text-black/58">Spatial context remains visible while users move between experiences.</p>
                      </div>
                      <div className="metric-card">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/42">Bundle status</p>
                        <p className="mt-3 text-lg font-bold text-black">Persistent across rooms</p>
                        <p className="mt-2 text-sm leading-relaxed text-black/58">Every selected device stays ready for review in the bundle builder.</p>
                      </div>
                    </div>
                  </div>

                  <div className="media-frame overflow-hidden rounded-[38px] p-3">
                    <div className="relative aspect-[1.34/0.98] overflow-hidden rounded-[32px] bg-[#f2eee7]" style={{ filter: scene.filter, transition: 'filter 400ms ease' }}>
                      <img src={assetPath('/mockups/interactive-home.png')} alt="Interactive smart home" className="absolute inset-0 h-full w-full object-cover" />
                      {homeHotspots.map((hotspot) => (
                        <button
                          key={hotspot.roomId}
                          onClick={() => openRoom(hotspot.roomId)}
                          className="group absolute"
                          style={{ top: hotspot.top, left: hotspot.left, transform: 'translate(-50%, -50%)' }}
                        >
                          <span className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffcb00]/20 blur-xl transition group-hover:bg-[#ffcb00]/34" />
                          <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#ffcb00] bg-white shadow-[0_0_0_6px_rgba(255,203,0,0.16)]" />
                          <span className="absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-black/78 px-3 py-1 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                            {hotspot.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="mt-10">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="section-label">Rooms</p>
                      <h2 className="section-title mt-2 text-black">Choose a space to inspect more closely.</h2>
                    </div>
                    {bundleItems.length > 0 && (
                      <Link href="/bundles" className="btn-primary">
                        <ShoppingBag size={16} />
                        Review bundle
                      </Link>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {roomOrder.map((roomId, index) => {
                      const room = rooms[roomId];
                      return (
                        <motion.button
                          key={room.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.32, delay: index * 0.05 }}
                          onClick={() => openRoom(room.id)}
                          className="fp-card-hover overflow-hidden text-left"
                        >
                          <div className="relative aspect-[1.15/0.82] overflow-hidden border-b border-black/8">
                            <img src={assetPath(room.id === 'master-bedroom' ? '/mockups/main-bedroom-experience.png' : room.id === 'kids-bedroom' ? '/mockups/kids-bedreoom-experience.png' : `/mockups/${room.id}-experience.png`)} alt={room.name} className="absolute inset-0 h-full w-full object-cover" />
                          </div>
                          <div className="p-5">
                            <p className="text-xl font-bold tracking-[-0.04em] text-black">{room.name}</p>
                            <p className="mt-2 text-sm leading-relaxed text-black/58">{room.theme}</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black">
                              Open room
                              <Sparkles size={15} />
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}





