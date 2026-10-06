import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { Direction } from './useProductCycle';

export const HERO_EASE: [number, number, number, number] = [0.22, 0.75, 0.2, 1];

interface StageProps {
  productKey: string;
  image: string;
  alt: string;
  direction: Direction;
  transitionMs: number;
}

interface Custom {
  direction: Direction;
  tx: number;
  ty: number;
}

/** Travel distance: 20/50px desktop, 12/28px mobile (spec §36). */
function useTravel() {
  const get = () => (typeof window !== 'undefined' && window.innerWidth < 768 ? { tx: 12, ty: 28 } : { tx: 20, ty: 50 });
  const [travel, setTravel] = useState(get);
  useEffect(() => {
    const onResize = () => setTravel(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return travel;
}

/**
 * Fixed, clipped product stage. Two absolutely-positioned layers exist during
 * a transition (outgoing + incoming); the stage itself never moves.
 */
export default function ProductStage({ productKey, image, alt, direction, transitionMs }: StageProps) {
  const { tx, ty } = useTravel();
  const T = transitionMs / 1000;

  const variants = useMemo<Variants>(
    () => ({
      // Incoming starts on the opposite side of the outgoing exit.
      enter: ({ direction: d, tx: x, ty: y }: Custom) => ({
        x: d === 'A' ? x : -x,
        y: d === 'A' ? y : -y,
        scale: 0.96,
        opacity: 0,
        filter: 'blur(4px)',
      }),
      center: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: [0, 0.1, 0.3, 0.65, 0.9, 1],
        filter: 'blur(0px)',
        transition: {
          delay: T * 0.1, // ≈50ms after the outgoing starts
          duration: T * 0.9, // settles exactly at ≈500ms
          ease: HERO_EASE,
          opacity: { delay: T * 0.1, duration: T * 0.9, ease: 'linear', times: [0, 0.15, 0.35, 0.6, 0.8, 1] },
        },
      },
      // A: centre → up-left.  B: centre → down-right.
      exit: ({ direction: d, tx: x, ty: y }: Custom) => ({
        x: d === 'A' ? -x : x,
        y: d === 'A' ? -y : y,
        scale: 0.97,
        opacity: [1, 0.85, 0.55, 0.2, 0],
        filter: 'blur(3px)',
        transition: {
          duration: T * 0.9,
          ease: HERO_EASE,
          opacity: { duration: T * 0.9, ease: 'linear', times: [0, 0.2, 0.45, 0.7, 1] },
        },
      }),
    }),
    [T],
  );

  const custom: Custom = { direction, tx, ty };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Barely-perceptible idle float (3px over 4s). Wraps both layers so it never fights the handoff. */}
      <motion.div
        className="absolute inset-0 drop-shadow-[0_28px_36px_rgba(0,0,0,0.35)]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      >
        <AnimatePresence initial={false} custom={custom}>
          <motion.img
            key={productKey}
            src={image}
            alt={alt}
            draggable={false}
            custom={custom}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute left-[6%] top-[6%] h-[88%] w-[88%] select-none object-contain will-change-transform"
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
