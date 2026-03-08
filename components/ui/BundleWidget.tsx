'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, ShoppingBag, X } from 'lucide-react';
import { bundleItemsCatalog } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';

export default function BundleWidget() {
  const { bundleItems, removeFromBundle, getBundleTotal } = useAppStore();
  const [expanded, setExpanded] = useState(false);

  if (bundleItems.length === 0) {
    return null;
  }

  const total = getBundleTotal();

  return (
    <div className="bundle-widget hidden w-[290px] sm:block">
      <button
        onClick={() => setExpanded((open) => !open)}
        className="flex w-full items-center justify-between gap-3 rounded-[20px] px-3 py-2 text-left text-white transition hover:bg-white/6"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-[#ffcb00]">
            <ShoppingBag size={17} />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#ffcb00] px-1 text-[10px] font-bold text-black">
              {bundleItems.length}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold">Your Bundle</p>
            <p className="text-xs text-white/45">{bundleItems.length} selections ready</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold text-[#ffcb00]">N{total.toLocaleString()}</p>
          <p className="text-[11px] text-white/42">per month</p>
        </div>

        {expanded ? <ChevronDown size={16} className="text-white/45" /> : <ChevronUp size={16} className="text-white/45" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2 border-t border-white/8 px-2 pt-3">
              {bundleItems.map((id) => {
                const device = bundleItemsCatalog[id];
                if (!device) {
                  return null;
                }

                return (
                  <div key={id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/6 px-3 py-2.5 text-white">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{device.name}</p>
                      <p className="text-xs text-white/45">N{device.monthlyPrice.toLocaleString()} / month</p>
                    </div>
                    <button
                      onClick={() => removeFromBundle(id)}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/50 transition hover:bg-white/12 hover:text-red-300"
                      aria-label={`Remove ${device.name}`}
                    >
                      <X size={13} />
                    </button>
                  </div>
                );
              })}
            </div>

            <Link href="/bundles" className="btn-primary mt-3 w-full justify-between rounded-[20px] px-4">
              Review bundle
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

