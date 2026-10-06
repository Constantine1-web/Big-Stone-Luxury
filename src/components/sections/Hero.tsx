import { BIG_STONE_ASSETS } from '../../config/assets';
import { NAV_LINKS } from '../../config/content';
import { useMagnetic } from '../../hooks/useMagnetic';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';

export default function Hero() {
  const { ref, style } = useMagnetic<HTMLDivElement>(150, 3);
  const { heroImage } = BIG_STONE_ASSETS;

  return (
    <section className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-ink" aria-label="Big Stone Luxury">
      {/* NAV */}
      <FadeIn as="nav" immediate y={-20} delay={0} className="relative z-30 px-6 pt-6 md:px-10 md:pt-8" aria-label="Primary">
        <ul className="flex items-center justify-between">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium uppercase tracking-wider text-bone transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* GIANT HEADLINE (sits behind the model) */}
      <div className="relative z-0 mt-3 w-full overflow-hidden md:mt-4">
        <FadeIn
          as="h1"
          immediate
          y={40}
          delay={0.15}
          className="text-hero-gradient -mx-[1.5vw] w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight text-[12vw] sm:text-[12.3vw] md:text-[12.6vw] lg:text-[12.9vw]"
        >
          Wear the Moment
        </FadeIn>
      </div>

      {/* MODEL VISUAL */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-[42%] sm:w-[360px] md:top-auto md:bottom-0 md:w-[440px] md:translate-y-0 lg:w-[520px]">
        <FadeIn immediate y={30} delay={0.6}>
          <div ref={ref} style={style} className="pointer-events-auto">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="block h-auto max-h-[78svh] w-full object-contain object-bottom"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 62% 75% at 50% 48%, #000 55%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 62% 75% at 50% 48%, #000 55%, transparent 100%)',
              }}
              fetchPriority="high"
            />
          </div>
        </FadeIn>
      </div>

      {/* BOTTOM ROW */}
      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-6 md:px-10 md:pb-8">
        <FadeIn immediate y={20} delay={0.35}>
          <p className="max-w-[160px] text-[0.7rem] font-light uppercase leading-snug tracking-wide text-bone/[0.68] sm:max-w-[220px] sm:text-xs md:max-w-[260px] md:text-sm">
            Luxury fashion crafted for those who know exactly who they are.
          </p>
        </FadeIn>
        <FadeIn immediate y={20} delay={0.5}>
          <Button href="#collections">Shop the Collection</Button>
        </FadeIn>
      </div>
    </section>
  );
}
