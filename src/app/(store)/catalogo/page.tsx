import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { catalog, catalogCategories, categoryLabels } from '@/data/catalog';
import { CatalogCard } from '@/components/ui/CatalogCard';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { generateGenericWhatsAppLink } from '@/utils/whatsapp';

export const metadata: Metadata = {
  title: 'Catálogo y Precios | Aguas Reloncaví',
  description: 'Recargas de 10 y 20 litros y packs de botellones con bomba USB o dispensador. Agua purificada con reparto a domicilio en Puerto Montt.',
};

export default function CatalogoPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        breadcrumb="Catálogo"
        title={<>Agua purificada, <span className="text-[#0284C7]">a tu medida.</span></>}
        description="Recargas y packs listos para tu hogar u oficina, con reparto a domicilio en todo Puerto Montt."
      >
        <div className="flex flex-wrap gap-2">
          {catalogCategories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="inline-flex items-center rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-[#0F172A] hover:border-[#0284C7] hover:text-[#0284C7] transition-colors"
            >
              {categoryLabels[category].title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl space-y-20">
          {catalogCategories.map((category) => {
            const products = catalog.filter((p) => p.category === category);
            return (
              <div key={category} id={category} className="scroll-mt-28">
                <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8 pb-4 border-b border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F172A]">{categoryLabels[category].title}</h2>
                  <p className="text-gray-500">{categoryLabels[category].subtitle}</p>
                </Reveal>
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${products.length > 2 ? 'lg:grid-cols-3' : 'lg:max-w-4xl'} gap-8`}>
                  {products.map((product, index) => (
                    <Reveal key={product.id} delay={index * 100}>
                      <CatalogCard product={product} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-[#0F172A] text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8 noise">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#0284C7]/40 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">¿Listo para pedir?</h2>
              <p className="text-lg text-gray-300">Arma tu pedido en línea en menos de un minuto o escríbenos directamente.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/pedido" className="group inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F172A] px-7 py-4 rounded-full font-bold hover:bg-white transition-colors">
                Hacer pedido <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={generateGenericWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-bold hover:bg-[#1DA851] transition-colors">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
