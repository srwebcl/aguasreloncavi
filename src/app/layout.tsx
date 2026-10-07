import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

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
  description: 'Reparto rápido de agua purificada en botellones de 10 y 20 litros, más servicios de tratamiento y filtración de agua potable. Atendemos a todo Puerto Montt. Pide por WhatsApp.',
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
    "description": "Planta de agua purificada, reparto de botellones de 10 y 20 litros a domicilio y servicios de tratamiento de agua potable.",
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
        {children}
      </body>
    </html>
  );
}
