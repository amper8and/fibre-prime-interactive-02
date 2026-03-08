'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, Wifi, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import BrandMark from '@/components/ui/BrandMark';

const navLinks = [
  { href: '/experience', label: 'Home Experience' },
  { href: '/marketplace', label: 'Devices' },
  { href: '/bundles', label: 'Bundles' },
  { href: '/plans', label: 'Fibre Plans' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { bundleItems } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}?`);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-black/8 bg-[rgba(250,248,243,0.86)] shadow-[0_16px_44px_rgba(5,5,5,0.08)] backdrop-blur-xl' : 'bg-transparent'
        }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="page-container flex h-full items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <BrandMark compact />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${isActive(link.href) ? 'active' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/bundles"
              className="relative inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 text-sm font-semibold text-black/72 backdrop-blur-md transition hover:bg-white"
              aria-label={`Bundle with ${bundleItems.length} items`}
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Bundle</span>
              {bundleItems.length > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#ffcb00] px-1 text-[10px] font-bold text-black">
                  {bundleItems.length}
                </span>
              )}
            </Link>

            <Link href="/plans" className="hidden sm:inline-flex btn-primary px-5">
              <Wifi size={16} />
              Get Connected
            </Link>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="btn-icon lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          <button className="absolute inset-0 bg-black/28" onClick={() => setMobileOpen(false)} aria-label="Close menu" />
          <div className="absolute left-5 right-5 top-[calc(var(--nav-height)+12px)] glass-panel p-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive(link.href) ? 'bg-black text-white' : 'text-black/70 hover:bg-black/4 hover:text-black'
                  }`}
                >
                  {link.label}
                  <span className="text-xs uppercase tracking-[0.18em] opacity-60">Go</span>
                </Link>
              ))}
            </div>
            <Link href="/plans" className="btn-primary mt-4 w-full justify-center">
              <Wifi size={16} />
              Get Connected
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

