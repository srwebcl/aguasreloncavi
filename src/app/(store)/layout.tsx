import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { StickyWhatsApp } from '@/components/ui/StickyWhatsApp';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="bg-[#0F172A] text-white py-16 relative overflow-hidden noise">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.webp" alt="Aguas Reloncaví Logo" width={40} height={40} className="w-10 h-10 object-contain brightness-0 invert" />
              <span className="font-display font-bold text-2xl tracking-tight">Aguas Reloncaví</span>
            </div>
            <p className="text-gray-400">
              Llevamos pureza y frescura a cada rincón de Puerto Montt. Tu salud es nuestra prioridad.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-xl mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/catalogo" className="hover:text-white transition-colors">Catálogo y Precios</Link></li>
              <li><Link href="/pedido" className="hover:text-white transition-colors">Haz tu Pedido</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-xl mb-6">Servicios</h4>
            <ul className="space-y-3 text-gray-400">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicios/${service.slug}`} className="hover:text-white transition-colors">{service.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-xl mb-6">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Puerto Montt, Región de Los Lagos</li>
              <li>+56 9 8146 5007</li>
              <li>ventas@aguasreloncavi.cl</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Aguas Reloncaví. Todos los derechos reservados.
        </div>
      </footer>
      <StickyWhatsApp />
    </>
  );
}
