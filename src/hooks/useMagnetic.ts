import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Subtle magnetic follow: element drifts toward the cursor when within `padding` px. */
export function useMagnetic<T extends HTMLElement>(padding = 150, strength = 3) {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX > r.left - padding && e.clientX < r.right + padding &&
        e.clientY > r.top - padding && e.clientY < r.bottom + padding;
      if (inside) {
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) / strength,
          y: (e.clientY - (r.top + r.height / 2)) / strength,
          active: true,
        });
      } else {
        setPos((p) => (p.active ? { x: 0, y: 0, active: false } : p));
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength, reduce]);

  const style: CSSProperties = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    transition: pos.active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
    willChange: 'transform',
  };
  return { ref, style };
}
