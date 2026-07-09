export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

export const catalog: Product[] = [
  {
    id: 'bidon-25l',
    name: 'Bidón 25L',
    description: 'Agua purificada por ósmosis inversa, libre de sodio. Envase retornable.',
    price: 3000,
    image: '/images/hero1.jpeg',
    badge: 'Más Vendido'
  },
  {
    id: 'dispensador-manual',
    name: 'Dispensador Manual',
    description: 'Bomba manual fácil de instalar, ideal para el hogar.',
    price: 5000,
    image: '/images/hero2.jpeg',
  },
  {
    id: 'promo-2-bidones-dispensador',
    name: 'Promo: 2 Bidones 25L + Dispensador',
    description: 'Lleva 2 recargas de 25L más el dispensador manual a un precio especial.',
    price: 10000,
    image: '/images/hero1.jpeg',
    badge: 'Oferta Especial'
  }
];
