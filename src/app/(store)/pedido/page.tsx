import type { Metadata } from 'next';
import { Clock, ShieldCheck, Truck } from 'lucide-react';
import { OrderWizard } from '@/components/ui/OrderWizard';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Haz tu Pedido | Aguas Reloncaví',
  description: 'Pide agua purificada en línea: recargas de 10 y 20 litros y packs con reparto a domicilio en Puerto Montt.',
};

const highlights = [
  { icon: Truck, label: 'Reparto en todo Puerto Montt' },
  { icon: Clock, label: 'Pide hoy, recíbelo hoy' },
  { icon: ShieldCheck, label: 'Agua libre de sodio' },
];

export default function PedidoPage() {
  return (
    <>
      <PageHero
        eyebrow="Pedido en línea"
        breadcrumb="Haz tu pedido"
        title={<>Haz tu pedido <span className="text-[#0284C7]">en 3 pasos.</span></>}
        description="Elige tus productos, indica la dirección y confirma. Te avisamos por WhatsApp cuando vayamos en camino."
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {highlights.map((h) => (
            <li key={h.label} className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <h.icon className="w-4 h-4 text-[#0284C7]" /> {h.label}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="pb-24 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="container mx-auto px-4">
          <OrderWizard />
        </div>
      </section>
    </>
  );
}
