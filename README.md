# MTN Fibre Prime — Interactive Home Experience

## 🏠 Project Overview
- **Product**: MTN Fibre Prime Interactive Home Experience
- **Goal**: Demonstrate how MTN Fibre Prime powers a connected Lagos smart home ecosystem
- **Tagline**: _Not just internet. An ecosystem._

## 🔗 URLs
- **Live (Sandbox)**: https://3000-iduulkiwo7odwm1ad6hvo-d0b9e1e2.sandbox.novita.ai
- **GitHub Repo**: https://github.com/amper8and/fibre-prime-interactive-02

## 📱 Pages
| Route | Description |
|---|---|
| `/` | Landing page — hero, room preview, features, testimonials |
| `/experience` | Interactive home — floor plan + all 7 rooms |
| `/experience?room=living-room` | Deep-link to any room |
| `/marketplace` | Full service/device catalogue |
| `/bundles` | Custom bundle builder |
| `/plans` | Fibre plans + availability checker |

## 🏠 Rooms Implemented
1. **Living Room** — Smart TV, Gaming Console, Smart Speaker, Streaming Box, Robot Vacuum
2. **Master Bedroom** — Smart Lighting, Smart Thermostat, Smart Curtains
3. **Kids Bedroom** — Gaming System, Smart Speaker, Study Desk
4. **Kitchen** — Smart Fridge, Meal Delivery
5. **Home Office** — High-Speed Fibre, Video Conferencing
6. **Patio** — Outdoor Speakers, Baby Monitor
7. **Garage** — Solar System, EV Charger

## 🎮 Device Interaction System
Each device follows: **Hover → Click → Panel Opens → Simulate Experience → Add to Bundle**

## 💛 Brand
- **Primary Yellow**: `#FFCB00`
- **Primary Black**: `#000000`
- **Background**: `#F8F8F8`
- **Font**: MTN Brighter Sans (place fonts in `/public/fonts/`)

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **UI**: React + Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Icons**: Lucide React

## 🚀 Running Locally
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

## 🏗️ Building for Production
```bash
npm run build
npm start
```

## 📁 Project Structure
```
/app              → Next.js pages
  /experience     → Interactive home page
  /marketplace    → Marketplace page
  /bundles        → Bundle builder page
  /plans          → Fibre plans page
/components
  /home           → ExperienceClient (main home view)
  /rooms          → RoomCard, RoomView
  /device-panels  → DevicePanel, DeviceAnimation
  /ui             → Navigation, NotificationToast
/lib              → data.ts (all devices, rooms, bundles)
/store            → Zustand state (useAppStore.ts)
/public/fonts     → Place MTN Brighter Sans .ttf files here
```

## 🔤 Font Setup
Download MTN Brighter Sans and place in `/public/fonts/`:
- `MTNBrighterSans-Regular.ttf`
- `MTNBrighterSans-Light.ttf`
- `MTNBrighterSans-Bold.ttf`

## 📊 Mock Data
All pricing and device data is in `/lib/data.ts`. Update to connect to real APIs.

## ✅ Completed Features
- [x] Landing page with hero, room grid, features, testimonials
- [x] Interactive floor plan home view with 7 rooms
- [x] All 7 rooms with devices and themes
- [x] Device interaction panels with animations
- [x] Bundle builder (add/remove devices, running total)
- [x] Marketplace with search + category filtering
- [x] Fibre plans page with availability checker
- [x] Day/Evening/Night scene modes
- [x] Responsive design (mobile/tablet/desktop)
- [x] MTN brand colours and typography
- [x] PWA manifest

## 🔜 Next Steps
- [ ] Download and add MTN Brighter Sans font files
- [ ] Deploy to Vercel/Netlify
- [ ] Add real fibre availability API
- [ ] Connect to real CMS for pricing
- [ ] Add Three.js 3D home model (optional enhancement)
