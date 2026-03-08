'use client';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { devices } from '@/lib/data';
import { ShoppingBag, ChevronUp, ChevronDown, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function BundleWidget() {
  const { bundleItems, removeFromBundle, getBundleTotal } = useAppStore();
  const [expanded, setExpanded] = useState(false);

  if (bundleItems.length === 0) return null;

  const total = getBundleTotal();

  return (
    <div
      className="fixed bottom-6 right-6 z-40 rounded-2xl overflow-hidden
                 border border-white/8"
      style={{
        background: '#111111',
        boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
        minWidth: '260px',
      }}
    >
      {/* Toggle header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3.5
                   hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <ShoppingBag size={16} className="text-[#FFCB00]" />
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4
                         bg-[#FFCB00] text-black text-[9px] font-bold
                         rounded-full flex items-center justify-center"
            >
              {bundleItems.length}
            </span>
          </div>
          <span className="text-white font-bold text-sm">My Bundle</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#FFCB00] font-bold text-sm">
            ₦{total.toLocaleString()}/mo
          </span>
          {expanded
            ? <ChevronDown size={14} className="text-white/30" />
            : <ChevronUp   size={14} className="text-white/30" />
          }
        </div>
      </button>

      {/* Expanded list */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/8 px-4 py-3 space-y-2 max-h-52 overflow-y-auto scrollbar-hide">
              {bundleItems.map((id) => {
                const d = devices[id];
                if (!d) return null;
                return (
                  <div key={id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[16px] shrink-0">{d.icon}</span>
                      <span className="text-white/75 text-xs font-medium truncate">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-white/40 text-[11px]">₦{d.monthlyPrice.toLocaleString()}</span>
                      <button
                        onClick={() => removeFromBundle(id)}
                        className="text-white/25 hover:text-red-400 transition-colors"
                        aria-label={`Remove ${d.name}`}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-4 pb-4">
              <Link
                href="/bundles"
                className="flex items-center justify-between w-full
                           bg-[#FFCB00] text-black text-xs font-bold
                           px-4 py-2.5 rounded-xl hover:bg-yellow-300
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
