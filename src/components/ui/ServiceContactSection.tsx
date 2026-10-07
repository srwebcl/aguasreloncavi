import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ServiceContactForm } from '@/components/ui/ServiceContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { generateGenericWhatsAppLink, generateServiceWhatsAppLink } from '@/utils/whatsapp';

interface ServiceContactSectionProps {
  serviceTitle?: string;
  title?: string;
}

export function ServiceContactSection({ serviceTitle, title = 'Cotiza tu servicio' }: ServiceContactSectionProps) {
  const whatsappLink = serviceTitle ? generateServiceWhatsAppLink(serviceTitle) : generateGenericWhatsAppLink();

  return (
    <section id="contacto" className="relative bg-[#0F172A] text-white py-20 md:py-28 overflow-hidden scroll-mt-24 noise">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#0284C7]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#38BDF8]/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
        <Reveal>
          <span className="text-[#38BDF8] font-bold tracking-widest uppercase text-sm mb-3 block">Contacto</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">{title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-md">
            Completa el formulario y un técnico te contactará para coordinar una evaluación sin compromiso.
          </p>

          <ul className="space-y-5 mb-10">
            <li className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"><Phone className="w-5 h-5 text-[#38BDF8]" /></span>
              <a href="tel:+56981465007" className="font-bold hover:text-[#38BDF8] transition-colors">+56 9 8146 5007</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"><Mail className="w-5 h-5 text-[#38BDF8]" /></span>
              <a href="mailto:ventas@aguasreloncavi.cl" className="font-bold hover:text-[#38BDF8] transition-colors">ventas@aguasreloncavi.cl</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-[#38BDF8]" /></span>
              <span className="font-bold">Puerto Montt y alrededores</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"><Clock className="w-5 h-5 text-[#38BDF8]" /></span>
              <span className="font-bold">Lunes a sábado</span>
            </li>
          </ul>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-bold hover:bg-[#1DA851] transition-colors shadow-[0_10px_30px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-5 h-5" /> Prefiero WhatsApp
          </a>
        </Reveal>

        <Reveal delay={150} className="bg-white text-[#0F172A] rounded-[2rem] p-6 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <ServiceContactForm defaultService={serviceTitle} />
        </Reveal>
      </div>
    </section>
  );
}
