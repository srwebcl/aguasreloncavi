import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceContactSection } from '@/components/ui/ServiceContactSection';

export const metadata: Metadata = {
  title: 'Contacto | Aguas Reloncaví',
  description: 'Contáctanos para pedidos de agua purificada o cotizaciones de servicios de tratamiento y filtración de agua potable en Puerto Montt.',
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        breadcrumb="Contacto"
        title={<>Conversemos sobre <span className="text-[#0284C7]">tu agua.</span></>}
        description="Pedidos, cotizaciones de servicios o consultas generales: te respondemos a la brevedad."
      />
      <ServiceContactSection title="Escríbenos" />
    </>
  );
}
