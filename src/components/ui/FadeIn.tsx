import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.25, 0.1, 0.25, 1] as const;

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
  as?: 'div' | 'li' | 'nav' | 'p' | 'h1' | 'h2';
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 0,
  immediate = false,
  as = 'div',
  ...rest
}: FadeInProps) {
  const Comp = motion[as] as typeof motion.div;
  const target = { opacity: 1, x: 0, y: 0 };
  return (
    <Comp
      initial={{ opacity: 0, x, y }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
