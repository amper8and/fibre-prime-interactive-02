'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ShoppingCart, Menu, X, Wifi, Home, Store, Package, Zap, ChevronRight } from 'lucide-react';

const navLinks = [
  { href: '/experience', label: 'Home Experience', icon: Home },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/bundles', label: 'Bundles', icon: Package },
  { href: '/plans', label: 'Fibre Plans', icon: Zap },
];

export default function Navigation() {
  const pathname = usePathname();
  const { bundleItems, isNavOpen, setNavOpen } = useAppStore();
  const [scrolled] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white border-b border-mtn-grey'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mtn-yellow rounded-xl flex items-center justify-center font-bold text-sm sm:text-base text-mtn-black leading-none select-none group-hover:scale-105 transition-transform">
                MTN
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-mtn-black text-sm leading-tight">Fibre Prime</div>
                <div className="text-xs text-gray-500 leading-tight">Interactive Home</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    pathname === href
                      ? 'bg-mtn-yellow text-mtn-black'
                      : 'text-gray-600 hover:text-mtn-black hover:bg-mtn-grey'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Bundle Cart */}
              <Link href="/bundles" className="relative flex items-center gap-2 bg-mtn-black text-white px-3 py-2 rounded-xl hover:bg-gray-800 transition-all text-sm font-semibold min-h-[44px]">
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">My Bundle</span>
                {bundleItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mtn-yellow text-mtn-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {bundleItems.length}
                  </span>
                )}
              </Link>

              {/* Check Availability CTA */}
              <Link href="/plans" className="hidden lg:flex mtn-btn-primary text-sm px-4 py-2 min-h-[44px]">
                <Wifi size={16} />
                Check Availability
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setNavOpen(!isNavOpen)}
                className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-mtn-grey transition-colors"
                aria-label="Toggle menu"
              >
                {isNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isNavOpen && (
          <div className="md:hidden bg-white border-t border-mtn-grey animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    pathname === href
                      ? 'bg-mtn-yellow text-mtn-black'
                      : 'text-gray-700 hover:bg-mtn-grey'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {label}
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              ))}
              <Link
                href="/plans"
                onClick={() => setNavOpen(false)}
                className="flex items-center gap-2 w-full mtn-btn-primary mt-3 text-sm"
              >
                <Wifi size={16} />
                Check Fibre Availability
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
