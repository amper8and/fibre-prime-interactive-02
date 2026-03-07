'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fibrePlans } from '@/lib/data';
import Navigation from '@/components/ui/Navigation';
import NotificationToast from '@/components/ui/NotificationToast';
import { Check, Wifi, Zap, Shield, Phone, MapPin, ArrowRight } from 'lucide-react';

const faqs = [
  { q: 'How long does installation take?', a: 'Installation typically takes 3–5 business days after your order is confirmed. Our engineers will call to schedule a convenient time.' },
  { q: 'Is there a data cap?', a: 'No. All MTN Fibre Prime plans come with unlimited data. Stream, browse and work without worrying about limits.' },
  { q: 'What router is included?', a: 'All plans include a free Wi-Fi 6 router. Premium plans (500 Mbps+) include a Wi-Fi 6E mesh router for whole-home coverage.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect within 24 hours.' },
  { q: 'Is there a contract?', a: 'Plans are available on a month-to-month basis. No long-term contract required.' },
];

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [address, setAddress] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheck = async () => {
    if (!address.trim()) return;
    setChecking(true);
    setAvailable(null);
    await new Promise(r => setTimeout(r, 1500));
    setAvailable(true);
    setChecking(false);
  };

  return (
    <div className="min-h-screen bg-mtn-bg font-mtn">
      <Navigation />
      <NotificationToast />

      {/* Header */}
      <div className="pt-20 bg-gradient-to-r from-mtn-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center">
          <div className="inline-flex items-center gap-2 bg-mtn-yellow/10 border border-mtn-yellow/30 text-mtn-yellow px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Wifi size={14} />
            Fast. Reliable. Unlimited.
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Find Your Perfect <span className="text-mtn-yellow">Fibre Plan</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Blazing-fast fibre internet for Lagos homes. Unlimited data, free installation, and 24/7 support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* Plans grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fibrePlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'ring-3 ring-mtn-yellow shadow-2xl shadow-yellow-500/20 scale-[1.02]'
                    : 'hover:shadow-lg hover:-translate-y-1'
                } ${plan.highlighted ? 'bg-mtn-black text-white' : 'bg-white'}`}
              >
                {plan.highlighted && (
                  <div className="bg-mtn-yellow text-mtn-black text-xs font-bold text-center py-2 uppercase tracking-widest">
                    ⭐ Most Popular
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-bold mb-1" style={{ color: plan.highlighted ? '#FFCB00' : '#000' }}>
                      {plan.speed}
                    </div>
                    <div className={`font-bold text-lg ${plan.highlighted ? 'text-white' : 'text-mtn-black'}`}>
                      {plan.name}
                    </div>
                  </div>

                  <div className="mb-5">
                    <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-mtn-black'}`}>
                      ₦{plan.price.toLocaleString()}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-mtn-yellow flex-shrink-0" />
                        <span className={plan.highlighted ? 'text-gray-300' : 'text-gray-700'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                      selectedPlan === plan.id
                        ? 'bg-mtn-yellow text-mtn-black'
                        : plan.highlighted
                        ? 'bg-white/20 text-white hover:bg-mtn-yellow hover:text-mtn-black'
                        : 'bg-mtn-grey text-mtn-black hover:bg-mtn-yellow'
                    }`}
                  >
                    {selectedPlan === plan.id ? '✓ Selected' : 'Select Plan'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Availability checker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-mtn-black rounded-3xl p-8 sm:p-12 text-center"
        >
          <MapPin size={32} className="text-mtn-yellow mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Check Availability in Your Area
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Enter your Lagos address to check if MTN Fibre Prime is available in your neighbourhood.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Enter your address in Lagos..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              className="flex-1 bg-white/10 text-white placeholder-gray-500 px-5 py-4 rounded-2xl border border-white/20 focus:outline-none focus:border-mtn-yellow/50 transition-colors text-sm"
            />
            <button
              onClick={handleCheck}
              disabled={!address.trim() || checking}
              className="mtn-btn-primary px-8 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {checking ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-mtn-black border-t-transparent rounded-full animate-spin" />
                  Checking...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wifi size={16} />
                  Check Now
                </span>
              )}
            </button>
          </div>

          {available !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-3 rounded-2xl"
            >
              <Check size={18} />
              <span className="font-semibold">Great news! MTN Fibre Prime is available at your address.</span>
            </motion.div>
          )}

          {available && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <button className="mtn-btn-primary text-base px-10 py-4 rounded-2xl">
                Order Now — Get Connected <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Why MTN Fibre */}
        <div>
          <h2 className="text-2xl font-bold text-mtn-black text-center mb-8">Why Choose MTN Fibre?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={24} className="text-mtn-yellow" />, title: 'Lightning Fast', desc: 'Up to 1 Gbps download speeds. Stream 4K, game online, and video call simultaneously.' },
              { icon: <Shield size={24} className="text-mtn-yellow" />, title: '99.9% Uptime', desc: 'SLA-backed reliability with redundant infrastructure across Lagos.' },
              { icon: <Phone size={24} className="text-mtn-yellow" />, title: '24/7 Support', desc: 'Our Nigeria-based support team is available around the clock to help you.' },
            ].map((item) => (
              <div key={item.title} className="mtn-card p-6 text-center">
                <div className="w-12 h-12 bg-mtn-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-mtn-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-mtn-black text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="mtn-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-mtn-black text-sm">{faq.q}</span>
                  <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-600 text-sm leading-relaxed border-t border-mtn-grey pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
