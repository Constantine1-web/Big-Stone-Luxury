import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { BIG_STONE_ASSETS, formatNaira, type Piece } from '../../config/assets';
import { COLLECTIONS } from '../../config/content';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';

export default function Collections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const total = COLLECTIONS.length;

  return (
    <section
      id="collections"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-4 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-28"
    >
      <FadeIn as="h2" y={40} className="text-hero-gradient text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12.5vw,200px)]">
        Collections
      </FadeIn>

      <div ref={containerRef} className="mx-auto mt-12 max-w-6xl md:mt-20">
        {COLLECTIONS.map((c, i) => (
          <div key={c.name} className="h-[85vh] min-h-[620px]">
            <CollectionCard
              index={i}
              total={total}
              progress={scrollYProgress}
              category={c.category}
              name={c.name}
              images={BIG_STONE_ASSETS.collectionImages[i]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

interface CardProps {
  index: number;
  total: number;
  progress: MotionValue<number>;
  category: string;
  name: string;
  images: Piece[];
}

function CollectionCard({ index, total, progress, category, name, images }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const [a, b, c] = images;
  const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

  return (
    <motion.article
      style={{ scale, top: `calc(var(--stack-top) + ${index * 28}px)` }}
      className={`sticky origin-top border-2 border-bone/25 bg-black p-4 [--stack-top:6rem] sm:p-6 md:p-8 md:[--stack-top:8rem] ${radius}`}
    >
      {/* header */}
      <header className="flex items-center justify-between gap-4 px-2 pb-4 sm:px-3 sm:pb-6">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <span className="text-hero-gradient font-black leading-none tracking-tight text-[clamp(2.75rem,8vw,6rem)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gold sm:text-sm md:text-base">{category}</p>
            <h3 className="mt-1 text-base font-normal text-bone sm:text-xl md:text-2xl">{name}</h3>
          </div>
        </div>
        <Button variant="ghost" href="#contact" aria-label={`View collection: ${name}`} className="hidden sm:inline-flex">
          View Collection
        </Button>
      </header>

      {/* 40 / 60 image grid */}
      <div className="grid grid-cols-[40%_1fr] gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          <Shot piece={a} className={`h-[clamp(130px,16vw,230px)] ${radius}`} />
          <Shot piece={b} className={`h-[clamp(160px,22vw,340px)] ${radius}`} />
        </div>
        <Shot piece={c} className={`h-full ${radius}`} large />
      </div>

      <Button variant="ghost" href="#contact" className="mt-4 w-full sm:hidden">
        View Collection
      </Button>
    </motion.article>
  );
}

function Shot({ piece, className, large = false }: { piece: Piece; className: string; large?: boolean }) {
  return (
    <figure className={`group relative overflow-hidden bg-white/5 ${className}`}>
      <img
        src={piece.src}
        alt={piece.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <figcaption
        className={`absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-black/55 px-3 py-1.5 text-bone backdrop-blur-sm sm:bottom-5 ${large ? 'text-xs sm:text-sm' : 'text-[0.6rem] sm:text-xs'}`}
      >
        <span className="hidden uppercase tracking-wider sm:inline">{piece.name}</span>
        <span className="font-serif italic text-gold">{formatNaira(piece.price)}</span>
      </figcaption>
    </figure>
  );
}
