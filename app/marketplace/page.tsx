'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Filter, Search, ShoppingBag, Sparkles, Store } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import SiteFooter from '@/components/ui/SiteFooter';
import { marketplaceServices, type ContentService } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';

type Category = 'all' | ContentService['category'];

const categories: Array<{
  id: Category;
  label: string;
  headline: string;
  copy: string;
  tiles: string[];
}> = [
  {
    id: 'device',
    label: 'Devices',
    headline: 'Connected hardware',
    copy: 'Discover premium routers, screens, smart speakers and control devices for the Fibre Prime home.',
    tiles: ['Smart TV', 'Speaker', 'Camera', 'Router'],
  },
  {
    id: 'content',
    label: 'Content',
    headline: 'Entertainment partners',
    copy: 'Bundle the streaming and audio services that make each room immediately useful.',
    tiles: ['Netflix', 'Prime', 'Disney+', 'Music'],
  },
  {
    id: 'home-service',
    label: 'Home Services',
    headline: 'Household services',
    copy: 'Layer in maintenance, energy and security services that extend the platform beyond devices.',
    tiles: ['Security', 'Cleaning', 'Solar', 'Support'],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    headline: 'Everyday convenience',
    copy: 'Add meal kits, wellness and other lifestyle subscriptions to round out the home experience.',
    tiles: ['Meals', 'Wellness', 'Fitness', 'Delivery'],
  },
];

const partnerStrip = ['Samsung', 'Apple', 'Google', 'DSTV', 'Netflix', 'Spotify'];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('device');
  const [search, setSearch] = useState('');
  const { bundleItems, addToBundle, removeFromBundle } = useAppStore();

  const filtered = useMemo(() => {
    return marketplaceServices.filter((service) => {
      const matchesCategory = activeCategory === 'all' ? true : service.category === activeCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch = !query
        ? true
        : service.name.toLowerCase().includes(query) || service.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <NotificationToast />

      <main className="pt-[calc(var(--nav-height)+0.75rem)]">
        <section className="page-container pb-12">
          <div className="glass-panel p-5 sm:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="section-label">Marketplace</p>
                <h1 className="text-page mt-3 text-black">Fibre Prime Marketplace</h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/60">
                  Discover devices, entertainment and services curated for a premium connected-home experience.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative block min-w-[280px]">
                  <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="fp-input pl-11"
                    placeholder="Search devices and services"
                  />
                </label>
                <button className="btn-secondary">
                  <Filter size={16} />
                  Filter view
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="page-container pb-10">
          <div className="grid gap-5 lg:grid-cols-2">
            {categories.map((category, index) => {
              const selected = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`fp-card-hover overflow-hidden p-6 text-left ${selected ? 'gold-outline' : ''}`}
                >
                  <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                    <div>
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#ffcb00] text-black">
                        <Store size={22} />
                      </div>
                      <p className="mt-5 text-[2rem] font-bold leading-none tracking-[-0.05em] text-black">{category.label}</p>
                      <p className="mt-2 text-sm font-semibold text-black/68">{category.headline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-black/58">{category.copy}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {category.tiles.map((tile) => (
                        <div key={tile} className="rounded-[20px] border border-black/8 bg-[#f7f4ee] px-4 py-5 text-center text-sm font-bold text-black">
                          {tile}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-10 rounded-[26px] border border-black/8 bg-white/74 px-5 py-4 backdrop-blur-sm">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-black/36">Featured partners</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-2xl font-bold tracking-[-0.04em] text-black/28 sm:text-3xl">
              {partnerStrip.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="page-container pb-16">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="section-label">Catalog</p>
              <h2 className="section-title mt-2 text-black">{filtered.length} items ready to bundle</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setActiveCategory('all')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === 'all' ? 'bg-black text-white' : 'border border-black/10 bg-white text-black/66'}`}>
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category.id ? 'bg-black text-white' : 'border border-black/10 bg-white text-black/66'}`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((service, index) => {
              const inBundle = bundleItems.includes(service.id);
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
                  className="fp-card-hover overflow-hidden p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-xl" style={{ backgroundColor: `${service.color}1a` }}>
                      {service.icon}
                    </div>
                    <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black/46">
                      {service.category.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.45rem] font-bold leading-none tracking-[-0.04em] text-black">{service.name}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-black/58">{service.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                    <div>
                      <p className="text-lg font-bold text-black">N{service.monthlyPrice.toLocaleString()}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-black/40">Monthly</p>
                    </div>
                    <button
                      onClick={() => (inBundle ? removeFromBundle(service.id) : addToBundle(service.id))}
                      className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition ${inBundle ? 'bg-black text-white' : 'bg-[#ffcb00] text-black'}`}
                    >
                      {inBundle ? <Check size={15} /> : <ShoppingBag size={15} />}
                      {inBundle ? 'Added' : 'Add'}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {bundleItems.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Link href="/bundles" className="btn-primary px-7">
                <ShoppingBag size={16} />
                Review {bundleItems.length} bundle items
              </Link>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

