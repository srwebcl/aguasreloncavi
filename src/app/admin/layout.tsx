'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, LayoutDashboard, LogOut, Navigation, Map } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center shadow-sm">
               <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-[#0F172A] tracking-tight">AdminPanel</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all active:scale-95 ${pathname === '/admin' ? 'bg-[#0F172A] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0F172A]'}`}>
            <LayoutDashboard className="w-5 h-5" />
            Ventas
          </Link>
          <Link href="/admin/inventario" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all active:scale-95 ${pathname === '/admin/inventario' ? 'bg-[#0F172A] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0F172A]'}`}>
            <Package className="w-5 h-5" />
            Inventario
          </Link>
          <Link href="/admin/rutas" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all active:scale-95 ${pathname === '/admin/rutas' ? 'bg-[#0F172A] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0F172A]'}`}>
            <Map className="w-5 h-5" />
            Org. Rutas
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
           <Link href="/repartidor" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors active:scale-95">
            <Navigation className="w-5 h-5" />
            Repartidor
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors active:scale-95">
            <LogOut className="w-5 h-5" />
            Ir a Tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
