'use client';
import { motion } from 'framer-motion';

interface DeviceAnimationProps {
  type: string;
  isOn: boolean;
  isAnimating: boolean;
}

export default function DeviceAnimation({ type, isOn, isAnimating }: DeviceAnimationProps) {
  const baseClass = `transition-all duration-500 ${!isOn ? 'opacity-30 grayscale' : ''}`;

  switch (type) {
    case 'tv':
      return (
        <div className={`w-full p-6 flex flex-col items-center ${baseClass}`}>
          <div className={`relative w-48 h-28 bg-gray-900 rounded-xl border-4 border-gray-700 overflow-hidden shadow-lg`}>
            {isOn ? (
              <div className={`absolute inset-0 ${isAnimating ? 'animate-pulse' : ''}`}
                style={{ background: isAnimating ? 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' : 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {isAnimating ? (
                    <div className="text-white text-xs text-center">
                      <div className="text-2xl mb-1">▶</div>
                      <div className="text-mtn-yellow font-bold text-xs">Streaming...</div>
                      <div className="text-gray-400 text-[10px]">Powered by MTN Fibre Prime</div>
                    </div>
                  ) : (
                    <div className="text-gray-600 text-2xl">📺</div>
                  )}
                </div>
                {isAnimating && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mtn-yellow animate-pulse" />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-950 flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              </div>
            )}
          </div>
          <div className="mt-2 w-6 h-4 bg-gray-700 rounded-sm mx-auto" />
          <div className="mt-1 w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
      );

    case 'vacuum':
      return (
        <div className={`w-full p-6 relative overflow-hidden min-h-[140px] ${baseClass}`}>
          <div className="absolute inset-4 border-2 border-dashed border-gray-200 rounded-xl" />
          {isOn && (
            <motion.div
              animate={isAnimating ? {
                x: [0, 80, 80, 0, 0],
                y: [0, 0, 40, 40, 0],
              } : { x: 0, y: 0 }}
              transition={{ duration: 4, repeat: isAnimating ? Infinity : 0, ease: 'linear' }}
              className="absolute left-8 top-8"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-600">
                <span className="text-lg">🤖</span>
              </div>
              {isAnimating && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-mtn-yellow/50 rounded-full blur-sm" />
              )}
            </motion.div>
          )}
          {isAnimating && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-mtn-yellow font-bold animate-pulse">
              Cleaning in progress...
            </div>
          )}
        </div>
      );

    case 'lights':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <div className={`relative transition-all duration-1000 ${isOn ? 'opacity-100' : 'opacity-20'}`}>
            <motion.div
              animate={isOn ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: isOn
                  ? isAnimating
                    ? 'radial-gradient(circle, #FF8C00, #FFCB00)'
                    : 'radial-gradient(circle, #FFCB00, #FFF3B0)'
                  : 'radial-gradient(circle, #999, #ccc)',
                boxShadow: isOn ? `0 0 40px ${isAnimating ? 'rgba(255,100,0,0.5)' : 'rgba(255,203,0,0.5)'}` : 'none',
              }}
            >
              <span className="text-3xl">💡</span>
            </motion.div>
          </div>
          {isAnimating && (
            <p className="mt-3 text-xs text-amber-600 font-semibold animate-pulse">Sleep Mode — Dimming to amber...</p>
          )}
        </div>
      );

    case 'curtains':
      return (
        <div className={`w-full p-4 relative min-h-[140px] flex flex-col items-center justify-center ${baseClass}`}>
          <div className="relative w-48 h-28 bg-sky-100 rounded-xl overflow-hidden border border-sky-200">
            {/* Window frame */}
            <div className="absolute inset-0 border-4 border-amber-700/30 rounded-xl z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100" />
            {/* Left curtain */}
            <motion.div
              animate={isAnimating ? { width: '48%' } : { width: isOn ? '10%' : '48%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute left-0 top-0 h-full bg-amber-800/70 origin-left z-20"
              style={{ width: isOn ? '10%' : '48%' }}
            />
            {/* Right curtain */}
            <motion.div
              animate={isAnimating ? { width: '48%' } : { width: isOn ? '10%' : '48%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute right-0 top-0 h-full bg-amber-800/70 origin-right z-20"
              style={{ width: isOn ? '10%' : '48%' }}
            />
          </div>
          {isAnimating && (
            <p className="mt-3 text-xs text-amber-700 font-semibold">Curtains closing...</p>
          )}
        </div>
      );

    case 'thermostat':
      return (
        <div className={`w-full p-6 flex flex-col items-center ${baseClass}`}>
          <div className="w-24 h-24 rounded-full border-4 border-mtn-yellow bg-white shadow-lg flex flex-col items-center justify-center relative">
            <motion.span
              animate={isAnimating ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: isAnimating ? Infinity : 0 }}
              className="text-2xl font-bold text-mtn-black"
            >
              {isAnimating ? '22°' : '26°'}
            </motion.span>
            <span className="text-xs text-gray-500">Celsius</span>
          </div>
          {isAnimating && (
            <p className="mt-3 text-xs text-blue-600 font-semibold">Adjusting to sleep temperature...</p>
          )}
        </div>
      );

    case 'speaker':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <div className="relative w-16 h-20 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🔊</span>
            {isOn && isAnimating && (
              <>
                <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-mtn-yellow rounded-2xl" />
                <motion.div animate={{ scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="absolute inset-0 border-2 border-mtn-yellow rounded-2xl" />
              </>
            )}
          </div>
          {isAnimating && (
            <p className="mt-3 text-xs text-mtn-black font-semibold">"Call the kids for dinner" 📢</p>
          )}
        </div>
      );

    case 'gaming':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <div className="relative">
            <span className="text-6xl">🎮</span>
            {isOn && isAnimating && (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2 w-6 h-6 border-2 border-mtn-yellow border-t-transparent rounded-full" />
            )}
          </div>
          {isAnimating && (
            <div className="mt-3 text-center">
              <p className="text-xs text-green-600 font-bold">Connecting to multiplayer...</p>
              <p className="text-[10px] text-gray-500">Ping: &lt;5ms — Powered by MTN Fibre</p>
            </div>
          )}
        </div>
      );

    case 'fridge':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <div className="w-20 h-28 bg-gray-200 rounded-xl border-2 border-gray-300 flex flex-col overflow-hidden shadow-lg">
            <div className="flex-1 bg-white/70 m-1 rounded-lg flex items-center justify-center">
              {isAnimating ? <span className="text-xl animate-bounce">📋</span> : <span className="text-xl">🧊</span>}
            </div>
            <div className="h-px bg-gray-300" />
            <div className="flex-1 bg-white/40 m-1 rounded-lg flex items-center justify-center">
              {isAnimating ? <span className="text-sm animate-pulse">🥕🥦🍎</span> : <span className="text-sm">❄️</span>}
            </div>
          </div>
          {isAnimating && (
            <p className="mt-3 text-xs text-green-600 font-semibold">Checking inventory...</p>
          )}
        </div>
      );

    case 'solar':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <motion.div
            animate={isOn ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-6xl">☀️</span>
          </motion.div>
          {isOn && (
            <div className="mt-3 text-center">
              <p className="text-xs font-bold text-amber-600">
                {isAnimating ? '⚡ Generating 4.2 kW...' : '✅ 3.8 kW avg today'}
              </p>
              <p className="text-[10px] text-gray-500">Saving ₦2,400 this month</p>
            </div>
          )}
        </div>
      );

    case 'ev':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <div className="relative">
            <span className="text-5xl">🔋</span>
            {isOn && isAnimating && (
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute -top-1 -right-1 text-xl">⚡</motion.div>
            )}
          </div>
          <div className="mt-3 w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              animate={isAnimating ? { width: '85%' } : { width: '60%' }}
              transition={{ duration: 2 }}
              className="h-full bg-mtn-yellow rounded-full"
            />
          </div>
          {isAnimating && <p className="mt-2 text-xs text-green-600 font-semibold">Charging... 60% → 85%</p>}
        </div>
      );

    case 'wifi':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <div className="relative flex items-center justify-center w-20 h-20">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={isOn ? { scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="absolute border-2 border-mtn-yellow rounded-full"
                style={{ width: `${i * 25}px`, height: `${i * 25}px` }}
              />
            ))}
            <span className="text-2xl relative z-10">📶</span>
          </div>
          {isAnimating && (
            <div className="mt-3 text-center">
              <p className="text-xs font-bold text-mtn-black">↓ 485 Mbps  ↑ 195 Mbps</p>
              <p className="text-[10px] text-gray-500">MTN Fibre Prime — Ultra Plan</p>
            </div>
          )}
        </div>
      );

    case 'camera':
      return (
        <div className={`w-full p-6 flex flex-col items-center justify-center min-h-[140px] ${baseClass}`}>
          <div className="relative w-32 h-20 bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
            {isOn ? (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {isAnimating ? (
                  <div className="text-center">
                    <span className="text-2xl">👶</span>
                    <div className="absolute bottom-1 right-1 flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[8px] text-white">LIVE</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-600 text-sm">📹</span>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-950" />
            )}
          </div>
          {isAnimating && <p className="mt-3 text-xs text-green-600 font-semibold">Live feed — All clear 🟢</p>}
        </div>
      );

    default:
      return (
        <div className="w-full h-32 flex items-center justify-center text-gray-400">
          <span className="text-5xl">📱</span>
        </div>
      );
  }
}
