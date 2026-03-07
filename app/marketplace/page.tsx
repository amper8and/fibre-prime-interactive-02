'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { marketplaceServices, ContentService } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import { Store, Plus, Check, Filter } from 'lucide-react';

type Category = 'all' | ContentService['category'];

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '🌐' },
  { id: 'device', label: 'Devices', icon: '📱' },
  { id: 'content', label: 'Content', icon: '🎬' },
  { id: 'home-service', label: 'Home Services', icon: '🏠' },
  { id: 'lifestyle', label: 'Lifestyle', icon: '✨' },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const { bundleItems, addToBundle, removeFromBundle } = useAppStore();

  const filtered = marketplaceServices.filter((s) => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-mtn-bg font-mtn">
      <Navigation />
      <NotificationToast />

      {/* Header */}
      <div className="pt-20 bg-gradient-to-r from-mtn-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Store size={24} className="text-mtn-yellow" />
            <h1 className="text-3xl font-bold text-white">Fibre Prime Marketplace</h1>
          </div>
          <p className="text-gray-400 mb-6">Devices, content, home services and lifestyle experiences — all in one place.</p>

          {/* Search */}
          <div className="relative max-w-lg">
            <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search devices, services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 backdrop-blur text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:border-mtn-yellow/50 transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-mtn-black text-white shadow'
                  : 'bg-white border border-mtn-grey text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeCategory === cat.id ? 'bg-mtn-yellow text-mtn-black' : 'bg-mtn-grey text-gray-600'
              }`}>
                {cat.id === 'all' ? marketplaceServices.length : marketplaceServices.filter(s => s.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm">{filtered.length} services available</p>
          {bundleItems.length > 0 && (
            <div className="text-sm text-mtn-black font-semibold bg-mtn-yellow px-3 py-1 rounded-full">
              {bundleItems.length} items in bundle
            </div>
          )}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-gray-500">No results found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((service, i) => {
              const inBundle = bundleItems.includes(service.id);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.5) }}
                  className={`mtn-card overflow-hidden group hover:shadow-md transition-all hover:-translate-y-1 ${inBundle ? 'ring-2 ring-mtn-yellow' : ''}`}
                >
                  {/* Color header */}
                  <div
                    className="h-2 w-full"
                    style={{ backgroundColor: service.color }}
                  />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                        style={{ backgroundColor: service.color + '20', border: `1px solid ${service.color}40` }}
                      >
                        {service.icon}
                      </div>
                      {service.partner && (
                        <span className="text-[10px] text-gray-400 font-medium bg-mtn-bg border border-mtn-grey px-2 py-0.5 rounded-full">
                          {service.partner}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-mtn-black text-sm mb-1">{service.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{service.description}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-mtn-black">₦{service.monthlyPrice.toLocaleString()}</span>
                        <span className="text-xs text-gray-400">/mo</span>
                      </div>
                      <button
                        onClick={() => inBundle ? removeFromBundle(service.id) : addToBundle(service.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          inBundle
                            ? 'bg-mtn-yellow text-mtn-black'
                            : 'bg-mtn-bg border border-mtn-grey hover:bg-mtn-yellow hover:border-mtn-yellow'
                        }`}
                        aria-label={inBundle ? 'Remove from bundle' : 'Add to bundle'}
                      >
                        {inBundle ? <Check size={14} /> : <Plus size={14} />}
                      </button>
                    </div>

                    {/* Category badge */}
                    <div className="mt-3 pt-3 border-t border-mtn-grey">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        {categories.find(c => c.id === service.category)?.icon} {service.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
