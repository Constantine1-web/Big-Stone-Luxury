import { BIG_STONE_ASSETS, type DecorativeAsset } from '../../config/assets';
import AnimatedText from '../ui/AnimatedText';
import FadeIn from '../ui/FadeIn';

const { decorativeImages: d } = BIG_STONE_ASSETS;

const CORNERS: { asset: DecorativeAsset; pos: string; x: number; delay: number }[] = [
  { asset: d.topLeft, pos: 'left-[2%] top-[8%] md:left-[6%] md:top-[12%]', x: -80, delay: 0.1 },
  { asset: d.topRight, pos: 'right-[2%] top-[8%] md:right-[6%] md:top-[12%]', x: 80, delay: 0.15 },
  { asset: d.bottomLeft, pos: 'left-[2%] bottom-[6%] md:left-[8%] md:bottom-[10%]', x: -80, delay: 0.25 },
  { asset: d.bottomRight, pos: 'right-[2%] bottom-[6%] md:right-[8%] md:bottom-[10%]', x: 80, delay: 0.3 },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-32"
    >
      {CORNERS.map(({ asset, pos, x, delay }) => (
        <FadeIn key={asset.src} x={x} delay={delay} duration={0.9} className={`absolute ${pos} z-0 w-[96px] sm:w-[140px] md:w-[190px] lg:w-[230px]`}>
          <img
            src={asset.src}
            alt={asset.alt}
            loading="lazy"
            className="w-full mix-blend-lighten transition-transform duration-700 hover:scale-105"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 45%, transparent 72%)',
              maskImage: 'radial-gradient(circle at 50% 50%, #000 45%, transparent 72%)',
            }}
          />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <FadeIn as="h2" y={40} className="text-hero-gradient whitespace-nowrap font-black uppercase leading-none tracking-tight text-[clamp(3.5rem,13vw,200px)]">
          Our Story
        </FadeIn>

        <div className="mt-10 max-w-[560px] space-y-6 md:mt-14">
          <AnimatedText
            className="text-base font-medium leading-relaxed text-bone sm:text-lg md:text-xl"
            text="Big Stone Luxury is built around confidence, craftsmanship and modern African elegance. We create fashion for people who refuse to disappear into the crowd."
          />
          <AnimatedText
            className="font-serif text-xl italic leading-relaxed text-gold sm:text-2xl"
            text="Every piece is designed to make presence feel effortless."
          />
        </div>
      </div>
    </section>
  );
}
