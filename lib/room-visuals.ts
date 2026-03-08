import { assetPath } from '@/lib/site';

export const roomVisuals: Record<
  string,
  {
    image: string;
    accent: string;
    surface: string;
    overlay: string;
    hotspot: { top: string; left: string };
    headline: string;
    mood: string;
  }
> = {
  'living-room': {
    image: assetPath('/mockups/living-room-experience.png'),
    accent: '#f3c100',
    surface: '#1b1b1b',
    overlay: 'rgba(15, 15, 15, 0.72)',
    hotspot: { top: '56%', left: '35%' },
    headline: 'Entertainment, gaming and ambient comfort in one always-on media zone.',
    mood: 'Stream, play and automate from one responsive control surface.',
  },
  kitchen: {
    image: assetPath('/mockups/kitchen-experience.png'),
    accent: '#f3c100',
    surface: '#171717',
    overlay: 'rgba(18, 18, 18, 0.68)',
    hotspot: { top: '49%', left: '52%' },
    headline: 'Smart convenience for planning meals, deliveries and household routines.',
    mood: 'Recipes, groceries and automation flow through a connected kitchen hub.',
  },
  'master-bedroom': {
    image: assetPath('/mockups/main-bedroom-experience.png'),
    accent: '#f3c100',
    surface: '#161616',
    overlay: 'rgba(16, 16, 16, 0.66)',
    hotspot: { top: '42%', left: '58%' },
    headline: 'Lighting, climate and privacy controls tuned for restful comfort.',
    mood: 'Sleep mode transitions the room into a softer, lower-friction state.',
  },
  'kids-bedroom': {
    image: assetPath('/mockups/kids-bedreoom-experience.png'),
    accent: '#f3c100',
    surface: '#171717',
    overlay: 'rgba(19, 19, 19, 0.68)',
    hotspot: { top: '62%', left: '63%' },
    headline: 'A safe digital environment with study, entertainment and parental controls.',
    mood: 'Create clear boundaries between fun, focus and bedtime routines.',
  },
  'home-office': {
    image: assetPath('/mockups/home-office-experience.png'),
    accent: '#f3c100',
    surface: '#161616',
    overlay: 'rgba(17, 17, 17, 0.68)',
    hotspot: { top: '58%', left: '50%' },
    headline: 'Business-grade reliability for video meetings, large transfers and productivity.',
    mood: 'Work sessions stay stable, fast and visually calm across the day.',
  },
  patio: {
    image: assetPath('/mockups/patio-experience.png'),
    accent: '#f3c100',
    surface: '#151515',
    overlay: 'rgba(18, 18, 18, 0.64)',
    hotspot: { top: '51%', left: '44%' },
    headline: 'Outdoor leisure, music and peace of mind carried beyond the interior walls.',
    mood: 'The patio becomes an extension of the connected home, not an afterthought.',
  },
  garage: {
    image: assetPath('/mockups/garage-experience.png'),
    accent: '#f3c100',
    surface: '#151515',
    overlay: 'rgba(18, 18, 18, 0.66)',
    hotspot: { top: '55%', left: '67%' },
    headline: 'Energy and mobility systems built around solar efficiency and EV readiness.',
    mood: 'Track charging, generation and uptime with a high-visibility control layer.',
  },
};

export const homeHotspots = [
  { roomId: 'living-room', label: 'Living Room', top: '49%', left: '27%' },
  { roomId: 'kitchen', label: 'Kitchen', top: '34%', left: '43%' },
  { roomId: 'master-bedroom', label: 'Master Bedroom', top: '26%', left: '58%' },
  { roomId: 'kids-bedroom', label: 'Kids Room', top: '58%', left: '67%' },
  { roomId: 'home-office', label: 'Home Office', top: '73%', left: '46%' },
  { roomId: 'patio', label: 'Patio', top: '72%', left: '30%' },
  { roomId: 'garage', label: 'Garage', top: '49%', left: '83%' },
];
