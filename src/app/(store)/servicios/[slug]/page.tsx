import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, ChevronRight, Clock, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { generateServiceWhatsAppLink } from '@/utils/whatsapp';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { ServiceContactSection } from '@/components/ui/ServiceContactSection';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} en Puerto Montt | Aguas Reloncaví`,
    description: service.summary,
  };
}

const trustPoints = [
  { icon: Clock, label: 'Respuesta en 24 h hábiles' },
  { icon: MapPin, label: 'Puerto Montt y alrededores' },
  { icon: ShieldCheck, label: 'Trabajos con garantía' },
];

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const whatsappLink = generateServiceWhatsAppLink(service.title);
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const titleWords = service.title.split(' ');

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#F8FAFC] pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full bg-[#38BDF8]/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 mb-10 md:mb-14">
            <Link href="/" className="hover:text-[#0284C7] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#servicios" className="hover:text-[#0284C7] transition-colors">Servicios</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0F172A] truncate">{service.shortTitle}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 pl-1.5 pr-4 py-1.5 text-sm font-bold text-[#0F172A] shadow-sm mb-8 opacity-0 animate-fade-in-up">
                <span className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center">
                  <service.icon className="w-4 h-4" />
                </span>
                Servicio técnico
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[#0F172A] leading-[1.08] tracking-tight mb-6" aria-label={service.title}>
                {titleWords.map((word, i) => (
                  <span key={i} aria-hidden="true" className="inline-block opacity-0 animate-fade-in-up mr-[0.25em]" style={{ animationDelay: `${100 + i * 60}ms` }}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                {service.summary}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <a
                  href="#contacto"
                  className="group inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#0284C7] transition-colors shadow-lg"
                >
                  Solicitar cotización <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-[#25D366] hover:text-[#1DA851] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                {trustPoints.map((point) => (
                  <li key={point.label} className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <point.icon className="w-4 h-4 text-[#0284C7]" /> {point.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <ImageSlot
                src={service.heroImage}
                alt={service.title}
                icon={service.icon}
                caption="Foto principal del servicio"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
              />
              <div className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:-left-6 sm:right-auto sm:max-w-xs rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-[#0284C7] mb-1">Evaluación</div>
                <div className="font-display font-bold text-[#0F172A] leading-snug">Visita técnica y diagnóstico sin compromiso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Descripción + Proceso */}
      <section id="detalle" className="py-20 md:py-28 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20">
          <Reveal>
            <span className="text-[#0284C7] font-bold tracking-widest uppercase text-sm mb-3 block">El servicio</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F172A] mb-6 leading-tight">¿En qué consiste?</h2>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              {service.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="bg-[#F8FAFC] rounded-[2rem] border border-gray-100 p-8 md:p-10 h-fit">
            <h3 className="text-xl font-display font-bold text-[#0F172A] mb-8">Cómo trabajamos</h3>
            <ol className="relative">
              {service.steps.map((step, index) => (
                <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                  {index < service.steps.length - 1 && (
                    <span className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-[#0284C7]/40 to-[#0284C7]/5" aria-hidden="true" />
                  )}
                  <span className="relative w-10 h-10 shrink-0 rounded-full bg-white border-2 border-[#0284C7] text-[#0284C7] font-display font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="pt-2 font-semibold text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Galería */}
      <section className="pb-20 md:pb-28 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F172A]">Nuestro trabajo</h2>
            <p className="text-gray-500">Proyectos realizados en la Región de Los Lagos.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[520px]">
            {service.gallery.map((item, index) => (
              <Reveal
                key={item.caption}
                delay={index * 100}
                className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              >
                <figure className="group relative h-full min-h-[240px] rounded-3xl overflow-hidden">
                  <ImageSlot
                    src={item.src}
                    alt={item.caption}
                    icon={service.icon}
                    caption={item.caption}
                    sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                    className="absolute inset-0"
                    imageClassName="group-hover:scale-105 transition-transform duration-700"
                  />
                  {item.src && (
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 to-transparent text-white font-semibold">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <span className="text-[#0284C7] font-bold tracking-widest uppercase text-sm mb-2 block">Beneficios</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F172A]">¿Por qué elegirnos?</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 100}>
                <div className="h-full bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(2,132,199,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <span className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#0F172A] mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <ServiceContactSection serviceTitle={service.title} title={`Cotiza: ${service.shortTitle.toLowerCase()}`} />

      {/* Otros servicios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F172A] mb-8">Otros servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/servicios/${other.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 p-5 hover:border-[#38BDF8]/50 hover:shadow-[0_10px_30px_rgba(2,132,199,0.1)] transition-all"
              >
                <span className="w-12 h-12 shrink-0 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                  <other.icon className="w-6 h-6" />
                </span>
                <span className="font-bold text-[#0F172A] flex-1 leading-snug">{other.shortTitle}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0284C7] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
