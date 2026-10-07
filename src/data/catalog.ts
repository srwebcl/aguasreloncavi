export type ProductCategory = 'recarga' | 'pack-10' | 'pack-20';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  badge?: string;
};

export const categoryLabels: Record<ProductCategory, { title: string; subtitle: string }> = {
  'recarga': { title: 'Recargas', subtitle: 'Rellenamos tu bidón con agua purificada.' },
  'pack-10': { title: 'Packs 10 Litros', subtitle: 'Formato liviano, ideal para departamentos y oficinas.' },
  'pack-20': { title: 'Packs 20 Litros', subtitle: 'Mayor rendimiento para familias y empresas.' },
};

export const catalog: Product[] = [
  // Recargas
  {
    id: 'recarga-10l',
    name: 'Recarga 10 LT',
    description: 'Recarga de agua purificada por ósmosis inversa en tu botellón de 10 litros.',
    price: 2100,
    image: '/images/productos/bidon-10lts.jpg',
    category: 'recarga',
  },
  {
    id: 'recarga-20l',
    name: 'Recarga 20 LT',
    description: 'Recarga de agua purificada por ósmosis inversa en tu botellón de 20 litros.',
    price: 3600,
    image: '/images/productos/bidon-20lts.jpg',
    category: 'recarga',
    badge: 'Más Vendido',
  },

  // Packs 10 LT
  {
    id: 'pack-2x10l-bomba-usb',
    name: '2 Botellones 10 LT + Bomba USB',
    description: 'Dos botellones de 10 litros con agua purificada más bomba eléctrica recargable USB.',
    price: 15990,
    image: '/images/productos/2-botellones-10lts-bomba.jpg',
    category: 'pack-10',
  },
  {
    id: 'pack-3x10l-bomba-usb',
    name: '3 Botellones 10 LT + Bomba USB',
    description: 'Tres botellones de 10 litros con agua purificada más bomba eléctrica recargable USB.',
    price: 19990,
    image: '/images/productos/3-botellones-10lts-bomba.jpg',
    category: 'pack-10',
  },
  {
    id: 'pack-3x10l-dispensador',
    name: '3 Botellones 10 LT + Dispensador Plástico',
    description: 'Tres botellones de 10 litros con agua purificada más dispensador plástico de mesa.',
    price: 19990,
    image: '/images/productos/3-botellones-10lts-dispensador.jpg',
    category: 'pack-10',
  },

  // Packs 20 LT
  {
    id: 'pack-2x20l-bomba-usb',
    name: '2 Botellones 20 LT + Bomba USB',
    description: 'Dos botellones de 20 litros con agua purificada más bomba eléctrica recargable USB.',
    price: 19990,
    image: '/images/productos/2-bidones-20lts-bomba-usb.jpg',
    category: 'pack-20',
  },
  {
    id: 'pack-3x20l-bomba-usb',
    name: '3 Botellones 20 LT + Bomba USB',
    description: 'Tres botellones de 20 litros con agua purificada más bomba eléctrica recargable USB.',
    price: 24990,
    image: '/images/productos/3-botellones-20lt-bomba-usb.jpg',
    category: 'pack-20',
    badge: 'Mejor Valor',
  },
  {
    id: 'pack-3x20l-dispensador',
    name: '3 Botellones 20 LT + Dispensador Plástico',
    description: 'Tres botellones de 20 litros con agua purificada más dispensador plástico de mesa.',
    price: 25000,
    image: '/images/productos/3-botellones-20lts-dispensador.jpg',
    category: 'pack-20',
  },
];

export const catalogCategories = Object.keys(categoryLabels) as ProductCategory[];
