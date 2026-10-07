'use client';

import React, { useEffect, useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, Truck, CheckCircle2, Package, Inbox, Trash2, ArrowRight, Plus, Edit2, Phone, Map } from 'lucide-react';
import Link from 'next/link';
import { OrderFormModal } from '@/components/admin/OrderFormModal';
import { Order } from '@/store/useOrderStore';

export default function AdminDashboard() {
  const [hydrated, setHydrated] = useState(false);
  const { orders, updateOrderStatus, clearOrders, deleteOrder } = useOrderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center"><div className="animate-pulse text-gray-400 font-bold">Cargando panel...</div></div>;

  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((acc, order) => acc + order.total, 0);
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const inProgressCount = orders.filter(o => ['preparing', 'on_the_way'].includes(o.status)).length;

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    preparing: 'bg-blue-100 text-blue-700 border-blue-200',
    ready_for_route: 'bg-orange-100 text-orange-700 border-orange-200',
    on_the_way: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    preparing: 'Preparando',
    ready_for_route: 'Listo P/ Ruta',
    on_the_way: 'En Camino',
    delivered: 'Entregado',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-4 h-4" />,
    preparing: <Package className="w-4 h-4" />,
    ready_for_route: <Map className="w-4 h-4" />,
    on_the_way: <Truck className="w-4 h-4" />,
    delivered: <CheckCircle2 className="w-4 h-4" />,
  };

  return (
    <div className="p-8 pb-24">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#0F172A] mb-1 tracking-tight">Resumen de Ventas</h1>
            <p className="text-gray-500">Monitorea y gestiona todos los pedidos entrantes en tiempo real.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setOrderToEdit(null); setIsModalOpen(true); }} className="text-sm text-white font-bold flex items-center gap-1.5 bg-[#0F172A] px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 hover:bg-gray-800">
              <Plus className="w-4 h-4"/> Nueva Venta Manual
            </button>
            <button onClick={clearOrders} className="text-sm text-red-500 hover:text-red-700 font-bold flex items-center gap-1 bg-red-50 px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 hover:bg-red-100">
              <Trash2 className="w-4 h-4"/> Limpiar Test
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-gray-200 transition-colors">
             <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Ingresos (Entregados)</div>
             <div className="text-3xl font-black text-[#0F172A]">${totalRevenue.toLocaleString('es-CL')}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-yellow-100 transition-colors flex items-center justify-between">
             <div>
               <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Nuevos Pedidos</div>
               <div className="text-3xl font-black text-yellow-600">{pendingCount}</div>
             </div>
             <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center ring-4 ring-yellow-50/50">
               <Clock className="w-6 h-6 text-yellow-500" />
             </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-blue-100 transition-colors flex items-center justify-between">
             <div>
               <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">En Proceso / Camino</div>
               <div className="text-3xl font-black text-blue-600">{inProgressCount}</div>
             </div>
             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center ring-4 ring-blue-50/50">
               <Package className="w-6 h-6 text-blue-500" />
             </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
             <h2 className="text-lg font-bold text-[#0F172A]">Registro de Pedidos</h2>
           </div>
           
           {orders.length === 0 ? (
             <div className="p-16 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-inner">
                   <Inbox className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No hay pedidos aún</h3>
                <p className="text-gray-500 max-w-md">Realiza un pedido de prueba en la tienda para ver cómo aparece instantáneamente aquí.</p>
                <Link href="/" className="mt-6 bg-[#0F172A] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-md active:scale-95">Ir a comprar</Link>
             </div>
           ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
                   <tr className="bg-gray-50/50 border-b border-gray-100">
                     <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[120px]">ID / Hora</th>
                     <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente & Dirección</th>
                     <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[150px]">Monto</th>
                     <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[150px]">Estado</th>
                     <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right w-[150px]">Acciones</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {orders.map((order) => (
                     <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                       <td className="py-5 px-6">
                         <div className="font-mono text-sm font-bold text-[#0F172A]">#{order.id.toUpperCase()}</div>
                         <div className="text-xs text-gray-400 mt-1 font-medium">{format(new Date(order.createdAt), "HH:mm", { locale: es })} hrs</div>
                       </td>
                       <td className="py-5 px-6">
                         <div className="font-bold text-[#0F172A] mb-0.5">{order.customerName}</div>
                         <div className="flex items-center gap-1 text-xs font-bold text-green-600 mb-1">
                           <Phone className="w-3 h-3" /> {order.phone}
                         </div>
                         <div className="text-sm text-gray-500 max-w-[250px] truncate" title={order.address}>{order.address}</div>
                         {order.reference && <div className="text-xs text-gray-400 mt-1 truncate">Ref: {order.reference}</div>}
                       </td>
                       <td className="py-5 px-6 font-black text-[#0F172A]">
                         ${order.total.toLocaleString('es-CL')}
                         <div className="text-xs font-medium text-gray-400 mt-1">{order.items.reduce((acc, i) => acc + i.quantity, 0)} bidones</div>
                       </td>
                       <td className="py-5 px-6">
                          <div className="flex flex-col gap-2 items-start">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusColors[order.status]} shadow-sm`}>
                              {statusIcons[order.status]} {statusLabels[order.status]}
                            </span>
                            
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${order.paymentStatus === 'Pagado' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                              {order.paymentStatus} {order.paymentMethod ? `(${order.paymentMethod})` : ''}
                            </span>
                          </div>
                       </td>
                       <td className="py-5 px-6 text-right">
                         {order.status === 'pending' && (
                           <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="inline-flex items-center gap-1.5 bg-[#0F172A] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95 group-hover:-translate-y-0.5">
                             Preparar <ArrowRight className="w-4 h-4" />
                           </button>
                         )}
                         {order.status === 'preparing' && (
                           <button onClick={() => updateOrderStatus(order.id, 'ready_for_route')} className="inline-flex items-center gap-1.5 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 active:scale-95 group-hover:-translate-y-0.5">
                             A Ruta <Map className="w-4 h-4" />
                           </button>
                         )}
                         {order.status === 'ready_for_route' && (
                           <Link href="/admin/rutas" className="inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-500 transition-colors">Organizar Ruta</Link>
                         )}
                         {order.status === 'on_the_way' && (
                           <span className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500">En ruta ({order.driverId || 'Repartidor'})</span>
                         )}
                         {order.status === 'delivered' && (
                           <span className="inline-flex items-center justify-end gap-1 px-3 py-1 bg-green-50 rounded-lg text-xs font-bold text-green-600"><CheckCircle2 className="w-4 h-4"/> Completado</span>
                         )}
                         
                         <div className="flex items-center justify-end gap-2 mt-3">
                           <button onClick={() => { setOrderToEdit(order); setIsModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar Pedido">
                             <Edit2 className="w-4 h-4" />
                           </button>
                           <button onClick={() => deleteOrder(order.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar Pedido">
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
        </div>
      
      <OrderFormModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setOrderToEdit(null); }} 
        orderToEdit={orderToEdit} 
      />
    </div>
  );
}
