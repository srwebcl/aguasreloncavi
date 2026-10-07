'use client';

import React, { useEffect, useState } from 'react';
import { useOrderStore, PaymentMethod } from '@/store/useOrderStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MapPin, CheckCircle2, Navigation, Package, User, ArrowLeft, Banknote, CreditCard, Smartphone } from 'lucide-react';
import Link from 'next/link';

const DRIVERS = ['Repartidor 1 (Carlos)', 'Repartidor 2 (Luis)', 'Repartidor 3 (María)'];

export default function DriverDashboard() {
  const [hydrated, setHydrated] = useState(false);
  const { orders, updateOrder } = useOrderStore();
  const [selectedDriver, setSelectedDriver] = useState(DRIVERS[0]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center"><div className="animate-pulse text-gray-400 font-bold">Cargando rutas...</div></div>;

  const activeOrders = orders
    .filter(o => o.status === 'on_the_way' && o.driverId === selectedDriver)
    .sort((a, b) => (a.routeIndex || 0) - (b.routeIndex || 0));

  const deliveredToday = orders.filter(o => o.status === 'delivered' && o.driverId === selectedDriver).length;

  const openGoogleMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  const handleDeliver = (orderId: string, paymentMethod: PaymentMethod | null) => {
    if (paymentMethod) {
      updateOrder(orderId, { status: 'delivered', paymentStatus: 'Pagado', paymentMethod });
    } else {
      updateOrder(orderId, { status: 'delivered' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-24">
      {/* Header */}
      <div className="bg-[#0F172A] text-white pt-12 pb-6 px-6 rounded-b-[2rem] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top right, #38BDF8 0%, transparent 60%)' }}></div>
        <div className="flex justify-between items-start relative z-10 mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold mb-1">Mis Rutas</h1>
            <p className="text-gray-400 text-sm">Entregas pendientes de hoy.</p>
          </div>
          <Link href="/admin" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="relative z-10">
           <select 
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 outline-none focus:border-white/50 transition-all text-sm font-bold appearance-none"
           >
             {DRIVERS.map(d => <option key={d} value={d} className="text-black">{d}</option>)}
           </select>
        </div>

        <div className="mt-6 flex gap-4 relative z-10">
          <div className="bg-white/10 rounded-2xl p-4 flex-1 backdrop-blur-sm border border-white/10">
            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Pendientes</div>
            <div className="text-2xl font-black">{activeOrders.length}</div>
          </div>
          <div className="bg-[#25D366]/20 rounded-2xl p-4 flex-1 backdrop-blur-sm border border-[#25D366]/30">
            <div className="text-[#25D366] text-xs font-bold uppercase tracking-wider mb-1">Completados</div>
            <div className="text-2xl font-black text-[#25D366]">{deliveredToday}</div>
          </div>
        </div>
      </div>

      <main className="px-4 py-6 -mt-4 relative z-20">
        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] mt-4 border border-gray-100">
             <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
             </div>
             <h3 className="text-xl font-bold text-[#0F172A] mb-2">¡Ruta Completada!</h3>
             <p className="text-gray-500 text-sm">No tienes más entregas asignadas por el momento.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order, index) => (
              <div key={order.id} className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-black">{index + 1}</span>
                    <span className="font-mono text-xs font-bold text-gray-400">#{order.id.toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-50 rounded-lg text-gray-500 border border-gray-200">{format(new Date(order.createdAt), "HH:mm", { locale: es })}</span>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-[#0F172A] text-lg mb-1 flex items-center gap-2"><User className="w-4 h-4 text-gray-400"/> {order.customerName}</h3>
                  <p className="text-gray-600 text-sm flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"/> 
                    <span>
                      {order.address}
                      {order.reference && <span className="block text-gray-400 text-xs mt-1 italic">Ref: {order.reference}</span>}
                    </span>
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Package className="w-3 h-3"/> Productos a entregar</div>
                  <ul className="space-y-2">
                    {order.items.map(item => (
                      <li key={item.id} className="flex justify-between text-sm font-medium text-[#0F172A]">
                        <span><span className="text-[#0284C7] font-black mr-1">{item.quantity}x</span> {item.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400">Total a cobrar</span>
                    <span className="font-black text-[#0F172A]">${order.total.toLocaleString('es-CL')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => openGoogleMaps(order.address)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-transform"
                  >
                    <Navigation className="w-4 h-4" /> Navegar a Destino
                  </button>
                  
                  {order.paymentStatus === 'Pagado' ? (
                     <button 
                      onClick={() => handleDeliver(order.id, null)}
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-green-600/20 active:scale-95 transition-transform"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Entregado (Ya Pagado)
                    </button>
                  ) : (
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-xs font-bold text-gray-400 text-center uppercase tracking-wider mb-2">Cobrar y Entregar</div>
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          onClick={() => handleDeliver(order.id, 'Efectivo')}
                          className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-700 hover:text-green-700 font-bold py-3 rounded-xl text-xs active:scale-95 transition-all"
                        >
                          <Banknote className="w-5 h-5" /> Efectivo
                        </button>
                        <button 
                          onClick={() => handleDeliver(order.id, 'Transferencia')}
                          className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-bold py-3 rounded-xl text-xs active:scale-95 transition-all"
                        >
                          <Smartphone className="w-5 h-5" /> Transf.
                        </button>
                        <button 
                          onClick={() => handleDeliver(order.id, 'Tarjeta')}
                          className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 hover:border-purple-500 hover:bg-purple-50 text-gray-700 hover:text-purple-700 font-bold py-3 rounded-xl text-xs active:scale-95 transition-all"
                        >
                          <CreditCard className="w-5 h-5" /> Tarjeta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
