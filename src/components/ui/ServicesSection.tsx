import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-white relative overflow-hidden scroll-mt-24">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#38BDF8]/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <Reveal className="mb-14">
          <div className="max-w-2xl">
            <span className="text-[#0284C7] font-bold tracking-widest uppercase text-sm mb-3 block">Servicios</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0F172A] leading-tight">
              Soluciones de agua para tu hogar y empresa
            </h2>
            <p className="text-xl text-gray-500 mt-4">
              Más allá del reparto: tratamos, filtramos y llevamos agua potable de calidad hasta tu llave.
            </p>
          </div>
        </Reveal>

        {/* Bento: 2 destacados arriba + 3 abajo en escritorio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={(index < 2 ? index : index - 2) * 100}
              className={`${index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'} ${index === services.length - 1 && services.length % 2 === 1 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex flex-col h-full rounded-[1.75rem] bg-white border border-gray-100 p-2 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_25px_60px_rgba(2,132,199,0.16)] hover:border-[#38BDF8]/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative">
                  <ImageSlot
                    src={service.heroImage}
                    alt={service.title}
                    icon={service.icon}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-[16/10] rounded-[1.4rem]"
                    imageClassName="group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#0F172A] flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                  <span className="absolute -bottom-6 left-5 w-12 h-12 rounded-2xl bg-white text-[#0284C7] shadow-[0_10px_25px_rgba(15,23,42,0.12)] flex items-center justify-center group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-300">
                    <service.icon className="w-6 h-6" />
                  </span>
                </div>
                <div className="flex flex-col flex-1 px-5 pt-10 pb-5">
                  <h3 className="text-xl font-display font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#0284C7] transition-colors">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed flex-1">{service.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                    Saber más <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
