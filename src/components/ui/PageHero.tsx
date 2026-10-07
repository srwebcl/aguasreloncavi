import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  breadcrumb: string;
  children?: React.ReactNode;
}

// Encabezado común de subpáginas (catálogo, pedido, contacto).
export function PageHero({ eyebrow, title, description, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative bg-[#F8FAFC] pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 mb-10 md:mb-14">
          <Link href="/" className="hover:text-[#0284C7] transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#0F172A]">{breadcrumb}</span>
        </nav>
        <div className="max-w-3xl">
          <span className="text-[#0284C7] font-bold tracking-widest uppercase text-sm mb-4 block opacity-0 animate-fade-in-up">{eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-[#0F172A] leading-[1.08] tracking-tight mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
            {description}
          </p>
        </div>
        {children && (
          <div className="mt-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '360ms' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
