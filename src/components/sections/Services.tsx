import { SERVICES } from '../../config/content';
import FadeIn from '../ui/FadeIn';

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-0 rounded-t-[40px] bg-paper px-6 pb-32 pt-20 text-ink sm:rounded-t-[50px] sm:pb-36 md:rounded-t-[60px] md:px-10 md:pb-44 md:pt-28"
    >
      <FadeIn as="h2" y={40} className="text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
        The House
      </FadeIn>

      <ol className="mx-auto mt-14 max-w-5xl md:mt-20">
        {SERVICES.map((s, i) => (
          <FadeIn
            as="li"
            key={s.title}
            y={30}
            delay={i * 0.1}
            className={`flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12 ${i < SERVICES.length - 1 ? 'border-b border-ink/10' : ''}`}
          >
            <span className="w-[4.5rem] shrink-0 font-black leading-[0.85] tracking-tight text-[clamp(3rem,9vw,6.5rem)] sm:w-auto sm:min-w-[9rem] md:min-w-[11rem]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="pt-1 md:pt-2">
              <h3 className="text-lg font-medium uppercase tracking-wide sm:text-xl md:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-ink/60 sm:text-base">{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
