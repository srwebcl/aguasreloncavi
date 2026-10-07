'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { X, Upload, Check, Trash2 } from 'lucide-react';
import { useInventoryStore, type InventoryProduct, type ProductInput } from '@/store/useInventoryStore';
import { catalog, catalogCategories, categoryLabels, type ProductCategory } from '@/data/catalog';

interface ProductFormModalProps {
  productToEdit?: InventoryProduct | null;
  onClose: () => void;
}

// Fotos ya disponibles en /public para reutilizar
const libraryImages = Array.from(new Set(catalog.map((p) => p.image)));

// Redimensiona y comprime la imagen subida para guardarla en localStorage sin exceder su cuota
function fileToCompressedDataUrl(file: File, maxSize = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas no disponible'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/webp', 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const inputClass =
  'w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white font-medium text-[#0F172A] transition-colors';

export function ProductFormModal({ productToEdit, onClose }: ProductFormModalProps) {
  const { addProduct, updateProduct, deleteProduct } = useInventoryStore();
  const fileInput = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: productToEdit?.name ?? '',
    description: productToEdit?.description ?? '',
    category: productToEdit?.category ?? ('recarga' as ProductCategory),
    price: productToEdit?.price.toString() ?? '',
    stock: productToEdit?.stock.toString() ?? '0',
    badge: productToEdit?.badge ?? '',
    image: productToEdit?.image ?? libraryImages[0],
  });
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('El archivo debe ser una imagen.');
    setUploading(true);
    try {
      set('image', await fileToCompressedDataUrl(file));
      setError(null);
    } catch {
      setError('No se pudo procesar la imagen.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(form.price);
    const stock = parseInt(form.stock);
    if (form.name.trim().length < 3) return setError('El nombre debe tener al menos 3 caracteres.');
    if (isNaN(price) || price <= 0) return setError('Ingresa un precio válido.');
    if (isNaN(stock) || stock < 0) return setError('Ingresa un stock válido.');

    const data: ProductInput = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      price,
      stock,
      image: form.image,
      badge: form.badge.trim() || undefined,
    };

    try {
      if (productToEdit) updateProduct(productToEdit.id, data);
      else addProduct(data);
      onClose();
    } catch {
      // localStorage lleno (p. ej. muchas imágenes subidas)
      setError('No hay espacio para guardar. Usa una imagen de la biblioteca o elimina productos con fotos subidas.');
    }
  };

  const handleDelete = () => {
    if (!productToEdit) return;
    if (window.confirm(`¿Eliminar "${productToEdit.name}"? Dejará de mostrarse en el formulario de pedidos.`)) {
      deleteProduct(productToEdit.id);
      onClose();
    }
  };

  const isUploaded = form.image.startsWith('data:');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <form onSubmit={handleSubmit} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-[#0F172A]">{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg" aria-label="Cerrar">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Nombre *</label>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej. 2 Botellones 20 LT + Dispensador" className={inputClass} autoFocus />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Descripción</label>
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Categoría *</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value as ProductCategory)} className={inputClass}>
                {catalogCategories.map((c) => (
                  <option key={c} value={c}>{categoryLabels[c].title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Etiqueta destacada</label>
              <input value={form.badge} onChange={(e) => set('badge', e.target.value)} placeholder="Ej. Oferta, Más Vendido" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Precio ($) *</label>
              <input type="number" min={1} value={form.price} onChange={(e) => set('price', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Stock *</label>
              <input type="number" min={0} value={form.stock} onChange={(e) => set('stock', e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Imagen */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Imagen</label>
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" /> {uploading ? 'Procesando...' : 'Subir foto'}
              </button>
              <input ref={fileInput} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {isUploaded && (
                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-blue-500">
                  <Image src={form.image} alt="Foto subida" fill sizes="96px" className="object-cover" />
                  <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center"><Check className="w-3 h-3" /></span>
                </div>
              )}
              {libraryImages.map((src) => {
                const selected = form.image === src;
                return (
                  <button
                    type="button"
                    key={src}
                    onClick={() => set('image', src)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${selected ? 'border-blue-500' : 'border-gray-100 hover:border-gray-300'}`}
                    aria-pressed={selected}
                  >
                    <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                    {selected && <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center"><Check className="w-3 h-3" /></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <p className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600" role="alert">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
          {productToEdit ? (
            <button type="button" onClick={handleDelete} className="inline-flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
          ) : <span />}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancelar</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95 transition-all">
              {productToEdit ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
