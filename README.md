# MTN Fibre Prime — Interactive Home Experience

## Project Overview
- **Name**: MTN Fibre Prime Interactive
- **Goal**: Showcase the MTN Fibre Prime connected home ecosystem through an interactive digital twin of a 3-bedroom Lagos home.
- **Version**: v2.0 — Full UI/UX Redesign (March 2026)

## 🌐 URLs
- **GitHub Pages (Live)**: https://amper8and.github.io/fibre-prime-interactive-02/
- **GitHub Repository**: https://github.com/amper8and/fibre-prime-interactive-02
- **Sandbox Preview**: https://3000-iduulkiwo7odwm1ad6hvo-d0b9e1e2.sandbox.novita.ai

## 📄 Pages

| Path | Description |
|------|-------------|
| `/` | Landing page — hero, room grid, features, testimonials, CTA |
| `/experience` | Interactive home — floor plan + 7 clickable rooms |
| `/experience?room=<id>` | Individual room view with devices |
| `/marketplace` | Filterable product/service catalog |
| `/bundles` | Bundle builder — pick fibre plan + devices |
| `/plans` | Fibre plans, availability checker, FAQ |

## 🏠 Rooms & Devices

| Room | Theme | Devices |
|------|-------|---------|
| Living Room | Entertainment Hub | Smart TV, Gaming Console, Smart Speaker, Streaming Box, Robot Vacuum |
| Master Bedroom | Sleep & Comfort | Smart Lighting, Smart Thermostat, Smart Curtains |
| Kids Bedroom | Safety + Fun | Kids Gaming System, Smart Speaker, Smart Study Desk |
| Kitchen | Smart Convenience | Smart Fridge, Meal Delivery |
| Home Office | Productivity | High-Speed Fibre, Video Conferencing |
| Patio | Outdoor Living | Outdoor Speakers, Baby Monitor |
| Garage | Green Technology | Solar System, EV Charger |

## 🎨 Design System

**Brand Colors**
- Primary Yellow: `#FFCB00`
- Black: `#000000`
- Background: `#F5F5F5`
- Border: `#E5E5E5`
- Dark Panel: `#1A1A1A`

**Typography**: MTN Brighter Sans (Light 300, Regular 400, Bold 700)

**Layout**: 1400px max-width, 80px margin desktop, 12-column grid

**Components**: Cards (12px radius), Buttons (primary/secondary/ghost), Status badges, Device hotspots, Slide-out panels, Toast notifications

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animations | Framer Motion |
| State | Zustand |
| Icons | Lucide React |
| Fonts | MTN Brighter Sans (local TTF) |
| Deploy | GitHub Pages (gh-pages branch) |

## 🚀 Deployment

### Local Development
```bash
npm install
npm run build    # builds to out/
npx serve out -p 3000
```

### GitHub Pages
The `out/` directory is deployed to the `gh-pages` branch automatically.

### PM2 (sandbox)
```bash
npm run build
pm2 start ecosystem.config.cjs
```

## 📁 Folder Structure
```
webapp/
├── app/
│   ├── page.tsx              # Landing page
│   ├── experience/page.tsx   # Interactive home
│   ├── bundles/page.tsx      # Bundle builder
│   ├── marketplace/page.tsx  # Marketplace
│   ├── plans/page.tsx        # Fibre plans
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Design tokens + components
├── components/
│   ├── home/ExperienceClient.tsx   # Floor plan + room grid
│   ├── rooms/RoomView.tsx          # Room detail + devices
│   ├── device-panels/DevicePanel.tsx  # Slide-out device panel
│   ├── ui/Navigation.tsx           # Dark premium navbar
│   ├── ui/BundleWidget.tsx         # Floating bundle widget
│   └── ui/NotificationToast.tsx    # Toast notification
├── lib/data.ts               # All room/device/bundle data
├── store/useAppStore.ts      # Zustand state management
└── public/
    ├── fonts/                # MTN Brighter Sans TTF files
    └── icons/                # SVG icons + favicon
```

## ✅ Completed Features
- [x] MTN brand design system (yellow #FFCB00, black, MTN Brighter Sans)
- [x] Premium dark navigation bar
- [x] Hero landing page with animated stats
- [x] Interactive floor plan (click any room)
- [x] 7 rooms with device detail cards
- [x] Slide-out device panel with simulation
- [x] Bundle builder (step-by-step)
- [x] Marketplace with search + category filter
- [x] Fibre plans with availability checker
- [x] PWA manifest + favicon
- [x] Responsive design (desktop/tablet/mobile)
- [x] Continuous GitHub commits

## 🔜 Next Steps
- [ ] Three.js isometric 3D home (replace CSS floor plan)
- [ ] Real-time device state WebSockets
- [ ] Checkout / payment integration
- [ ] Push notifications (PWA)
- [ ] Animated device simulations (per device type)

---
© 2026 MTN Nigeria Communications Plc.
