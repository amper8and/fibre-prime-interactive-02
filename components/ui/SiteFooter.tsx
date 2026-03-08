'use client';

import Link from 'next/link';
import BrandMark from '@/components/ui/BrandMark';

const footerLinks = [
  { href: '/experience', label: 'Home Experience' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/bundles', label: 'Bundles' },
  { href: '/plans', label: 'Fibre Plans' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/8 bg-white">
      <div className="page-container py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <BrandMark compact />
            <p className="mt-4 text-lg font-semibold text-black">MTN Fibre Prime</p>
            <p className="mt-2 text-sm leading-relaxed text-black/58">
              A connected home experience that turns fibre, devices, content, and services
              into one premium household platform.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 text-sm font-semibold text-black/64">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-black">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-black/8 pt-5 text-xs text-black/46 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MTN Nigeria Communications Plc.</p>
          <p>Designed as an interactive showcase for the Fibre Prime connected-home ecosystem.</p>
        </div>
      </div>
    </footer>
  );
}

