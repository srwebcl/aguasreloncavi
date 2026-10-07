'use client';

import React, { useState, useEffect } from 'react';
import { useOrderStore, Order } from '@/store/useOrderStore';
import { Map, Truck, ChevronUp, ChevronDown, Plus, Minus, User, Send, Navigation, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const DRIVERS = ['Repartidor 1 (Carlos)', 'Repartidor 2 (Luis)', 'Repartidor 3 (María)'];

export default function RutasPage() {
  const [hydrated, setHydrated] = useState(false);
  const { orders, updateOrder } = useOrderStore();
  const [selectedDriver, setSelectedDriver] = useState(DRIVERS[0]);
  
  // Local state for the current route being built
  const [routeOrders, setRouteOrders] = useState<Order[]>([]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div className="p-8">Cargando...</div>;

  const unassignedOrders = orders.filter(o => o.status === 'ready_for_route' && !routeOrders.find(r => r.id === o.id));

  const addToRoute = (order: Order) => {
    setRouteOrders([...routeOrders, order]);
  };

  const removeFromRoute = (orderId: string) => {
    setRouteOrders(routeOrders.filter(o => o.id !== orderId));
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newOrders = [...routeOrders];
      const temp = newOrders[index];
      newOrders[index] = newOrders[index - 1];
      newOrders[index - 1] = temp;
      setRouteOrders(newOrders);
    } else if (direction === 'down' && index < routeOrders.length - 1) {
      const newOrders = [...routeOrders];
      const temp = newOrders[index];
      newOrders[index] = newOrders[index + 1];
      newOrders[index + 1] = temp;
      setRouteOrders(newOrders);
    }
  };

  const handleDispatch = () => {
    routeOrders.forEach((order, index) => {
      updateOrder(order.id, {
        status: 'on_the_way',
        driverId: selectedDriver,
        routeIndex: index,
      });
    });
    setRouteOrders([]);
  };

  return (
    <div className="p-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[#0F172A] mb-1 tracking-tight flex items-center gap-3">
          <Map className="w-8 h-8 text-orange-500" /> Organizador de Rutas
        </h1>
        <p className="text-gray-500">Asigna pedidos a los repartidores y ordena su ruta para maximizar la eficiencia.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Unassigned Orders */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col h-[70vh]">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              Pedidos Listos para Ruta
              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">{unassignedOrders.length}</span>
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
            {unassignedOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-medium">No hay pedidos esperando asignación.</div>
            ) : (
              unassignedOrders.map(order => (
                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group hover:border-blue-200 transition-colors">
                  <div>
                    <div className="font-bold text-[#0F172A]">{order.customerName}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-gray-400" /> {order.address}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{order.items.reduce((a, b) => a + b.quantity, 0)} bidones - {format(new Date(order.createdAt), "HH:mm", { locale: es })} hrs</div>
                  </div>
                  <button 
                    onClick={() => addToRoute(order)}
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex-shrink-0"
                    title="Agregar a la ruta"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Route Builder */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-200 flex flex-col h-[70vh] border-t-4 border-t-blue-500">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" /> Ruta de Despacho
              </h2>
            </div>
            
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm font-bold cursor-pointer"
              >
                {DRIVERS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-blue-50/10 relative">
            {routeOrders.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <div className="w-16 h-16 border-2 border-dashed border-gray-200 rounded-full flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-gray-300" />
                </div>
                <p className="font-medium">Agrega pedidos desde el panel izquierdo para armar la ruta.</p>
              </div>
            ) : (
              routeOrders.map((order, index) => (
                <div key={order.id} className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 flex items-center gap-3 animate-in slide-in-from-left-4">
                  
                  {/* Order / Reorder controls */}
                  <div className="flex flex-col items-center gap-1">
                    <button 
                      onClick={() => moveOrder(index, 'up')} 
                      disabled={index === 0}
                      className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <button 
                      onClick={() => moveOrder(index, 'down')}
                      disabled={index === routeOrders.length - 1}
                      className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-bold text-[#0F172A]">{order.customerName}</div>
                    <div className="text-sm text-gray-500 truncate">{order.address}</div>
                  </div>

                  <button 
                    onClick={() => removeFromRoute(order.id)}
                    className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-95 flex-shrink-0"
                    title="Quitar de la ruta"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button 
              onClick={handleDispatch}
              disabled={routeOrders.length === 0}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <Send className="w-5 h-5" /> 
              Despachar Ruta a {selectedDriver.split(' ')[0]}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
