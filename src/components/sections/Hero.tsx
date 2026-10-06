import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import Button from '../ui/Button';
import { formatNaira } from '../../config/assets';
import { HERO_PRODUCTS, INK } from '../../config/products';
import { NAV_LINKS } from '../../config/content';
import ProductStage, { HERO_EASE } from '../hero/ProductStage';
import ColorEnvironment from '../hero/ColorEnvironment';
import { useProductCycle } from '../hero/useProductCycle';

/* ---- Timing: Slower hold and transition for better readability ---- */
const HOLD_MS = 3500;
const TRANSITION_MS = 750;
const T = TRANSITION_MS / 1000;

/** Product-specific text swap: fade + 4px shift inside a fixed box (no layout shift). */
function Swap({ k, children, className = '' }: { k: string; children: ReactNode; className?: string }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={k}
        className={`absolute inset-0 ${className}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.1, ease: HERO_EASE } }}
        exit={{ opacity: 0, y: -4, transition: { duration: 0.2, ease: HERO_EASE } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { current, upcoming, index, direction, count, goTo, next } = useProductCycle(HERO_PRODUCTS, {
    holdMs: HOLD_MS,
    transitionMs: TRANSITION_MS,
  });

  return (
    <section id="top" className="relative min-h-[100dvh] p-2 sm:p-3 md:h-[100dvh] md:min-h-[660px] md:p-4 lg:p-5">
      {/* LEVEL 2 — outer page atmosphere (subtle) */}
      <ColorEnvironment product={current} layer={count} transitionMs={TRANSITION_MS} variant="outer" />

      {/* LEVEL 1 — stationary hero panel (the stage). Never moves; only its colours change. */}
      <motion.div
        className="relative flex min-h-[calc(100dvh-16px)] flex-col overflow-hidden rounded-[22px] md:h-full md:min-h-0 md:rounded-[32px]"
        initial={false}
        animate={{ color: INK[current.ink] }}
        transition={{ duration: T, ease: HERO_EASE }}
      >
        <ColorEnvironment product={current} layer={count} transitionMs={TRANSITION_MS} variant="panel" />

        <div className="relative z-[100] flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-8 md:min-h-0 md:px-10 md:pb-8 md:pt-7 lg:px-14">
          {/* BRAND + NAV */}
          <header className="flex items-center justify-between">
            <a href="#top" className="flex items-center" aria-label="Big Stone Luxury">
              <div 
                className="h-10 w-32 bg-current md:h-12 md:w-36 lg:h-14 lg:w-44"
                style={{
                  WebkitMaskImage: 'url(/images/big-stone/logo.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: 'url(/images/big-stone/logo.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                }}
              />
            </a>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex justify-end gap-8 text-sm font-medium uppercase tracking-wider lg:gap-10 lg:text-base">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="transition-opacity duration-200 hover:opacity-70">
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Mobile Nav Toggle */}
            <button 
              className="p-2 -mr-2 md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </header>

          {/* Mobile Nav Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="fixed inset-0 z-[200] flex flex-col bg-ink p-5 text-bone sm:p-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="h-10 w-32 bg-current"
                    style={{
                      WebkitMaskImage: 'url(/images/big-stone/logo.png)',
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'left center',
                      maskImage: 'url(/images/big-stone/logo.png)',
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'left center',
                    }}
                  />
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
                    <X size={24} />
                  </button>
                </div>
                <nav className="mt-16 flex flex-col gap-8 text-2xl font-bold uppercase tracking-widest">
                  {NAV_LINKS.map((l) => (
                    <a 
                      key={l.href} 
                      href={l.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="transition-opacity duration-200 hover:opacity-70"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hero-grid mt-6 flex-1 md:mt-8 md:min-h-0">
            {/* LEFT — protected copy zone (static) */}
            <div className="hero-copy flex flex-col justify-center">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] opacity-60 md:text-xs">
                Uyo · Collection 01
              </p>
              <h1 className="mt-3 max-w-[300px] font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,11vw,3.4rem)] md:mt-4 md:text-[clamp(1.9rem,3.6vw,3.6rem)]">
                Wear the
                <br />
                moment
              </h1>
              <p className="mt-4 hidden max-w-[300px] text-sm font-light leading-relaxed opacity-75 md:block lg:text-[0.95rem]">
                Luxury fashion crafted in Uyo for those who know exactly who they are.
              </p>
            </div>

            {/* CENTRE — the only zone the product may move in. overflow-hidden clips it. */}
            <div className="hero-stage relative h-[clamp(200px,36vh,420px)] md:h-auto">
              <ProductStage
                productKey={current.id}
                image={current.image}
                alt={current.name}
                direction={direction}
                transitionMs={TRANSITION_MS}
              />
            </div>

            {/* RIGHT — protected product info zone */}
            <div className="hero-info flex min-w-0 flex-col justify-center md:max-w-[260px] md:justify-self-end md:w-full">
              <div className="relative h-[104px] md:h-[300px]">
                <Swap k={current.id}>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] opacity-60 md:text-xs">
                    {current.category} · {String(index + 1).padStart(2, '0')}/{String(HERO_PRODUCTS.length).padStart(2, '0')}
                  </p>
                  <p className="mt-2 line-clamp-1 text-base font-semibold uppercase tracking-wide md:line-clamp-2 md:text-lg">
                    {current.name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-3 md:mt-4 md:flex-col md:gap-1">
                    <span className="whitespace-nowrap text-2xl font-black tracking-tight md:text-[clamp(1.6rem,2.4vw,2.2rem)]">
                      {formatNaira(current.price)}
                    </span>
                    <span className="whitespace-nowrap text-sm line-through opacity-50">
                      {formatNaira(current.originalPrice)}
                    </span>
                  </div>
                  <div className="mt-5 hidden md:block">
                    <div className="h-px w-full bg-current opacity-20" />
                    <p className="mt-4 line-clamp-3 text-sm font-light leading-relaxed opacity-75">{current.description}</p>
                    <ul className="mt-3 space-y-1 text-[0.7rem] uppercase tracking-widest opacity-60">
                      {current.details.map((d) => (
                        <li key={d}>— {d}</li>
                      ))}
                    </ul>
                  </div>
                </Swap>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-cta flex items-end">
              <Button href="#collections">Shop the collection</Button>
            </div>

            {/* CONTROLS — colour selectors + next-product preview (fixed position) */}
            <div className="hero-controls flex items-end justify-between gap-6 md:flex-col md:items-end md:justify-end md:gap-5">
              <div className="flex items-center gap-3" role="tablist" aria-label="Choose product">
                {HERO_PRODUCTS.map((p, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={p.id}
                      role="tab"
                      aria-selected={active}
                      aria-label={p.name}
                      onClick={() => goTo(i)}
                      className="relative flex h-7 w-7 items-center justify-center"
                    >
                      <motion.span
                        className="absolute inset-0 rounded-full border border-current"
                        initial={false}
                        animate={{ opacity: active ? 0.9 : 0, scale: active ? 1 : 0.7 }}
                        transition={{ duration: 0.25, ease: HERO_EASE }}
                      />
                      <motion.span
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: p.dominantColor, boxShadow: 'inset 0 0 0 1px rgba(128,128,128,0.55)' }}
                        initial={false}
                        animate={{ scale: active ? 1.1 : 0.8, opacity: active ? 1 : 0.65 }}
                        transition={{ duration: 0.25, ease: HERO_EASE }}
                      />
                    </button>
                  );
                })}
              </div>

              <button onClick={next} className="group flex shrink-0 flex-col items-end gap-2" aria-label={`Next: ${upcoming.name}`}>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] opacity-60">Next</span>
                <span className="relative block h-20 w-20 overflow-hidden rounded-2xl md:h-24 md:w-24">
                  <span className="absolute inset-0 rounded-2xl border border-current opacity-20" />
                  <span className="absolute inset-0 bg-current opacity-[0.06] transition-opacity duration-200 group-hover:opacity-[0.12]" />
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={upcoming.id}
                      src={upcoming.image}
                      alt=""
                      draggable={false}
                      className="absolute left-[12%] top-[12%] h-[76%] w-[76%] object-contain"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: HERO_EASE } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    />
                  </AnimatePresence>
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
