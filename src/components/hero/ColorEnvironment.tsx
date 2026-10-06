import { AnimatePresence, motion } from 'framer-motion';
import type { ProductState } from '../../config/products';

interface Props {
  product: ProductState;
  /** transition counter — newer layers always stack above older ones */
  layer: number;
  transitionMs: number;
  variant: 'panel' | 'outer';
}

const panelBackground = (p: ProductState) =>
  [
    // soft atmospheric light (ambient at ~16% alpha)
    `radial-gradient(55% 45% at 50% 38%, ${p.ambientColor}29 0%, transparent 70%)`,
    // tonal environment: light centre → dominant → dark edges
    `radial-gradient(120% 95% at 50% 45%, ${p.lightColor} 0%, ${p.dominantColor} 55%, ${p.darkColor} 100%)`,
  ].join(', ');

const outerBackground = (p: ProductState) =>
  `radial-gradient(120% 100% at 50% 35%, ${p.outerColor} 0%, ${p.outerColor} 45%, #050505 140%)`;

/**
 * Colour environment that follows the current product.
 * The incoming palette fades in over the outgoing one across the same 500ms
 * window as the product handoff, so both finish together. No flat colours,
 * no hard switch.
 */
export default function ColorEnvironment({ product, layer, transitionMs, variant }: Props) {
  const T = transitionMs / 1000;
  const background = variant === 'panel' ? panelBackground(product) : outerBackground(product);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={product.id}
          className="absolute inset-0"
          style={{ background }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: T, ease: [0.45, 0, 0.25, 1] } }}
          // Outgoing palette stays fully opaque underneath until the new one has covered it.
          exit={{ opacity: 1, transition: { duration: T } }}
        />
      </AnimatePresence>
    </div>
  );
}
