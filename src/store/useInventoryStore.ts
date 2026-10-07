import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { catalog, type Product } from '@/data/catalog';

export interface InventoryProduct extends Product {
  stock: number;
}

const initialStock: Record<string, number> = {
  'recarga-10l': 80,
  'recarga-20l': 80,
};

const initialProducts: InventoryProduct[] = catalog.map((p) => ({
  ...p,
  stock: initialStock[p.id] ?? 20,
}));

export type ProductInput = Omit<InventoryProduct, 'id'>;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);

interface InventoryState {
  products: InventoryProduct[];
  updateStock: (id: string, newStock: number) => void;
  updatePrice: (id: string, newPrice: number) => void;
  decrementStock: (id: string, quantity: number) => void;
  addProduct: (product: ProductInput) => string;
  updateProduct: (id: string, fields: Partial<ProductInput>) => void;
  deleteProduct: (id: string) => void;
  resetInventory: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      updateStock: (id, newStock) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: newStock } : p
          ),
        })),
      updatePrice: (id, newPrice) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, price: newPrice } : p
          ),
        })),
      decrementStock: (id, quantity) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: Math.max(0, p.stock - quantity) } : p
          ),
        })),
      addProduct: (product) => {
        const base = slugify(product.name) || 'producto';
        const taken = new Set(get().products.map((p) => p.id));
        let id = base;
        while (taken.has(id)) id = `${base}-${Math.random().toString(36).slice(2, 6)}`;
        set((state) => ({ products: [...state.products, { ...product, id }] }));
        return id;
      },
      updateProduct: (id, fields) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...fields } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
      resetInventory: () => set({ products: initialProducts }),
    }),
    {
      name: 'aguas-reloncavi-inventory',
      // v2: catálogo 10/20 LT (descarta productos antiguos de 25L).
      // v3/v4: fotos reales de productos; refresca datos del catálogo conservando stock y precio editados.
      version: 4,
      migrate: (persisted, version) => {
        if (version < 2) return { products: initialProducts } as InventoryState;
        const savedList = (persisted as InventoryState)?.products ?? [];
        const saved = new Map(savedList.map((p) => [p.id, p]));
        const catalogIds = new Set(initialProducts.map((p) => p.id));
        return {
          products: [
            ...initialProducts.map((p) => {
              const prev = saved.get(p.id);
              return prev ? { ...p, stock: prev.stock, price: prev.price } : p;
            }),
            // Conserva los productos creados desde el admin
            ...savedList.filter((p) => !catalogIds.has(p.id)),
          ],
        } as InventoryState;
      },
    }
  )
);
