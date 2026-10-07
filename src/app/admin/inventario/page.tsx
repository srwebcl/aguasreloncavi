'use client';
import React, { useEffect, useState } from 'react';
import { useInventoryStore, type InventoryProduct } from '@/store/useInventoryStore';
import Image from 'next/image';
import { PackageSearch, Save, RefreshCw, AlertTriangle, Plus, Pencil } from 'lucide-react';
import { ProductFormModal } from '@/components/admin/ProductFormModal';
import { categoryLabels } from '@/data/catalog';

export default function InventoryDashboard() {
  const [hydrated, setHydrated] = useState(false);
  const { products, updateStock, updatePrice, resetInventory } = useInventoryStore();

  const [localStock, setLocalStock] = useState<Record<string, string>>({});
  const [localPrice, setLocalPrice] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<{ open: boolean; product: InventoryProduct | null }>({ open: false, product: null });

  useEffect(() => {
    setHydrated(true);
    // Initialize local state based on products
    const initialStock: Record<string, string> = {};
    const initialPrice: Record<string, string> = {};
    products.forEach(p => {
      initialStock[p.id] = p.stock.toString();
      initialPrice[p.id] = p.price.toString();
    });
    setLocalStock(initialStock);
    setLocalPrice(initialPrice);
  }, [products]);

  if (!hydrated) return <div className="p-8"><div className="animate-pulse text-gray-400 font-bold">Cargando inventario...</div></div>;

  const handleSave = (id: string) => {
    const stockVal = parseInt(localStock[id]);
    const priceVal = parseInt(localPrice[id]);
    if (!isNaN(stockVal)) updateStock(id, stockVal);
    if (!isNaN(priceVal)) updatePrice(id, priceVal);
  };

  return (
    <div className="p-8 pb-24">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#0F172A] mb-1 tracking-tight">Inventario y Precios</h1>
          <p className="text-gray-500">Gestiona el stock disponible y los precios de venta.</p>
        </div>
        <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (window.confirm('¿Restaurar el catálogo original? Se perderán los productos creados y los cambios de precio y stock.')) resetInventory();
          }}
          className="text-sm text-gray-500 hover:text-gray-700 font-bold flex items-center gap-1 bg-white border border-gray-200 px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 hover:bg-gray-50">
          <RefreshCw className="w-4 h-4"/> Restaurar Valores
        </button>
        <button onClick={() => setModal({ open: true, product: null })} className="text-sm text-white font-bold flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
          <Plus className="w-4 h-4"/> Nuevo Producto
        </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            <PackageSearch className="w-5 h-5 text-gray-400" />
            Catálogo de Productos
            <span className="ml-1 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{products.length}</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[80px]">Imagen</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Producto</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[180px]">Precio ($)</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[180px]">Stock</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right w-[180px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                const stockVal = parseInt(localStock[product.id] || '0');
                const isLowStock = stockVal <= 10;
                const hasChanges = (parseInt(localStock[product.id]) !== product.stock) || (parseInt(localPrice[product.id]) !== product.price);

                return (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg relative overflow-hidden border border-gray-200">
                        <Image src={product.image} alt={product.name} fill sizes="48px" className="object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0F172A]">{product.name}</span>
                        {product.badge && <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white px-2 py-0.5 rounded-full">{product.badge}</span>}
                      </div>
                      <div className="text-[11px] font-bold text-blue-600 mt-0.5">{categoryLabels[product.category]?.title ?? product.category}</div>
                      <div className="text-xs text-gray-500 mt-1 max-w-[250px] truncate">{product.description}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                        <input 
                          type="number"
                          value={localPrice[product.id] || ''}
                          onChange={(e) => setLocalPrice(prev => ({...prev, [product.id]: e.target.value}))}
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-8 pr-3 py-2 outline-none focus:border-blue-500 font-bold text-[#0F172A] transition-colors"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <input 
                          type="number"
                          value={localStock[product.id] || ''}
                          onChange={(e) => setLocalStock(prev => ({...prev, [product.id]: e.target.value}))}
                          className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2 outline-none font-bold transition-colors ${isLowStock ? 'border-red-200 focus:border-red-500 text-red-600' : 'border-gray-100 focus:border-blue-500 text-[#0F172A]'}`}
                        />
                        {isLowStock && <span className="text-[10px] font-bold text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Stock bajo</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setModal({ open: true, product })}
                        className="inline-flex items-center justify-center p-2 mr-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        aria-label={`Editar ${product.name}`}
                        title="Editar producto"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSave(product.id)}
                        disabled={!hasChanges}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${hasChanges ? 'bg-blue-600 text-white shadow-md active:scale-95 hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                      >
                        <Save className="w-4 h-4" /> Guardar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-12 text-center text-gray-400 font-medium">No hay productos. Crea uno con “Nuevo Producto”.</div>
          )}
        </div>
      </div>

      {modal.open && (
        <ProductFormModal
          key={modal.product?.id ?? 'new'}
          productToEdit={modal.product}
          onClose={() => setModal({ open: false, product: null })}
        />
      )}
    </div>
  );
}
