// MTN Fibre Prime - All device and room data
export type DeviceStatus = 'active' | 'idle' | 'offline' | 'streaming' | 'charging';

export interface Device {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: DeviceStatus;
  room: string;
  bundleId: string;
  monthlyPrice: number;
  animationType: 'tv' | 'vacuum' | 'lights' | 'curtains' | 'thermostat' | 'speaker' | 'gaming' | 'fridge' | 'solar' | 'ev' | 'wifi' | 'camera';
  features: string[];
  bundleName: string;
  partners?: string[];
  experience?: string;
}

export interface Room {
  id: string;
  name: string;
  theme: string;
  description: string;
  icon: string;
  gradient: string;
  devices: string[];
  position: { x: number; y: number };
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  devices: string[];
  highlighted?: boolean;
  color: string;
}

export interface ContentService {
  id: string;
  name: string;
  category: 'content' | 'device' | 'home-service' | 'lifestyle';
  icon: string;
  description: string;
  monthlyPrice: number;
  partner?: string;
  color: string;
}

// ───── DEVICES ─────────────────────────────────────────────────
export const devices: Record<string, Device> = {
  // Living Room
  'smart-tv': {
    id: 'smart-tv',
    name: 'Smart TV',
    icon: '📺',
    description: 'Stream your favourite shows, movies and live sports with crystal-clear 4K quality powered by MTN Fibre Prime.',
    status: 'streaming',
    room: 'living-room',
    bundleId: 'entertainment',
    monthlyPrice: 8500,
    animationType: 'tv',
    features: ['4K Ultra HD', 'Netflix', 'Showmax', 'YouTube', 'Live Sports'],
    bundleName: 'Entertainment Pack',
    partners: ['Netflix', 'Showmax', 'YouTube'],
    experience: 'Press Play to stream a movie powered by MTN Fibre Prime',
  },
  'gaming-console': {
    id: 'gaming-console',
    name: 'Gaming Console',
    icon: '🎮',
    description: 'Low-latency multiplayer gaming powered by MTN Fibre. Zero lag, maximum performance.',
    status: 'idle',
    room: 'living-room',
    bundleId: 'gaming',
    monthlyPrice: 12000,
    animationType: 'gaming',
    features: ['Low Latency <5ms', 'Online Multiplayer', 'Game Streaming', 'Monthly Game Pass'],
    bundleName: 'Gaming Bundle',
    partners: ['Xbox Game Pass', 'PlayStation Network'],
    experience: 'Start multiplayer game — powered by MTN Fibre low-latency',
  },
  'smart-speaker': {
    id: 'smart-speaker',
    name: 'Smart Speaker',
    icon: '🔊',
    description: 'Voice-controlled smart home hub. Control your entire connected home with just your voice.',
    status: 'active',
    room: 'living-room',
    bundleId: 'smart-home',
    monthlyPrice: 3500,
    animationType: 'speaker',
    features: ['Voice Control', 'Music Streaming', 'Smart Home Hub', 'Intercom'],
    bundleName: 'Smart Home Bundle',
    experience: 'Say "Call the kids for dinner" — speaker broadcasts across home',
  },
  'streaming-box': {
    id: 'streaming-box',
    name: 'Media Streaming Box',
    icon: '📡',
    description: 'All your favourite content in one box. DSTV, Netflix, Showmax and more.',
    status: 'active',
    room: 'living-room',
    bundleId: 'entertainment',
    monthlyPrice: 5500,
    animationType: 'tv',
    features: ['DSTV Stream', 'Netflix', 'Showmax', '4K HDR', 'Dolby Audio'],
    bundleName: 'Entertainment Pack',
    partners: ['DSTV', 'Netflix', 'Showmax'],
    experience: 'Switch between DSTV, Netflix and Showmax seamlessly',
  },
  'robot-vacuum': {
    id: 'robot-vacuum',
    name: 'Robot Vacuum',
    icon: '🤖',
    description: 'Smart robotic vacuum that cleans your home automatically. Schedule and monitor via the MTN Fibre Prime app.',
    status: 'idle',
    room: 'living-room',
    bundleId: 'smart-home',
    monthlyPrice: 4500,
    animationType: 'vacuum',
    features: ['Auto Schedule', 'App Control', 'Smart Mapping', 'Auto-Charge'],
    bundleName: 'Smart Home Bundle',
    experience: 'Start cleaning — watch the robot navigate your living room',
  },

  // Master Bedroom
  'smart-lighting': {
    id: 'smart-lighting',
    name: 'Smart Lighting',
    icon: '💡',
    description: 'Intelligent lighting that adapts to your mood and schedule. Set scenes, dim or brighten from anywhere.',
    status: 'active',
    room: 'master-bedroom',
    bundleId: 'smart-home',
    monthlyPrice: 2500,
    animationType: 'lights',
    features: ['16M Colors', 'Scene Presets', 'Auto-Schedule', 'Voice Control'],
    bundleName: 'Smart Home Bundle',
    experience: 'Activate Sleep Mode — lights dim to warm amber',
  },
  'smart-thermostat': {
    id: 'smart-thermostat',
    name: 'Smart Thermostat',
    icon: '🌡️',
    description: 'Intelligent climate control that learns your preferences and optimises comfort and energy usage.',
    status: 'active',
    room: 'master-bedroom',
    bundleId: 'smart-home',
    monthlyPrice: 3000,
    animationType: 'thermostat',
    features: ['Auto Learn', 'Energy Saving', 'Remote Control', 'Air Quality'],
    bundleName: 'Smart Home Bundle',
    experience: 'Set Sleep Mode — temperature adjusts to 22°C automatically',
  },
  'smart-curtains': {
    id: 'smart-curtains',
    name: 'Smart Curtains',
    icon: '🪟',
    description: 'Motorised curtains that open and close on schedule or on command. Privacy at the touch of a button.',
    status: 'idle',
    room: 'master-bedroom',
    bundleId: 'smart-home',
    monthlyPrice: 2000,
    animationType: 'curtains',
    features: ['Auto Schedule', 'Voice Control', 'Privacy Mode', 'Sunrise Wake'],
    bundleName: 'Smart Home Bundle',
    experience: 'Activate Sleep Mode — curtains close automatically',
  },

  // Kids Bedroom
  'kids-gaming': {
    id: 'kids-gaming',
    name: 'Kids Gaming System',
    icon: '🕹️',
    description: 'Safe and fun gaming for kids with built-in parental controls and educational content.',
    status: 'active',
    room: 'kids-bedroom',
    bundleId: 'family',
    monthlyPrice: 4000,
    animationType: 'gaming',
    features: ['Parental Controls', 'Educational Games', 'Screen Time Limits', 'Family Safe'],
    bundleName: 'Family Bundle',
    experience: 'Set study time limits — gaming pauses automatically at 8PM',
  },
  'kids-speaker': {
    id: 'kids-speaker',
    name: 'Smart Speaker',
    icon: '🔈',
    description: 'Child-friendly smart speaker with educational content, stories and music.',
    status: 'idle',
    room: 'kids-bedroom',
    bundleId: 'family',
    monthlyPrice: 2500,
    animationType: 'speaker',
    features: ['Kid Safe', 'Audiobooks', 'Learning Content', 'Parental Control'],
    bundleName: 'Family Bundle',
    experience: 'Play a bedtime story — speaker tells interactive stories',
  },
  'study-desk': {
    id: 'study-desk',
    name: 'Smart Study Desk',
    icon: '📚',
    description: 'Connected study station with focused lighting, device charging and educational app access.',
    status: 'active',
    room: 'kids-bedroom',
    bundleId: 'family',
    monthlyPrice: 3000,
    animationType: 'lights',
    features: ['Focus Mode', 'E-Learning Access', 'Device Charging', 'Posture Reminder'],
    bundleName: 'Family Bundle',
    experience: 'Activate Study Mode — lights optimise, distractions blocked',
  },

  // Kitchen
  'smart-fridge': {
    id: 'smart-fridge',
    name: 'Smart Fridge',
    icon: '🧊',
    description: 'Connected fridge that tracks inventory, suggests recipes and orders groceries automatically.',
    status: 'active',
    room: 'kitchen',
    bundleId: 'lifestyle',
    monthlyPrice: 6500,
    animationType: 'fridge',
    features: ['Inventory Tracking', 'Recipe Suggestions', 'Auto Reorder', 'Expiry Alerts'],
    bundleName: 'Lifestyle Bundle',
    partners: ['Jumia Food', 'Chowdeck'],
    experience: 'Check inventory — fridge suggests tonight\'s dinner recipe',
  },
  'meal-subscription': {
    id: 'meal-subscription',
    name: 'Meal Delivery',
    icon: '🍽️',
    description: 'Weekly meal kit delivery service integrated with your smart fridge. Fresh ingredients, chef recipes.',
    status: 'active',
    room: 'kitchen',
    bundleId: 'lifestyle',
    monthlyPrice: 15000,
    animationType: 'fridge',
    features: ['Weekly Meal Kits', 'Chef Recipes', 'Fresh Ingredients', 'Nutritional Info'],
    bundleName: 'Lifestyle Bundle',
    partners: ['Chowdeck', 'Jumia Food', 'HelloMeals'],
    experience: 'Order tonight\'s dinner from your fridge display',
  },

  // Home Office
  'fibre-connection': {
    id: 'fibre-connection',
    name: 'High-Speed Fibre',
    icon: '⚡',
    description: 'Blazing fast MTN Fibre connection. Up to 1Gbps speeds for ultimate productivity and streaming.',
    status: 'active',
    room: 'home-office',
    bundleId: 'fibre',
    monthlyPrice: 25000,
    animationType: 'wifi',
    features: ['Up to 1Gbps', 'Unlimited Data', 'Static IP Available', 'Priority Support'],
    bundleName: 'Fibre Prime Plan',
    experience: 'Run a speed test — see your MTN Fibre Prime performance',
  },
  'video-conferencing': {
    id: 'video-conferencing',
    name: 'Video Conferencing',
    icon: '💻',
    description: 'Professional grade video calls with crystal-clear HD video and zero packet loss on MTN Fibre.',
    status: 'streaming',
    room: 'home-office',
    bundleId: 'productivity',
    monthlyPrice: 5000,
    animationType: 'wifi',
    features: ['HD 1080p Video', 'Zero Packet Loss', 'Zoom Ready', 'Teams & Meet'],
    bundleName: 'Work From Home Bundle',
    partners: ['Zoom', 'Microsoft Teams', 'Google Meet'],
    experience: 'Join a meeting — HD video, zero lag on MTN Fibre',
  },

  // Patio
  'outdoor-speakers': {
    id: 'outdoor-speakers',
    name: 'Outdoor Speakers',
    icon: '🎵',
    description: 'Weather-resistant outdoor audio system for your patio. Stream music from anywhere in the home.',
    status: 'active',
    room: 'patio',
    bundleId: 'entertainment',
    monthlyPrice: 4000,
    animationType: 'speaker',
    features: ['Weather Resistant', 'Multi-Room Audio', 'Spotify Connect', '360° Sound'],
    bundleName: 'Entertainment Pack',
    partners: ['Spotify', 'Apple Music'],
    experience: 'Play evening playlist — sound fills your patio',
  },
  'baby-monitor': {
    id: 'baby-monitor',
    name: 'Baby Monitor',
    icon: '👶',
    description: 'HD video baby monitor with night vision, two-way audio and motion alerts on your phone.',
    status: 'active',
    room: 'patio',
    bundleId: 'family',
    monthlyPrice: 3500,
    animationType: 'camera',
    features: ['HD Night Vision', 'Two-Way Audio', 'Motion Alerts', 'Temperature Monitor'],
    bundleName: 'Family Bundle',
    experience: 'Check on baby — live HD feed on your phone',
  },

  // Garage
  'solar-system': {
    id: 'solar-system',
    name: 'Solar Energy System',
    icon: '☀️',
    description: 'Rooftop solar panels with smart inverter. Monitor energy generation and reduce electricity bills.',
    status: 'active',
    room: 'garage',
    bundleId: 'green-tech',
    monthlyPrice: 18000,
    animationType: 'solar',
    features: ['5kW System', 'Battery Storage', 'Energy Monitoring', 'Grid Export'],
    bundleName: 'Green Tech Bundle',
    experience: 'Monitor solar output — tracking real-time energy savings',
  },
  'ev-charger': {
    id: 'ev-charger',
    name: 'EV Charger',
    icon: '🔋',
    description: 'Smart home EV charging station. Schedule charging during off-peak hours to save on electricity costs.',
    status: 'charging',
    room: 'garage',
    bundleId: 'green-tech',
    monthlyPrice: 8000,
    animationType: 'ev',
    features: ['22kW Fast Charge', 'Schedule Charging', 'Energy Monitoring', 'App Control'],
    bundleName: 'Green Tech Bundle',
    experience: 'Schedule overnight charging — charged by 6AM every day',
  },
};

