import { ArrowUpRight, Facebook, Mail, MapPin } from 'lucide-react';
import { CONTACT } from '../../config/content';
import Button from '../ui/Button';

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 bg-ink px-6 pb-10 pt-16 text-bone md:px-10">
      <div className="flex flex-col items-start justify-between gap-8 border-t border-bone/15 pt-10 md:flex-row md:items-end">
        <div>
          <p className="font-serif text-2xl italic text-gold md:text-3xl">Private orders & fittings by appointment.</p>
          <div className="mt-5 flex flex-col gap-2 text-sm font-light text-bone/70 sm:flex-row sm:gap-8">
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition-opacity hover:opacity-70">
              <Mail size={16} aria-hidden /> {CONTACT.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden /> {CONTACT.location}
            </span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-opacity hover:opacity-70">
              <Facebook size={16} aria-hidden /> {CONTACT.facebook}
            </a>
          </div>
        </div>
        <Button href={`mailto:${CONTACT.email}?subject=Big%20Stone%20Luxury%20Enquiry`}>
          Book a Fitting <ArrowUpRight size={16} className="ml-2" aria-hidden />
        </Button>
      </div>
      <p className="mt-10 text-xs uppercase tracking-widest text-bone/40">© {new Date().getFullYear()} Big Stone Luxury · Uyo</p>
    </footer>
  );
}
