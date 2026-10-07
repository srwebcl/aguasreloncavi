import Image from 'next/image';
import { Product } from '@/data/catalog';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { ShoppingCart } from 'lucide-react';

export function CatalogCard({ product }: { product: Product }) {
  const whatsappLink = generateWhatsAppLink(product.name, 1);

  return (
    <div className="group bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(2,132,199,0.15)] hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 hover:border-[#38BDF8]/50 flex flex-col h-full relative overflow-hidden">
      {product.badge && (
        <div className="absolute top-4 right-4 bg-[#0F172A] text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm uppercase tracking-wider">
          {product.badge}
        </div>
      )}

      <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden bg-[#F0F9FF]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-[#0F172A] mb-2 font-display leading-snug">{product.name}</h3>
        <p className="text-gray-500 mb-5 flex-1 text-sm leading-relaxed">{product.description}</p>

        <div className="mt-auto">
          <div className="text-3xl font-display font-black text-[#0284C7] mb-4 tracking-tight">
            ${product.price.toLocaleString('es-CL')}
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center h-12 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#1DA851] transition-colors shadow-lg shadow-[#25D366]/20 active:scale-[0.98]"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