// ───── ROOMS ──────────────────────────────────────────────────
export const rooms: Record<string, Room> = {
  'living-room': {
    id: 'living-room',
    name: 'Living Room',
    theme: 'Entertainment Hub',
    description: 'The heart of your connected home — stream, game, and relax.',
    icon: '🛋️',
    gradient: 'from-amber-500 to-orange-600',
    devices: ['smart-tv', 'gaming-console', 'smart-speaker', 'streaming-box', 'robot-vacuum'],
    position: { x: 20, y: 55 },
  },
  'master-bedroom': {
    id: 'master-bedroom',
    name: 'Master Bedroom',
    theme: 'Sleep & Comfort',
    description: 'Smart comfort and restful sleep with intelligent automation.',
    icon: '🛏️',
    gradient: 'from-purple-500 to-indigo-600',
    devices: ['smart-lighting', 'smart-thermostat', 'smart-curtains'],
    position: { x: 65, y: 20 },
  },
  'kids-bedroom': {
    id: 'kids-bedroom',
    name: 'Kids Bedroom',
    theme: 'Safety + Entertainment',
    description: 'Safe, fun and educational connected experiences for the kids.',
    icon: '🧸',
    gradient: 'from-pink-500 to-rose-500',
    devices: ['kids-gaming', 'kids-speaker', 'study-desk'],
    position: { x: 65, y: 55 },
  },
  'kitchen': {
    id: 'kitchen',
    name: 'Kitchen',
    theme: 'Convenience',
    description: 'Smart kitchen that helps you cook, order and manage food with ease.',
    icon: '🍳',
    gradient: 'from-green-500 to-emerald-600',
    devices: ['smart-fridge', 'meal-subscription'],
    position: { x: 20, y: 20 },
  },
  'home-office': {
    id: 'home-office',
    name: 'Home Office',
    theme: 'Productivity',
    description: 'Professional-grade connectivity for remote work and video calls.',
    icon: '💼',
    gradient: 'from-blue-500 to-cyan-600',
    devices: ['fibre-connection', 'video-conferencing'],
    position: { x: 42, y: 20 },
  },
  'patio': {
    id: 'patio',
    name: 'Patio',
    theme: 'Relaxation',
    description: 'Outdoor connected living — music, safety and leisure.',
    icon: '🌿',
    gradient: 'from-teal-500 to-green-600',
    devices: ['outdoor-speakers', 'baby-monitor'],
    position: { x: 42, y: 78 },
  },
  'garage': {
    id: 'garage',
    name: 'Garage',
    theme: 'Green Technology',
    description: 'Sustainable energy and smart electric vehicle management.',
    icon: '🚗',
    gradient: 'from-slate-600 to-gray-800',
    devices: ['solar-system', 'ev-charger'],
    position: { x: 20, y: 78 },
  },
};

