import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; variant?: 'primary' | 'ghost' };

/** Pill button rendered as an anchor (all CTAs navigate to on-page sections). */
export default function Button({ children, variant = 'primary', className = '', ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-full uppercase tracking-widest font-medium whitespace-nowrap transition-all duration-[250ms] ease-out hover:scale-[1.04]';
  const styles =
    variant === 'primary'
      ? 'btn-gold text-bone px-6 py-3 text-xs sm:px-8 sm:py-4 sm:text-sm hover:brightness-110'
      : 'border-2 border-bone text-bone px-5 py-2.5 text-[0.65rem] sm:px-6 sm:py-3 sm:text-xs hover:bg-bone/10';
  return (
    <a className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </a>
  );
}
