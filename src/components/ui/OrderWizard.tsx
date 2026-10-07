'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, CheckCircle2, ChevronRight, ChevronLeft, Plus, Minus, User, Home, FileText, CheckCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import { useOrderStore } from '@/store/useOrderStore';
import { useInventoryStore } from '@/store/useInventoryStore';
import { catalogCategories, categoryLabels, type ProductCategory } from '@/data/catalog';

export function OrderWizard() {
  const [step, setStep] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState({ name: '', phone: '+56 9 ', address: '', reference: '' });
  const addOrder = useOrderStore((state) => state.addOrder);
  const { products: catalog, decrementStock } = useInventoryStore();
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(catalogCategories[0]);

  // Client side hydration safety for Zustand
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-auto border border-gray-100 h-[520px] animate-pulse" aria-hidden="true" />;
  }

  const totalItems = Object.values(quantities).reduce((acc, q) => acc + q, 0);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const calculateTotal = () => {
    return catalog.reduce((total, item) => {
      return total + (item.price * (quantities[item.id] || 0));
    }, 0);
  };

  const handleNext = () => {
    if (step === 1 && totalItems > 0) setStep(2);
    if (step === 2 && customer.name && customer.address && customer.phone.length >= 12) setStep(3);
  };

  const handleSubmitOrder = () => {
    const items = catalog
      .filter(item => (quantities[item.id] || 0) > 0)
      .map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantities[item.id]!
      }));
    
    const total = calculateTotal();
    
    const orderId = addOrder({
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      reference: customer.reference,
      items,
      total
    });
    
    // Decrement stock for each item
    items.forEach(item => {
      decrementStock(item.id, item.quantity);
    });
    
    setCreatedOrderId(orderId);
    setStep(4);
  };

  const generateOrderMessage = () => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56981465007';
    let message = `Hola Aguas Reloncaví. Soy ${customer.name}, mi pedido es:\n`;
    
    catalog.forEach(item => {
      const q = quantities[item.id] || 0;
      if (q > 0) {
        message += `- ${q}x ${item.name}\n`;
      }
    });
    
    message += `\nDirección: ${customer.address}`;
    if (customer.reference) message += ` (${customer.reference})`;
    
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-6 md:p-10 w-full max-w-3xl mx-auto border border-gray-100">
      {/* Progress Bar */}
      <div className={`flex items-center justify-between mb-8 relative ${step === 4 ? 'opacity-0 h-0 overflow-hidden mb-0' : ''} transition-all duration-500`}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0284C7] -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((Math.min(step, 3) - 1) / 2) * 100}%` }}
        ></div>
        
        {[
          { num: 1, label: 'Pedido', icon: ShoppingCart },
          { num: 2, label: 'Dirección', icon: MapPin },
          { num: 3, label: 'Confirmar', icon: CheckCircle2 }
        ].map(s => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= s.num ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20' : 'bg-gray-100 text-gray-400'}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-medium hidden sm:block ${step >= s.num ? 'text-[#0284C7]' : 'text-gray-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Products — una categoría a la vez para mantener el formulario compacto */}
      {step === 1 && (
        <div className="animate-in">
          <h3 className="text-xl md:text-2xl font-display font-bold text-[#0F172A] mb-4 md:mb-5 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#0284C7]" /> ¿Qué necesitas hoy?
          </h3>

          <div role="tablist" aria-label="Categorías de productos" className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-2xl mb-4 md:mb-5">
            {catalogCategories.map(category => {
              const selectedInCategory = catalog
                .filter(item => item.category === category)
                .reduce((acc, item) => acc + (quantities[item.id] || 0), 0);
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-2 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${isActive ? 'bg-white text-[#0F172A] shadow-sm' : 'text-gray-500 hover:text-[#0F172A]'}`}
                >
                  {categoryLabels[category].title}
                  {selectedInCategory > 0 && (
                    <span className="absolute -top-1.5 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#0284C7] text-white text-[11px] font-black flex items-center justify-center">
                      {selectedInCategory}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div key={activeCategory} role="tabpanel" className="space-y-2.5 animate-in">
            {catalog.filter(item => item.category === activeCategory).map(item => {
              const q = quantities[item.id] || 0;
              return (
                <div key={item.id} className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${q > 0 ? 'border-[#38BDF8] bg-[#F0F9FF]' : 'border-gray-100 bg-white hover:border-[#38BDF8]/50'}`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex-shrink-0 border border-gray-100 relative overflow-hidden">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base text-[#0F172A] leading-tight">{item.name}</h4>
                    <div className="text-[#0284C7] font-black text-sm sm:text-base mt-0.5">${item.price.toLocaleString('es-CL')}</div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-full p-1 border border-gray-200 flex-shrink-0">
                    <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Quitar ${item.name}`} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-gray-100 transition-colors disabled:opacity-30 active:scale-95" disabled={!q}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-black text-base text-[#0F172A]" aria-live="polite">{q}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Agregar ${item.name}`} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0284C7] flex items-center justify-center text-white hover:bg-[#38BDF8] transition-colors disabled:opacity-30 active:scale-95" disabled={q >= item.stock}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Form */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-xl md:text-2xl font-display font-bold text-[#0F172A] mb-4 md:mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#0284C7]" /> ¿Dónde lo llevamos?
          </h3>
          <div className="space-y-4 md:space-y-6">
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">Tu Nombre y Apellido</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={customer.name}
                  onChange={e => setCustomer({...customer, name: e.target.value})}
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-[#0284C7]/10 transition-all text-[#0F172A] font-medium"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono de Contacto</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={customer.phone}
                  onChange={e => {
                    let val = e.target.value;
                    if (!val.startsWith('+56 9 ')) val = '+56 9 ' + val.replace('+56 9 ', '');
                    setCustomer({...customer, phone: val});
                  }}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-[#0284C7]/10 transition-all text-[#0F172A] font-medium"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">Dirección de Entrega Exacta</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={customer.address}
                  onChange={e => setCustomer({...customer, address: e.target.value})}
                  placeholder="Ej. Valle Volcanes 1234, Puerto Montt"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-[#0284C7]/10 transition-all text-[#0F172A] font-medium"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">Información Adicional (Opcional)</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={customer.reference}
                  onChange={e => setCustomer({...customer, reference: e.target.value})}
                  placeholder="Ej. Casa de rejas negras, depto 402"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-[#0284C7]/10 transition-all text-[#0F172A] font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Summary */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#F0F9FF] border-2 border-[#E0F2FE] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0284C7] shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-[#0F172A] mb-2">¡Todo listo para pedir!</h3>
            <p className="text-gray-500">Revisa tu recibo antes de enviarlo al WhatsApp de reparto.</p>
          </div>
          
          <div className="bg-white rounded-2xl mb-6 border border-gray-200 shadow-sm relative overflow-hidden">
            {/* Ticket zig-zag decoration top/bottom could be added with CSS, we will keep it clean */}
            <div className="p-6 bg-gray-50/50">
              <h4 className="font-bold text-[#0F172A] mb-4 border-b-2 border-dashed border-gray-200 pb-3 text-sm uppercase tracking-widest text-center">Recibo de Pedido</h4>
              <ul className="space-y-4 mb-4">
                {catalog.map(item => {
                  const q = quantities[item.id];
                  if (!q) return null;
                  return (
                    <li key={item.id} className="flex justify-between items-center text-gray-700">
                      <span className="font-medium text-[#0F172A]"><span className="text-[#0284C7] font-black mr-2">{q}x</span> {item.name}</span>
                      <span className="font-bold text-[#0F172A]">${(item.price * q).toLocaleString('es-CL')}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="bg-[#0F172A] text-white p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center sm:items-baseline font-display gap-1 sm:gap-0">
              <span className="text-sm sm:text-lg text-gray-300 uppercase tracking-wider font-bold">Total a Pagar</span>
              <span className="text-4xl sm:text-3xl font-black text-[#38BDF8]">${calculateTotal().toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-[#0F172A] mb-3">¡Pedido Recibido!</h3>
          <p className="text-gray-500 mb-2 max-w-md">
            Tu pedido ha ingresado exitosamente a nuestro sistema y hemos notificado al área de preparación. 
          </p>
          <div className="bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg mb-8 border border-gray-200">
            Nº de Orden: <span className="font-bold text-[#0F172A]">#{createdOrderId?.toUpperCase()}</span>
          </div>

          <p className="text-gray-400 text-sm mb-4">¿Quieres agilizar la entrega?</p>
          <a 
            href={generateOrderMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#1DA851] transition-all shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.5)] active:scale-95 group w-full sm:w-auto text-center"
          >
            Avisar por WhatsApp <ShoppingCart className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )}

      {/* Footer Navigation */}
      <div className={`mt-8 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center border-t border-gray-100 pt-6 gap-4 sm:gap-0 ${step === 4 ? 'hidden' : ''}`}>
        {step > 1 && step < 4 ? (
          <button 
            onClick={() => setStep(step - 1)}
            className="text-gray-500 hover:text-[#0F172A] font-bold flex items-center justify-center sm:justify-start gap-1 transition-colors py-2 sm:py-0"
          >
            <ChevronLeft className="w-5 h-5" /> Volver atrás
          </button>
        ) : (
          <div className="flex items-baseline justify-between sm:justify-start gap-3 px-1">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{totalItems > 0 ? `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}` : 'Tu pedido'}</span>
            <span className="text-2xl font-display font-black text-[#0F172A]">${calculateTotal().toLocaleString('es-CL')}</span>
          </div>
        )}
        
        {step < 3 ? (
          <button 
            onClick={handleNext}
            disabled={step === 1 ? totalItems === 0 : !(customer.name && customer.address && customer.phone.length >= 12)}
            className="bg-[#0F172A] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#0284C7] transition-all disabled:opacity-30 shadow-md active:scale-95 w-full sm:w-auto"
          >
            Siguiente Paso <ChevronRight className="w-5 h-5" />
          </button>
        ) : step === 3 ? (
          <button 
            onClick={handleSubmitOrder}
            className="bg-[#0F172A] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#0284C7] transition-all shadow-md active:scale-95 w-full sm:w-auto"
          >
            Confirmar Pedido <CheckCircle className="w-5 h-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
