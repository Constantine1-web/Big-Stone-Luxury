import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BIG_STONE_ASSETS, formatNaira, type Piece } from '../../config/assets';

const imgs = BIG_STONE_ASSETS.lookbookImages;
const half = Math.ceil(imgs.length / 2);
const ROW_A = imgs.slice(0, half);
const ROW_B = imgs.slice(half);

export default function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sec = sectionRef.current;
      if (!sec || !rowA.current || !rowB.current) return;
      const sectionTop = sec.getBoundingClientRect().top + window.scrollY;
      const offset = reduce ? 0 : (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      // width of ONE set (tracks hold the set 3×)
      const setA = rowA.current.scrollWidth / 3;
      const setB = rowB.current.scrollWidth / 3;
      const a = ((offset % setA) + setA) % setA;
      const b = ((offset % setB) + setB) % setB;
      rowA.current.style.transform = `translate3d(${-setA + a}px,0,0)`; // drifts RIGHT
      rowB.current.style.transform = `translate3d(${-setB - b + setB / 2}px,0,0)`; // drifts LEFT
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <section id="lookbook" ref={sectionRef} className="relative overflow-hidden bg-ink py-6 md:py-10" aria-label="Lookbook">
      <h2 className="sr-only">Lookbook</h2>
      <div className="flex flex-col gap-3">
        <Row trackRef={rowA} items={ROW_A} />
        <Row trackRef={rowB} items={ROW_B} />
      </div>
    </section>
  );
}

function Row({ trackRef, items }: { trackRef: React.RefObject<HTMLDivElement>; items: Piece[] }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div ref={trackRef} className="flex w-max gap-3" style={{ willChange: 'transform' }}>
      {tripled.map((p, i) => (
        <figure
          key={i}
          className="group relative aspect-[420/270] w-[260px] shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:w-[340px] md:w-[420px]"
          aria-hidden={i >= items.length ? true : undefined}
        >
          <img
            src={p.src}
            alt={i < items.length ? p.alt : ''}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent p-4 pt-10 text-bone">
            <span className="text-xs font-medium uppercase tracking-wider sm:text-sm">{p.name}</span>
            <span className="font-serif text-sm italic text-gold sm:text-base">{formatNaira(p.price)}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
