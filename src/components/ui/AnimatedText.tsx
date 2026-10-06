import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

/** Character-by-character opacity reveal driven by scroll (0.2 → 1). */
export default function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {chars.map((c, i) => (
        <Char key={i} progress={scrollYProgress} range={[i / chars.length, (i + 1) / chars.length]}>
          {c}
        </Char>
      ))}
    </p>
  );
}

function Char({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }}>
      {children}
    </motion.span>
  );
}
