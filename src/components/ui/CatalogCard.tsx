import Image from 'next/image';
import { Product } from '@/data/catalog';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { ShoppingCart } from 'lucide-react';

export function CatalogCard({ product }: { product: Product }) {
  const whatsappLink = generateWhatsAppLink(product.name, 1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full relative overflow-hidden">
      {product.badge && (
        <div className="absolute top-4 right-4 bg-[#38BDF8] text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
          {product.badge}
        </div>
      )}
      
      <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
        {/* Usando imagen estática o logo como placeholder temporal */}
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-[#0F172A] mb-2 font-display">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-1 text-sm">{product.description}</p>
        
        <div className="mt-auto">
          <div className="text-2xl font-bold text-[#0284C7] mb-4">
            ${product.price.toLocaleString('es-CL')}
          </div>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center h-12 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors shadow-lg shadow-[#25D366]/20"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
