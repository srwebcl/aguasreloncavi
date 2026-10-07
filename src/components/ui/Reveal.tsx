'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/components/ui/Button';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

// Entrada escalonada al hacer scroll. Solo anima transform/opacity (ver .reveal en globals.css).
export function Reveal({ delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
