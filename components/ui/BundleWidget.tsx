'use client';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { devices } from '@/lib/data';
import { ShoppingCart, ChevronUp, ChevronDown, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function BundleWidget() {
  const { bundleItems, removeFromBundle, getBundleTotal } = useAppStore();
  const [expanded, setExpanded] = useState(false);

  if (bundleItems.length === 0) return null;

  const total = getBundleTotal();

  return (
    <div className="bundle-widget">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3
                   hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <ShoppingCart size={16} className="text-fp-yellow" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-fp-yellow
                             text-black text-[9px] font-bold rounded-full
                             flex items-center justify-center">
              {bundleItems.length}
            </span>
          </div>
          <span className="text-white font-bold text-sm">My Bundle</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-fp-yellow font-bold text-sm">
            ₦{total.toLocaleString()}/mo
          </span>
          {expanded ? <ChevronDown size={14} className="text-white/40" /> : <ChevronUp size={14} className="text-white/40" />}
        </div>
      </button>

      {/* Expanded items */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-4 py-3 space-y-2 max-h-52 overflow-y-auto">
              {bundleItems.map((id) => {
                const d = devices[id];
                if (!d) return null;
                return (
                  <div key={id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0">{d.icon}</span>
                      <span className="text-white/80 text-xs font-medium truncate">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-white/50 text-xs">₦{d.monthlyPrice.toLocaleString()}</span>
                      <button
                        onClick={() => removeFromBundle(id)}
                        className="text-white/30 hover:text-red-400 transition-colors"
                        aria-label="Remove"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-4 pb-3">
              <Link
                href="/bundles"
                className="flex items-center justify-between w-full
                           bg-fp-yellow text-black text-xs font-bold
                           px-4 py-2.5 rounded-lg hover:bg-yellow-300
                           transition-colors"
              >
                Review Bundle
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
