import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OrderStatus = 'pending' | 'preparing' | 'ready_for_route' | 'on_the_way' | 'delivered';
export type PaymentMethod = 'Transferencia' | 'Efectivo' | 'Tarjeta';
export type PaymentStatus = 'Pendiente' | 'Pagado';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  reference?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentStatus: PaymentStatus;
  driverId?: string;
  routeIndex?: number;
  createdAt: string; 
}

const dummyOrders: Order[] = [
  {
    id: 'a1b2c3d',
    customerName: 'Juan Pérez',
    phone: '+56 9 8765 4321',
    address: 'Valle Volcanes 1234, Puerto Montt',
    items: [{ id: 'recarga-20l', name: 'Recarga 20 LT', price: 3600, quantity: 2 }],
    total: 7200,
    status: 'pending',
    paymentStatus: 'Pendiente',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'e4f5g6h',
    customerName: 'María González',
    phone: '+56 9 1234 5678',
    address: 'Alerce Sur, Pasaje Los Pinos 44',
    reference: 'Casa roja con reja negra',
    items: [
      { id: 'pack-3x20l-dispensador', name: '3 Botellones 20 LT + Dispensador Plástico', price: 25000, quantity: 1 }
    ],
    total: 25000,
    status: 'preparing',
    paymentStatus: 'Pagado',
    paymentMethod: 'Transferencia',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'i7j8k9l',
    customerName: 'Carlos Soto',
    phone: '+56 9 9988 7766',
    address: 'Centro, Urmeneta 234',
    items: [{ id: 'recarga-20l', name: 'Recarga 20 LT', price: 3600, quantity: 5 }],
    total: 18000,
    status: 'on_the_way',
    paymentStatus: 'Pendiente',
    driverId: 'Repartidor 1',
    routeIndex: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 'm0n1o2p',
    customerName: 'Constructora SUR',
    phone: '+56 9 1122 3344',
    address: 'Ruta 5 Sur Km 1024',
    items: [{ id: 'recarga-20l', name: 'Recarga 20 LT', price: 3600, quantity: 10 }],
    total: 36000,
    status: 'delivered',
    paymentStatus: 'Pagado',
    paymentMethod: 'Efectivo',
    driverId: 'Repartidor 1',
    routeIndex: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'q3r4s5t',
    customerName: 'Ana Sepúlveda',
    phone: '+56 9 5544 3322',
    address: 'Mirador de la Bahía, Depto 402',
    items: [
      { id: 'recarga-10l', name: 'Recarga 10 LT', price: 2100, quantity: 1 },
      { id: 'pack-2x10l-bomba-usb', name: '2 Botellones 10 LT + Bomba USB', price: 15990, quantity: 1 }
    ],
    total: 18090,
    status: 'on_the_way',
    paymentStatus: 'Pendiente',
    driverId: 'Repartidor 1',
    routeIndex: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  }
];

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt' | 'paymentStatus'> & { status?: OrderStatus, paymentStatus?: PaymentStatus }) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrder: (id: string, updatedFields: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: dummyOrders,
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          status: orderData.status || 'pending',
          paymentStatus: orderData.paymentStatus || 'Pendiente',
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder.id;
      },
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        }));
      },
      updateOrder: (id, updatedFields) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updatedFields } : order
          ),
        }));
      },
      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }));
      },
      clearOrders: () => set({ orders: dummyOrders }),
    }),
    {
      name: 'aguas-reloncavi-orders',
    }
  )
);
