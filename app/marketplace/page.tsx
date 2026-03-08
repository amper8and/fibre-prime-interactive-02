'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { marketplaceServices, ContentService } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import { Store, Plus, Check, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';

type Category = 'all' | ContentService['category'];

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'all',          label: 'All',           icon: '🌐' },
  { id: 'device',       label: 'Devices',       icon: '📱' },
  { id: 'content',      label: 'Content',       icon: '🎬' },
  { id: 'home-service', label: 'Home Services', icon: '🏠' },
  { id: 'lifestyle',    label: 'Lifestyle',     icon: '✨' },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const { bundleItems, addToBundle, removeFromBundle } = useAppStore();

  const filtered = marketplaceServices.filter((s) => {
    const matchCat    = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCategoryCount = (catId: Category) =>
    catId === 'all'
      ? marketplaceServices.length
      : marketplaceServices.filter((s) => s.category === catId).length;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />
      <NotificationToast />

      {/* ── Header ── */}
      <div className="pt-[var(--nav-height)] bg-black">
        <div className="page-container py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFCB00]/15 border border-[#FFCB00]/30
                            rounded-xl flex items-center justify-center">
              <Store size={20} className="text-[#FFCB00]" />
            </div>
            <div>
              <h1 className="text-[28px] sm:text-[32px] font-bold text-white leading-tight">
                Fibre Prime Marketplace
              </h1>
              <p className="text-white/40 text-sm mt-0.5">
                Devices, content, home services and lifestyle — all in one place.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-lg mt-6">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              placeholder="Search devices, services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="fp-input-dark pl-11 pr-11"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-white/30 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="page-container py-8">
        {/* ── Category tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-7 scrollbar-hide">
          {categories.map((cat) => {
            const count    = getCategoryCount(cat.id);
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl
                           font-semibold text-sm whitespace-nowrap
                           transition-all duration-200 min-h-[42px] ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white border border-[#E5E5E5] text-[#555] hover:border-[#CCC]'
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                {cat.label}
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-[#FFCB00] text-black'
                      : 'bg-[#F0F0F0] text-[#888]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Meta row ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#888] text-sm">
            {search
              ? `${filtered.length} results for "${search}"`
              : `${filtered.length} services available`}
          </p>
          {bundleItems.length > 0 && (
            <Link
              href="/bundles"
              className="flex items-center gap-2 bg-[#FFCB00] text-black
                         text-sm font-bold px-4 py-2 rounded-xl hover:bg-yellow-300
                         transition-colors"
            >
              <ShoppingBag size={15} />
              {bundleItems.length} in bundle
            </Link>
          )}
        </div>

        {/* ── Products grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-[#555] font-semibold">No results for &ldquo;{search}&rdquo;</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="mt-4 text-sm text-[#888] hover:text-black transition-colors underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((service, i) => {
                const inBundle = bundleItems.includes(service.id);
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: Math.min(i * 0.04, 0.35), duration: 0.35 }}
                    className={`fp-card group hover:-translate-y-1
                               hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                               transition-all duration-200 overflow-hidden ${
                      inBundle ? 'ring-2 ring-[#FFCB00]/60' : ''
                    }`}
                  >
                    {/* Color accent bar */}
                    <div className="h-1" style={{ backgroundColor: service.color }} />

                    <div className="p-5">
                      {/* Icon + partner */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                          style={{
                            backgroundColor: `${service.color}18`,
                            border: `1px solid ${service.color}30`,
                          }}
                        >
                          {service.icon}
                        </div>
                        {service.partner && (
                          <span className="text-[10px] text-[#888] font-semibold
                                           bg-[#F5F5F5] border border-[#E5E5E5]
                                           px-2 py-0.5 rounded-full">
                            {service.partner}
                          </span>
                        )}
                      </div>

                      {/* Name + desc */}
                      <h3 className="font-bold text-black text-[14px] mb-1 leading-snug">
                        {service.name}
                      </h3>
                      <p className="text-[#888] text-xs leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Price + add */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[18px] font-bold text-black">
                            ₦{service.monthlyPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#AAA]">/mo</span>
                        </div>
                        <button
                          onClick={() => inBundle ? removeFromBundle(service.id) : addToBundle(service.id)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center
                                     transition-all active:scale-95 ${
                            inBundle
                              ? 'bg-[#FFCB00] text-black'
                              : 'bg-[#F5F5F5] border border-[#E5E5E5] hover:bg-[#FFCB00] hover:border-[#FFCB00]'
                          }`}
                          aria-label={inBundle ? `Remove ${service.name}` : `Add ${service.name}`}
                        >
                          {inBundle ? <Check size={14} /> : <Plus size={14} />}
                        </button>
                      </div>

                      {/* Category */}
                      <div className="mt-4 pt-3 border-t border-[#F0F0F0]">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#AAA]">
                          {categories.find((c) => c.id === service.category)?.icon}{' '}
                          {service.category.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
