import { BIG_STONE_ASSETS } from '../../config/assets';

export default function Lookbook() {
  const allImages = BIG_STONE_ASSETS.lookbookImages;
  
  // Split images into two rows
  const mid = Math.ceil(allImages.length / 2);
  const row1 = allImages.slice(0, mid);
  const row2 = allImages.slice(mid);

  // Duplicate for seamless loop
  const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="lookbook" className="relative w-full overflow-hidden bg-ink py-16 md:py-24">
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        
        {/* ROW 1: Moves Left */}
        <div className="flex w-[200%] animate-marquee gap-3 md:gap-4 hover:[animation-play-state:paused]">
          {duplicatedRow1.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="relative aspect-[4/3] w-[280px] shrink-0 overflow-hidden rounded-xl md:w-[420px] md:rounded-2xl"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* ROW 2: Moves Right */}
        <div className="flex w-[200%] animate-marquee-reverse gap-3 md:gap-4 hover:[animation-play-state:paused] -ml-[10%]">
          {duplicatedRow2.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="relative aspect-[4/3] w-[280px] shrink-0 overflow-hidden rounded-xl md:w-[420px] md:rounded-2xl"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity hover:opacity-100" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