// ───── BUNDLES ──────────────────────────────────────────────
export const bundles: Record<string, Bundle> = {
  'starter': {
    id: 'starter',
    name: 'Fibre Prime Starter',
    description: 'Perfect for getting started with connected home living.',
    monthlyPrice: 35000,
    devices: ['fibre-connection', 'smart-tv', 'smart-speaker'],
    color: 'from-gray-700 to-gray-900',
  },
  'entertainment': {
    id: 'entertainment',
    name: 'Entertainment Pack',
    description: 'The ultimate home entertainment experience.',
    monthlyPrice: 55000,
    devices: ['smart-tv', 'streaming-box', 'gaming-console', 'outdoor-speakers'],
    highlighted: true,
    color: 'from-amber-500 to-orange-600',
  },
  'smart-home': {
    id: 'smart-home',
    name: 'Smart Home Bundle',
    description: 'Automate your entire home for comfort and energy savings.',
    monthlyPrice: 45000,
    devices: ['smart-lighting', 'smart-thermostat', 'smart-curtains', 'robot-vacuum', 'smart-speaker'],
    color: 'from-purple-600 to-indigo-700',
  },
  'family': {
    id: 'family',
    name: 'Family Bundle',
    description: 'Everything your family needs — safety, learning and fun.',
    monthlyPrice: 48000,
    devices: ['kids-gaming', 'kids-speaker', 'baby-monitor', 'smart-speaker'],
    color: 'from-pink-500 to-rose-600',
  },
  'premium': {
    id: 'premium',
    name: 'Fibre Prime Premium',
    description: 'The complete MTN Fibre Prime ecosystem. Everything included.',
    monthlyPrice: 95000,
    devices: ['fibre-connection', 'smart-tv', 'gaming-console', 'smart-lighting', 'smart-thermostat', 'smart-curtains', 'robot-vacuum', 'smart-fridge', 'video-conferencing'],
    highlighted: true,
    color: 'from-yellow-400 to-amber-500',
  },
};

