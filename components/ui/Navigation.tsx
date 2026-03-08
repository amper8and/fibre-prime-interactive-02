'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Menu, X, ShoppingBag, ChevronRight, Wifi } from 'lucide-react';

const navLinks = [
  { href: '/experience',  label: 'Home Experience' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/bundles',     label: 'Bundles' },
  { href: '/plans',       label: 'Fibre Plans' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { bundleItems } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '?');

  return (
    <>
      {/* ── Main navbar ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-black border-b border-white/10'
        }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="page-container h-full flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            {/* MTN yellow badge */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center
                         font-bold text-[11px] text-black leading-none
                         bg-[#FFCB00] group-hover:scale-105 transition-transform duration-200"
              aria-label="MTN"
            >
              MTN
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-[14px] leading-tight">Fibre Prime</p>
              <p className="text-white/35 text-[10px] font-light leading-tight tracking-wide">
                Interactive Home
              </p>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${isActive(href) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Bundle cart */}
            <Link
              href="/bundles"
              className="relative flex items-center gap-2 h-11 px-3
                         text-sm font-semibold text-white/70
                         hover:text-white rounded-xl
                         hover:bg-white/6
                         transition-all duration-200 min-w-[44px] justify-center"
              aria-label={`My Bundle — ${bundleItems.length} items`}
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline text-sm">Bundle</span>
              {bundleItems.length > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5
                             bg-[#FFCB00] text-black text-[10px] font-bold
                             rounded-full flex items-center justify-center"
                >
                  {bundleItems.length}
                </span>
              )}
            </Link>

            {/* Primary CTA */}
            <Link
              href="/plans"
              className="hidden sm:flex btn-primary text-[13px] px-4 py-2 rounded-xl gap-1.5"
            >
              <Wifi size={14} />
              Get Connected
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden btn-icon text-white hover:bg-white/8"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div
            className="absolute top-[var(--nav-height)] left-0 right-0
                       bg-[#111111] border-b border-white/8
                       shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                       animate-scale-in origin-top"
          >
            <div className="page-container py-5 space-y-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between
                             px-4 py-3.5 rounded-xl min-h-[52px]
                             text-sm font-semibold
                             transition-all duration-150 ${
                    isActive(href)
                      ? 'text-[#FFCB00] bg-[#FFCB00]/8'
                      : 'text-white/70 hover:text-white hover:bg-white/6'
                  }`}
                >
                  {label}
                  <ChevronRight
                    size={16}
                    className={isActive(href) ? 'text-[#FFCB00] opacity-70' : 'opacity-30'}
                  />
                </Link>
              ))}
              <div className="pt-3 border-t border-white/8">
                <Link
                  href="/plans"
                  className="btn-primary w-full text-sm rounded-xl"
                >
                  <Wifi size={16} />
                  Get Connected
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
