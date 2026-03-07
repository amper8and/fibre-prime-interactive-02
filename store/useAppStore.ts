import { create } from 'zustand';
import { Device, devices as allDevices } from '@/lib/data';

interface AppState {
  // Navigation
  currentRoom: string | null;
  setCurrentRoom: (room: string | null) => void;

  // Device interaction
  activeDevice: Device | null;
  setActiveDevice: (device: Device | null) => void;
  deviceStates: Record<string, { isOn: boolean; isAnimating: boolean; status: string }>;
  toggleDevice: (deviceId: string) => void;
  triggerAnimation: (deviceId: string) => void;

  // Bundle builder
  bundleItems: string[];
  addToBundle: (deviceId: string) => void;
  removeFromBundle: (deviceId: string) => void;
  clearBundle: () => void;
  getBundleTotal: () => number;

  // UI
  isPanelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  isNavOpen: boolean;
  setNavOpen: (open: boolean) => void;
  currentScene: 'day' | 'evening' | 'night';
  setScene: (scene: 'day' | 'evening' | 'night') => void;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  setNotification: (n: AppState['notification']) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRoom: null,
  setCurrentRoom: (room) => set({ currentRoom: room }),

  activeDevice: null,
  setActiveDevice: (device) => set({ activeDevice: device, isPanelOpen: !!device }),

  deviceStates: Object.keys(allDevices).reduce((acc, id) => {
    acc[id] = { isOn: true, isAnimating: false, status: allDevices[id].status };
    return acc;
  }, {} as Record<string, { isOn: boolean; isAnimating: boolean; status: string }>),

  toggleDevice: (deviceId) => set((state) => ({
    deviceStates: {
      ...state.deviceStates,
      [deviceId]: {
        ...state.deviceStates[deviceId],
        isOn: !state.deviceStates[deviceId]?.isOn,
        isAnimating: true,
        status: !state.deviceStates[deviceId]?.isOn ? 'active' : 'idle',
      },
    },
  })),

  triggerAnimation: (deviceId) => {
    set((state) => ({
      deviceStates: {
        ...state.deviceStates,
        [deviceId]: { ...state.deviceStates[deviceId], isAnimating: true },
      },
    }));
    setTimeout(() => {
      set((state) => ({
        deviceStates: {
          ...state.deviceStates,
          [deviceId]: { ...state.deviceStates[deviceId], isAnimating: false },
        },
      }));
    }, 3000);
  },

  bundleItems: [],
  addToBundle: (deviceId) => set((state) => {
    if (state.bundleItems.includes(deviceId)) return state;
    const device = allDevices[deviceId];
    get().setNotification({ message: `${device?.name} added to your bundle!`, type: 'success' });
    setTimeout(() => get().setNotification(null), 3000);
    return { bundleItems: [...state.bundleItems, deviceId] };
  }),
  removeFromBundle: (deviceId) => set((state) => ({
    bundleItems: state.bundleItems.filter((id) => id !== deviceId),
  })),
  clearBundle: () => set({ bundleItems: [] }),
  getBundleTotal: () => {
    const { bundleItems } = get();
    return bundleItems.reduce((total, id) => total + (allDevices[id]?.monthlyPrice || 0), 0);
  },

  isPanelOpen: false,
  setPanelOpen: (open) => set({ isPanelOpen: open }),
  isNavOpen: false,
  setNavOpen: (open) => set({ isNavOpen: open }),

  currentScene: 'day',
  setScene: (scene) => set({ currentScene: scene }),

  notification: null,
  setNotification: (n) => set({ notification: n }),
}));
