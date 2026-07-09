import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { StickyWhatsApp } from '@/components/ui/StickyWhatsApp';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Aguas Reloncaví | Agua Purificada a Domicilio en Puerto Montt',
  description: 'Reparto rápido de agua purificada en bidones de 25 litros. Atendemos a todo Puerto Montt. Calidad certificada y dispensadores para hogar o empresa. Pide por WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aguas Reloncaví",
    "image": "https://aguasreloncavi.cl/logo.webp",
    "description": "Planta de agua purificada y reparto de bidones de 25 litros a domicilio.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Puerto Montt",
      "addressRegion": "Los Lagos",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-41.4693",
      "longitude": "-72.9423"
    },
    "url": "https://aguasreloncavi.cl",
    "telephone": "+56912345678",
    "priceRange": "$"
  };

  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        
        {/* Premium Navbar */}
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
          <div className="container mx-auto px-6 h-24 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <Image src="/favicon.webp" alt="Aguas Reloncaví Logo" width={48} height={48} className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-display font-bold text-2xl md:text-3xl text-[#00509E] tracking-tighter">Aguas Reloncaví</span>
            </a>
            <nav className="hidden lg:flex gap-10 items-center">
              <a href="#proceso" className="text-sm font-bold text-[#0F172A] hover:text-[#0284C7] tracking-wide uppercase transition-colors">Proceso</a>
              <a href="#catalogo" className="text-sm font-bold text-[#0F172A] hover:text-[#0284C7] tracking-wide uppercase transition-colors">Productos</a>
              <a href="#testimonios" className="text-sm font-bold text-[#0F172A] hover:text-[#0284C7] tracking-wide uppercase transition-colors">Testimonios</a>
            </nav>
            <a href="#pedido" className="hidden md:inline-flex bg-[#003B73] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-[#0284C7] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Haz tu Pedido
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#0F172A] text-white py-16">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
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
                <li><a href="#proceso" className="hover:text-white transition-colors">Proceso de Purificación</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo y Precios</a></li>
                <li><a href="#testimonios" className="hover:text-white transition-colors">Testimonios Locales</a></li>
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
      </body>
    </html>
  );
}
