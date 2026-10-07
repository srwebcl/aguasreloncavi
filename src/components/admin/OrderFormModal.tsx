import React, { useState, useEffect } from 'react';
import { useOrderStore, Order, OrderStatus, PaymentStatus, PaymentMethod } from '@/store/useOrderStore';
import { useInventoryStore } from '@/store/useInventoryStore';
import { X, Plus, Minus, Save, User, MapPin, FileText, Phone } from 'lucide-react';
import Image from 'next/image';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderToEdit?: Order | null;
}

export function OrderFormModal({ isOpen, onClose, orderToEdit }: OrderFormModalProps) {
  const { products, decrementStock } = useInventoryStore();
  const { addOrder, updateOrder } = useOrderStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+56 9 ');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState<OrderStatus>('delivered');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('Pendiente');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) {
      if (orderToEdit) {
        setCustomerName(orderToEdit.customerName);
        setPhone(orderToEdit.phone || '+56 9 ');
        setAddress(orderToEdit.address);
        setReference(orderToEdit.reference || '');
        setStatus(orderToEdit.status);
        setPaymentStatus(orderToEdit.paymentStatus);
        setPaymentMethod(orderToEdit.paymentMethod || '');
        
        const initialQuantities: Record<string, number> = {};
        const initialPrices: Record<string, number> = {};
        orderToEdit.items.forEach(item => {
          initialQuantities[item.id] = item.quantity;
          initialPrices[item.id] = item.price;
        });
        setQuantities(initialQuantities);
        setCustomPrices(initialPrices);
      } else {
        setCustomerName('');
        setPhone('+56 9 ');
        setAddress('Venta en Local (Presencial)');
        setReference('');
        setStatus('delivered');
        setPaymentStatus('Pendiente');
        setPaymentMethod('');
        setQuantities({});
        
        const initialPrices: Record<string, number> = {};
        products.forEach(p => initialPrices[p.id] = p.price);
        setCustomPrices(initialPrices);
      }
    }
  }, [isOpen, orderToEdit]);

  if (!isOpen) return null;

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalAmount = products.reduce((total, p) => total + ((customPrices[p.id] || p.price) * (quantities[p.id] || 0)), 0);

  const handleSave = () => {
    if (totalItems === 0 || !customerName || !address || phone.length < 12) return;

    const itemsToSave = products
      .filter(p => (quantities[p.id] || 0) > 0)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: customPrices[p.id] || p.price,
        quantity: quantities[p.id]!
      }));

    if (orderToEdit) {
      updateOrder(orderToEdit.id, {
        customerName,
        phone,
        address,
        reference,
        status,
        paymentStatus,
        ...(paymentMethod ? { paymentMethod } : {}),
        items: itemsToSave,
        total: totalAmount
      });
    } else {
      addOrder({
        customerName,
        phone,
        address,
        reference,
        items: itemsToSave,
        total: totalAmount,
        status,
        paymentStatus,
        ...(paymentMethod ? { paymentMethod } : {})
      });

      // Rebajar stock en venta nueva
      itemsToSave.forEach(item => {
        decrementStock(item.id, item.quantity);
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-[#0F172A]">
            {orderToEdit ? 'Editar Pedido' : 'Registrar Nueva Venta'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Info del Cliente */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Datos del Cliente</h3>
              
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Nombre del Cliente"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={phone}
                  onChange={e => {
                    let val = e.target.value;
                    if (!val.startsWith('+56 9 ')) val = '+56 9 ' + val.replace('+56 9 ', '');
                    setPhone(val);
                  }}
                  placeholder="Teléfono de Contacto"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Dirección o Local"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm"
                />
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={reference}
                  onChange={e => setReference(e.target.value)}
                  placeholder="Referencia (Opcional)"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estado del Pedido</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as OrderStatus)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm font-bold cursor-pointer"
                  >
                    <option value="pending">Pendiente (Para despachar)</option>
                    <option value="preparing">Preparando</option>
                    <option value="ready_for_route">Listo para Ruta</option>
                    <option value="on_the_way">En Camino</option>
                    <option value="delivered">Entregado (Venta Presencial)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estado de Pago</label>
                  <select 
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm font-bold cursor-pointer"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                  </select>
                </div>
              </div>

              {paymentStatus === 'Pagado' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Medio de Pago</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#0284C7] focus:bg-white transition-all text-[#0F172A] text-sm font-bold cursor-pointer"
                  >
                    <option value="" disabled>Seleccione el medio de pago...</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta (Transbank)</option>
                  </select>
                </div>
              )}

            </div>

            {/* Productos */}
            <div className="space-y-4">
               <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Productos</h3>
               <div className="space-y-3">
                 {products.map(p => (
                   <div key={p.id} className="flex items-center justify-between bg-gray-50 border border-gray-100 p-3 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 relative overflow-hidden flex-shrink-0">
                          <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#0F172A] leading-tight">{p.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-gray-500 font-bold">$</span>
                            <input 
                              type="number" 
                              value={customPrices[p.id] !== undefined ? customPrices[p.id] : p.price}
                              onChange={e => setCustomPrices({...customPrices, [p.id]: Number(e.target.value)})}
                              className="text-xs text-blue-600 font-bold bg-transparent outline-none w-16 border-b border-dashed border-gray-300 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
                        <button onClick={() => handleQuantityChange(p.id, -1)} disabled={!quantities[p.id]} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{quantities[p.id] || 0}</span>
                        <button onClick={() => handleQuantityChange(p.id, 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total a cobrar</div>
            <div className="text-2xl font-black text-[#0F172A]">${totalAmount.toLocaleString('es-CL')}</div>
          </div>
          <button 
            onClick={handleSave}
            disabled={totalItems === 0 || !customerName || !address || phone.length < 12}
            className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {orderToEdit ? 'Guardar Cambios' : 'Crear Venta'}
          </button>
        </div>

      </div>
    </div>
  );
}
