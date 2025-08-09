import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Enlarged vertical shuffle stack with:
 *  - Progress dots
 *  - Pause on hover
 *  - Wheel & click navigation
 *  - Swipe (touch / pointer) navigation
 *  - Gradient accent for top card
 */
export default function RecommendationStack({ items = [], interval = 4000, visible = 4 }) {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const wheelThrottleRef = useRef(0);
  const pointerStartRef = useRef(null);

  const forward = useCallback(() => {
    setOrder(prev => {
      if (!prev.length) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }, []);

  const backward = useCallback(() => {
    setOrder(prev => {
      if (!prev.length) return prev;
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, prev.length - 1)];
    });
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused) return; // don't run timer while paused
    timerRef.current = setInterval(forward, interval);
    return () => clearInterval(timerRef.current);
  }, [forward, interval, paused]);

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    if (now - wheelThrottleRef.current < 300) return;
    wheelThrottleRef.current = now;
    if (e.deltaY > 0) forward(); else if (e.deltaY < 0) backward();
  };

  // Pointer / touch swipe handlers
  const onPointerDown = (e) => {
    pointerStartRef.current = { y: e.clientY ?? e.touches?.[0]?.clientY, time: Date.now() };
  };
  const onPointerUp = (e) => {
    if (!pointerStartRef.current) return;
    const endY = e.clientY ?? e.changedTouches?.[0]?.clientY;
    const dy = endY - pointerStartRef.current.y;
    const dt = Date.now() - pointerStartRef.current.time;
    const threshold = 40; // px
    const maxTime = 800; // ms
    if (Math.abs(dy) > threshold && dt < maxTime) {
      if (dy < 0) forward(); else backward();
    }
    pointerStartRef.current = null;
  };

  const displayed = order.slice(0, visible);

  const currentIndex = order[0];
  const total = items.length;

  return (
    <div
      onWheel={handleWheel}
      onWheelCapture={handleWheel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchEnd={onPointerUp}
      onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
      className="relative h-[560px] w-full max-w-md mx-auto select-none flex items-start justify-center overflow-hidden overscroll-contain"
      style={{ touchAction: 'none' }}
      aria-roledescription="Recommendation carousel"
    >
      <AnimatePresence initial={false}>
        {displayed.map((idx, position) => {
          const rec = items[idx];
          const isTop = position === 0;
          const depth = displayed.length - position - 1;
          return (
            <motion.div
              key={rec.name + idx}
              layout
              initial={{ opacity: 0, y: 55, scale: 0.9 }}
              animate={{ opacity: 1, y: position * 56, scale: 1 - position * 0.04 }}
              exit={{ opacity: 0, y: -70, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 250, damping: 30 }}
              style={{ zIndex: 100 + depth }}
              className="absolute left-1/2 -translate-x-1/2 origin-top cursor-pointer w-full"
              onClick={isTop ? forward : undefined}
              aria-hidden={!isTop}
            >
              <motion.div
                whileHover={isTop ? { y: -8 } : {}}
                whileTap={isTop ? { scale: 0.97 } : {}}
                className={`group rounded-3xl border ${isTop ? 'border-transparent bg-slate-950/70' : 'border-white/5 bg-slate-900/55'} backdrop-blur-xl px-8 py-7 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_70px_-12px_rgba(0,0,0,0.75)] transition-shadow relative overflow-hidden ${!isTop ? 'hover:bg-slate-900/65' : ''}`}
              >
                {isTop && (
                  <div className="pointer-events-none absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400">
                    <div className="w-full h-full rounded-[1.3rem] bg-slate-950/80 backdrop-blur-xl" />
                  </div>
                )}
                <div className="relative">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <img src={rec.image} alt={rec.name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/20 shadow-lg" />
                      <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-fuchsia-400 to-amber-300 ring-2 ring-slate-900" />
                    </div>
                    <div>
                      <div className="font-semibold tracking-tight text-white text-xl leading-tight">{rec.name}</div>
                      <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">{rec.title}</div>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-white/85 font-light">“{rec.text}”</p>
                  {isTop && (
                    <div className="mt-6 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={backward}
                        className="text-[11px] tracking-wide uppercase font-semibold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-white/70 hover:text-white transition"
                      >Prev</button>
                      <div className="flex gap-2" aria-label="Progress indicators">
                        {items.map((_, i) => (
                          <span
                            key={i}
                            className={`h-2 w-2 rounded-full transition ${i === currentIndex ? 'bg-gradient-to-r from-fuchsia-400 to-amber-300 shadow-[0_0_0_2px_rgba(255,255,255,0.35)]' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={forward}
                        className="text-[11px] tracking-wide uppercase font-semibold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-white/70 hover:text-white transition"
                      >Next</button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="absolute -bottom-7 w-full text-center text-[10px] tracking-wide text-white/35 uppercase">Scroll / Swipe / Tap</div>
      <div className="sr-only" aria-live="polite">Showing recommendation {currentIndex + 1} of {total}</div>
    </div>
  );
}
