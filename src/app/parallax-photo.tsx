'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  eager?: boolean;
  speed?: number;
  fit?: 'cover' | 'contain';
  mobileSrc?: string;
};

export default function ParallaxPhoto({ src, alt, className = '', position = 'center', eager = false, speed = 0.3, fit = 'cover', mobileSrc }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const smallScreen = window.matchMedia('(max-width: 760px)');
    const update = () => {
      if (!frame.current || !layer.current) return;
      if (reduceMotion.matches) {
        layer.current.style.setProperty('--photo-shift', '0px');
        return;
      }
      const box = frame.current.getBoundingClientRect();
      if (box.bottom < -100 || box.top > window.innerHeight + 100) return;
      const distance = window.innerHeight / 2 - (box.top + box.height / 2);
      const strength = smallScreen.matches ? speed * 1.15 : speed;
      const limit = smallScreen.matches ? 110 : 120;
      const shift = Math.max(-limit, Math.min(limit, distance * strength));
      layer.current.style.setProperty('--photo-shift', `${shift.toFixed(2)}px`);
    };
    // Keep scroll updates independent of animation frames, which mobile browsers
    // may pause while the visual viewport is moving or browser chrome collapses.
    const schedule = update;
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.visualViewport?.addEventListener('scroll', schedule, { passive: true });
    window.visualViewport?.addEventListener('resize', schedule);
    reduceMotion.addEventListener('change', schedule);
    smallScreen.addEventListener('change', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('scroll', schedule, true);
      window.visualViewport?.removeEventListener('scroll', schedule);
      window.visualViewport?.removeEventListener('resize', schedule);
      reduceMotion.removeEventListener('change', schedule);
      smallScreen.removeEventListener('change', schedule);
    };
  }, [speed]);

  return <div ref={frame} className={`motion-photo ${className}`}>
    <div ref={layer} className="motion-photo-layer">
      <picture>
      {mobileSrc && <source media="(max-width: 760px)" srcSet={mobileSrc} />}
      <Image src={src} alt={alt} fill unoptimized sizes={eager ? '100vw' : '(max-width: 760px) 100vw, 50vw'} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} style={{ objectFit: fit, objectPosition: position }} />
      </picture>
    </div>
  </div>;
}
