'use client';

import React, { useState } from 'react';
import { catalog } from '@/data/catalog';
import { ShoppingCart, MapPin, CheckCircle2, ChevronRight, ChevronLeft, Plus, Minus, User, Home, FileText } from 'lucide-react';
import Image from 'next/image';

export function OrderWizard() {
  const [step, setStep] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState({ name: '', address: '', reference: '' });

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
    if (step === 2 && customer.name && customer.address) setStep(3);
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
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0284C7] -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
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

      {/* Step 1: Products */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-xl md:text-2xl font-display font-bold text-[#0F172A] mb-4 md:mb-6 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#0284C7]" /> ¿Qué necesitas hoy?
          </h3>
          <div className="space-y-3 md:space-y-4">
            {catalog.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#38BDF8] hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)] transition-all group gap-4">
                <div className="flex items-center gap-3 sm:gap-5 flex-1 w-full sm:w-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 p-2 relative group-hover:bg-[#F0F9FF] transition-colors">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 64px, 80px" className="object-contain p-1 sm:p-2 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base sm:text-lg text-[#0F172A] group-hover:text-[#0284C7] transition-colors leading-tight">{item.name}</h4>
                    <div className="text-[#0284C7] font-black text-base sm:text-lg mt-0.5">${item.price.toLocaleString('es-CL')}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-full p-1.5 border border-gray-200 w-full sm:w-auto justify-between sm:justify-start">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-gray-100 transition-colors disabled:opacity-30 active:scale-95 flex-shrink-0" disabled={!quantities[item.id]}>
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="w-8 sm:w-6 text-center font-black text-lg sm:text-xl text-[#0F172A]">{quantities[item.id] || 0}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0284C7] shadow-md shadow-[#0284C7]/20 flex items-center justify-center text-white hover:bg-[#38BDF8] transition-colors active:scale-95 flex-shrink-0">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
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

      {/* Footer Navigation */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center border-t border-gray-100 pt-6 gap-4 sm:gap-0">
        {step > 1 ? (
          <button 
            onClick={() => setStep(step - 1)}
            className="text-gray-500 hover:text-[#0F172A] font-bold flex items-center justify-center sm:justify-start gap-1 transition-colors py-2 sm:py-0"
          >
            <ChevronLeft className="w-5 h-5" /> Volver atrás
          </button>
        ) : <div className="hidden sm:block"></div>}
        
        {step < 3 ? (
          <button 
            onClick={handleNext}
            disabled={step === 1 ? totalItems === 0 : !(customer.name && customer.address)}
            className="bg-[#0F172A] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#0284C7] transition-all disabled:opacity-30 shadow-md active:scale-95 w-full sm:w-auto"
          >
            Siguiente Paso <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <a 
            href={generateOrderMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#1DA851] transition-all shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.5)] active:scale-95 group w-full sm:w-auto text-center"
          >
            Enviar al WhatsApp <ShoppingCart className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
}
