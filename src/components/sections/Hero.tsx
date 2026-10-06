import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { BIG_STONE_ASSETS, formatNaira } from '../../config/assets';

const TRANSITION_DURATION = 0.45;
const HOLD_DURATION = 1300; // 850ms hold + 450ms transition
const EASE_CURVE = [0.22, 0.75, 0.20, 1];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slider = BIG_STONE_ASSETS.heroSlider;
  const current = slider[activeIndex];
  const nextItem = slider[(activeIndex + 1) % slider.length];

  // Auto-rotate logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slider.length);
    }, HOLD_DURATION);
    return () => clearInterval(interval);
  }, [slider.length]);

  return (
    <motion.section
      className="relative flex h-[100dvh] min-h-[600px] w-full flex-col overflow-hidden"
      animate={{ backgroundColor: current.colors.outer }}
      transition={{ duration: TRANSITION_DURATION, ease: EASE_CURVE }}
    >
      {/* Inner Hero Panel - Radial Gradient */}
      <motion.div
        className="absolute inset-2 md:inset-6 rounded-3xl z-0"
        animate={{
          background: `radial-gradient(circle at 50% 45%, ${current.colors.light}, ${current.colors.primary} 55%, ${current.colors.dark} 100%)`
        }}
        transition={{ duration: TRANSITION_DURATION, ease: EASE_CURVE }}
      />

      {/* Header / Nav */}
      <nav className="absolute top-0 z-50 flex w-full justify-between px-8 pt-8 text-sm uppercase tracking-wider md:px-12 md:pt-12 md:text-lg lg:text-[1.4rem]">
        <a href="#about" className="font-medium text-bone transition-opacity hover:opacity-70">About</a>
        <a href="#collection" className="font-medium text-bone transition-opacity hover:opacity-70">Collections</a>
        <a href="#lookbook" className="font-medium text-bone transition-opacity hover:opacity-70">Lookbook</a>
        <a href="#contact" className="font-medium text-bone transition-opacity hover:opacity-70">Contact</a>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row items-center justify-between px-8 pt-24 pb-12 md:px-16 md:pt-32">
        
        {/* Left Side: Specs & Typography */}
        <div className="flex w-full md:w-5/12 flex-col justify-center order-2 md:order-1 mt-8 md:mt-0 relative h-[300px] md:h-[400px]">
          <AnimatePresence mode="sync">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: TRANSITION_DURATION, ease: EASE_CURVE }}
              className="absolute top-0 left-0 flex flex-col gap-4 pointer-events-none w-full"
            >
              <div className="inline-block overflow-hidden">
                <span className="block text-xs md:text-sm uppercase tracking-[0.3em] text-bone/60">
                  New Arrival — {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-bone">
                {current.name}
              </h1>
              
              <div className="mt-2 text-2xl md:text-3xl font-serif italic text-white/80">
                {formatNaira(current.price)}
              </div>

              {/* Catchy Outline Panel */}
              <div className="mt-4 md:mt-6 border-l-2 border-white/20 pl-4 py-1">
                <p className="text-sm md:text-base font-light leading-relaxed text-bone/80 max-w-sm">
                  {current.desc}
                </p>
                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-white/70"></div>
                    <span className="text-xs uppercase tracking-widest text-bone/60">Premium</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute md:relative bottom-0 left-0 md:mt-10 z-20">
            <Button href="#collection">Shop The Collection</Button>
          </div>
        </div>

        {/* Right Side: Product Stack */}
        <div className="relative flex w-full md:w-7/12 h-[45vh] md:h-full items-center justify-center order-1 md:order-2">
          {/* Subtle Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
            <span className="whitespace-nowrap text-[15vw] md:text-[12vw] font-black uppercase leading-none tracking-tighter text-white">
              STONE BIG
            </span>
          </div>

          {/* Product Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <AnimatePresence mode="sync">
              <motion.img
                key={current.id}
                src={current.src}
                alt={current.name}
                className="absolute h-full max-h-[400px] md:max-h-[75vh] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, scale: 0.96, y: 55, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, y: -55, filter: 'blur(3px)' }}
                transition={{ duration: TRANSITION_DURATION, ease: EASE_CURVE }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Next Item Thumbnail Preview */}
      <div 
        className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-30 flex cursor-pointer flex-col items-end gap-2"
        onClick={() => setActiveIndex((activeIndex + 1) % slider.length)}
      >
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-bone/50">Next</span>
        <div className="relative flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.img
              key={nextItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: TRANSITION_DURATION, ease: EASE_CURVE }}
              src={nextItem.src}
              className="absolute h-[80%] w-[80%] object-contain drop-shadow-lg"
              alt="Next item"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Color Selector */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 flex -translate-x-1/2 gap-3 z-20 items-center">
        {slider.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative flex items-center justify-center w-6 h-6"
          >
            <motion.div
              className={`rounded-full transition-colors duration-300 ${
                activeIndex === i ? 'bg-white h-2 w-2' : 'bg-white/30 h-1.5 w-1.5'
              }`}
            />
            {activeIndex === i && (
              <motion.div
                layoutId="active-ring"
                className="absolute inset-0 rounded-full border border-white/40"
                transition={{ duration: TRANSITION_DURATION, ease: EASE_CURVE }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.section>
  );
}
