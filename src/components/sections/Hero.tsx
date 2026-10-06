import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { BIG_STONE_ASSETS, formatNaira } from '../../config/assets';

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

  // Auto-rotate logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slider.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slider.length]);

  return (
    <motion.section
      className="relative flex h-[100dvh] min-h-[600px] w-full flex-col overflow-hidden"
      animate={{ backgroundColor: current.bgColor }}
      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header / Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 z-50 flex w-full justify-between px-6 pt-6 text-sm uppercase tracking-wider md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
      >
        <a href="#about" className="font-medium text-bone transition-opacity hover:opacity-70">
          About
        </a>
        <a href="#collection" className="font-medium text-bone transition-opacity hover:opacity-70">
          Collections
        </a>
        <a href="#lookbook" className="font-medium text-bone transition-opacity hover:opacity-70">
          Lookbook
        </a>
        <a href="#contact" className="font-medium text-bone transition-opacity hover:opacity-70">
          Contact
        </a>
      </motion.nav>

      {/* Main Content Area */}
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row items-center justify-between px-6 pt-24 pb-12 md:px-16 md:pt-32">
        
        {/* Left Side: Specs & Typography */}
        <div className="flex w-full md:w-5/12 flex-col justify-center order-2 md:order-1 mt-8 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-4"
            >
              <div className="inline-block overflow-hidden">
                <span className="block text-xs md:text-sm uppercase tracking-[0.3em] text-bone/60">
                  New Arrival — {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-bone">
                {current.name}
              </h1>
              
              <div className="mt-2 text-2xl md:text-3xl font-serif italic text-gold">
                {formatNaira(current.price)}
              </div>

              {/* Catchy Outline Panel */}
              <div className="mt-4 md:mt-6 border-l-2 border-gold/30 pl-4 py-1">
                <p className="text-sm md:text-base font-light leading-relaxed text-bone/80 max-w-sm">
                  {current.desc}
                </p>
                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gold"></div>
                    <span className="text-xs uppercase tracking-widest text-bone/60">Premium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-bone/30"></div>
                    <span className="text-xs uppercase tracking-widest text-bone/60">Limited</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10"
          >
            <Button href="#collection">Shop The Collection</Button>
          </motion.div>
        </div>

        {/* Right Side: Hoodie Image with Swipe Animation */}
        <div className="relative flex w-full md:w-7/12 h-[45vh] md:h-full items-center justify-center order-1 md:order-2">
          {/* Subtle Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
            <span className="whitespace-nowrap text-[15vw] md:text-[12vw] font-black uppercase leading-none tracking-tighter text-white">
              STONE BIG
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.9, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, x: isMobile ? 0 : -50, y: isMobile ? -20 : 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 flex h-full w-full items-center justify-center"
            >
              <img
                src={current.src}
                alt={current.name}
                className="h-full max-h-[400px] md:max-h-[85vh] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        {slider.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className={`absolute h-[2px] w-full transition-all duration-300 ${
                activeIndex === i ? 'bg-gold w-8' : 'bg-bone/20 group-hover:bg-bone/40'
              }`}
            />
          </button>
        ))}
      </div>
    </motion.section>
  );
}