// ───── MARKETPLACE SERVICES ─────────────────────────────────
export const marketplaceServices: ContentService[] = [
  // Content
  { id: 'netflix', name: 'Netflix', category: 'content', icon: '🎬', description: 'Stream thousands of movies and series', monthlyPrice: 4400, partner: 'Netflix', color: '#E50914' },
  { id: 'showmax', name: 'Showmax', category: 'content', icon: '📺', description: 'African content and international series', monthlyPrice: 2900, partner: 'Showmax', color: '#FF0066' },
  { id: 'dstv', name: 'DSTV Stream', category: 'content', icon: '📡', description: 'Live TV, sports and entertainment', monthlyPrice: 8000, partner: 'MultiChoice', color: '#0066CC' },
  { id: 'spotify', name: 'Spotify', category: 'content', icon: '🎵', description: 'Unlimited music streaming', monthlyPrice: 1500, partner: 'Spotify', color: '#1DB954' },
  { id: 'youtube', name: 'YouTube Premium', category: 'content', icon: '▶️', description: 'Ad-free YouTube with offline downloads', monthlyPrice: 2100, color: '#FF0000' },
  { id: 'audiobooks', name: 'Audiobooks', category: 'content', icon: '📖', description: 'Thousands of audiobooks and podcasts', monthlyPrice: 1800, color: '#8B5CF6' },

  // Devices
  { id: 'dev-smarttv', name: 'Smart TV (55")', category: 'device', icon: '📺', description: '4K Smart TV with built-in streaming apps', monthlyPrice: 8500, color: '#1F2937' },
  { id: 'dev-router', name: 'Wi-Fi 6 Router', category: 'device', icon: '📶', description: 'Whole-home mesh Wi-Fi coverage', monthlyPrice: 3500, color: '#3B82F6' },
  { id: 'dev-vacuum', name: 'Robot Vacuum', category: 'device', icon: '🤖', description: 'Smart robotic vacuum cleaner', monthlyPrice: 4500, color: '#6B7280' },
  { id: 'dev-speaker', name: 'Smart Speaker', category: 'device', icon: '🔊', description: 'Voice-controlled smart home hub', monthlyPrice: 3500, color: '#374151' },
  { id: 'dev-lighting', name: 'Smart Lighting Kit', category: 'device', icon: '💡', description: 'Full home smart lighting system', monthlyPrice: 2500, color: '#F59E0B' },
  { id: 'dev-camera', name: 'Security Camera', category: 'device', icon: '📹', description: 'HD indoor/outdoor security camera', monthlyPrice: 3000, color: '#DC2626' },

  // Home Services
  { id: 'svc-security', name: 'Home Security', category: 'home-service', icon: '🔒', description: '24/7 monitored home security', monthlyPrice: 8500, color: '#1F2937' },
  { id: 'svc-cleaning', name: 'Home Cleaning', category: 'home-service', icon: '🧹', description: 'Weekly professional home cleaning', monthlyPrice: 12000, color: '#10B981' },
  { id: 'svc-electricity', name: 'Solar Energy', category: 'home-service', icon: '☀️', description: 'Solar panels + battery storage', monthlyPrice: 18000, color: '#F59E0B' },
  { id: 'svc-generator', name: 'Inverter Service', category: 'home-service', icon: '⚡', description: 'Smart inverter + maintenance', monthlyPrice: 9000, color: '#6366F1' },

  // Lifestyle
  { id: 'life-meals', name: 'Meal Delivery', category: 'lifestyle', icon: '🍽️', description: 'Weekly meal kits delivered fresh', monthlyPrice: 15000, partner: 'Chowdeck', color: '#F97316' },
  { id: 'life-fitness', name: 'Fitness Subscription', category: 'lifestyle', icon: '💪', description: 'Online fitness classes & coaching', monthlyPrice: 5000, color: '#EF4444' },
  { id: 'life-grocery', name: 'Grocery Delivery', category: 'lifestyle', icon: '🛒', description: 'Weekly grocery delivery to your door', monthlyPrice: 8000, partner: 'Jumia', color: '#22C55E' },
  { id: 'life-laundry', name: 'Laundry Service', category: 'lifestyle', icon: '👔', description: 'Pick-up and delivery laundry service', monthlyPrice: 7000, color: '#06B6D4' },
];

// ───── FIBRE PLANS ──────────────────────────────────────────
export const fibrePlans = [
  { id: 'basic', name: 'Fibre 50', speed: '50 Mbps', price: 15000, features: ['Unlimited Data', 'Free Router', '24/7 Support'] },
  { id: 'standard', name: 'Fibre 150', speed: '150 Mbps', price: 22000, features: ['Unlimited Data', 'Free Router', '24/7 Support', 'Static IP'], highlighted: false },
  { id: 'premium', name: 'Fibre 500', speed: '500 Mbps', price: 35000, features: ['Unlimited Data', 'Free Wi-Fi 6 Router', 'Priority Support', 'Static IP', 'SLA Guarantee'], highlighted: true },
  { id: 'ultra', name: 'Fibre 1000', speed: '1 Gbps', price: 55000, features: ['Unlimited Data', 'Free Wi-Fi 6E Router', 'Dedicated Support', 'Static IP', 'SLA Guarantee', 'Business Ready'] },
];
