import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { StickyWhatsApp } from '@/components/ui/StickyWhatsApp';
import { Navbar } from '@/components/ui/Navbar';
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
        <Navbar />

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
