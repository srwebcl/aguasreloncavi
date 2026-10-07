'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { services } from '@/data/services';
import { generateGenericWhatsAppLink } from '@/utils/whatsapp';

const PHONE_DISPLAY = '+56 9 8146 5007';
const PHONE_HREF = 'tel:+56981465007';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Servicios', href: '/servicios', hasMenu: true },
  { name: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Bloquea el scroll del body con el menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Sombra al hacer scroll (el header permanece siempre visible)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra menús con Escape y al pasar a escritorio
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 150);
  };
  const closeAll = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const isActive = (link: (typeof navLinks)[number]) =>
    link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

  const linkClass = (active: boolean) =>
    `relative py-2 text-[13px] font-bold tracking-wide uppercase transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-[#0284C7] after:transition-transform after:duration-300 ${active ? 'text-[#0284C7] after:scale-x-100' : 'text-[#0F172A] hover:text-[#0284C7] after:scale-x-0 hover:after:scale-x-100'}`;

  return (
    <>
      <header
        className={`sticky top-0 z-[60] w-full transition-[background-color,box-shadow,border-color] duration-300 border-b ${isScrolled || isMenuOpen ? 'bg-white/85 backdrop-blur-xl border-gray-200/70 shadow-[0_8px_30px_rgba(15,23,42,0.06)]' : 'bg-white border-transparent'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 h-[72px] lg:h-20 flex items-center justify-between gap-6">
          <Link href="/" onClick={closeAll} className="flex items-center gap-2.5 group shrink-0" aria-label="Aguas Reloncaví, ir al inicio">
            <Image src="/favicon.webp" alt="" width={44} height={44} priority className="w-10 h-10 lg:w-11 lg:h-11 object-contain group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-xl sm:text-2xl text-[#00509E] tracking-tighter">Aguas Reloncaví</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8 xl:gap-10 items-center" aria-label="Principal">
            {navLinks.map(link =>
              link.hasMenu ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                  onFocus={openServices}
                  onBlur={e => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) closeServices();
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsServicesOpen(o => !o)}
                    className={`flex items-center gap-1 ${linkClass(isActive(link))}`}
                    aria-haspopup="true"
                    aria-expanded={isServicesOpen}
                    aria-controls="services-menu"
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega menú */}
                  <div
                    id="services-menu"
                    className={`absolute left-1/2 top-full pt-4 w-[760px] -translate-x-1/2 transition-[opacity,transform,visibility] duration-300 ${isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}
                  >
                    <div className="rounded-3xl bg-white border border-gray-100 shadow-[0_30px_80px_rgba(15,23,42,0.18)] grid grid-cols-[1fr_220px] overflow-hidden">
                      <div className="p-3 grid grid-cols-2 gap-1">
                        {services.map(service => (
                          <Link
                            key={service.slug}
                            href={`/servicios/${service.slug}`}
                            onClick={closeAll}
                            className={`group/item flex items-start gap-3 rounded-2xl p-3 transition-colors ${pathname === `/servicios/${service.slug}` ? 'bg-[#F0F9FF]' : 'hover:bg-[#F0F9FF]'}`}
                          >
                            <span className="w-10 h-10 shrink-0 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover/item:bg-[#0284C7] group-hover/item:text-white transition-colors">
                              <service.icon className="w-5 h-5" />
                            </span>
                            <span>
                              <span className="block text-sm font-bold text-[#0F172A] leading-snug">{service.shortTitle}</span>
                              <span className="block text-xs text-gray-500 leading-snug mt-0.5 line-clamp-2">{service.summary}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="relative bg-[#0F172A] text-white p-6 flex flex-col justify-between overflow-hidden noise">
                        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#0284C7]/40 blur-2xl" />
                        <div className="relative z-10">
                          <div className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] mb-2">Asesoría</div>
                          <p className="font-display font-bold text-lg leading-snug">¿No sabes qué servicio necesitas?</p>
                          <p className="text-sm text-gray-400 mt-2">Te orientamos sin costo.</p>
                        </div>
                        <div className="relative z-10 space-y-2 mt-6">
                          <Link href="/contacto" onClick={closeAll} className="flex items-center justify-between rounded-xl bg-white text-[#0F172A] px-4 py-2.5 text-sm font-bold hover:bg-[#38BDF8] transition-colors">
                            Cotizar <ArrowRight className="w-4 h-4" />
                          </Link>
                          <a href={generateGenericWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-white/20 px-4 py-2.5 text-sm font-bold hover:bg-white/10 transition-colors">
                            WhatsApp <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.name} href={link.href} onClick={closeAll} className={linkClass(isActive(link))}>
                  {link.name}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a href={PHONE_HREF} className="hidden xl:flex items-center gap-2 text-sm font-bold text-[#0F172A] hover:text-[#0284C7] transition-colors">
              <Phone className="w-4 h-4 text-[#0284C7]" /> {PHONE_DISPLAY}
            </a>
            <Link href="/pedido" onClick={closeAll} className="bg-[#003B73] text-white px-6 py-3 rounded-full font-bold text-[13px] tracking-wide uppercase hover:bg-[#0284C7] transition-all shadow-lg shadow-[#003B73]/20 hover:-translate-y-0.5">
              Haz tu Pedido
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <a href={PHONE_HREF} className="p-2.5 text-[#0284C7]" aria-label={`Llamar al ${PHONE_DISPLAY}`}>
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              className="p-2 -mr-2 text-[#0F172A]"
              onClick={() => setIsMenuOpen(o => !o)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu: panel bajo el header, por encima del botón flotante de WhatsApp */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[72px] bottom-0 z-[55] bg-white lg:hidden transition-[opacity,visibility] duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="h-full overflow-y-auto overscroll-contain flex flex-col">
          <nav className="px-6 pt-4 flex-1" aria-label="Menú móvil">
            <ul className="divide-y divide-gray-100">
              {navLinks.map((link, index) => (
                <li
                  key={link.name}
                  className="transition-[opacity,transform] duration-400"
                  style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms', transform: isMenuOpen ? 'none' : 'translateY(12px)', opacity: isMenuOpen ? 1 : 0 }}
                >
                  {link.hasMenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsMobileServicesOpen(o => !o)}
                        className={`w-full flex items-center justify-between py-5 text-2xl font-display font-bold ${isActive(link) ? 'text-[#0284C7]' : 'text-[#0F172A]'}`}
                        aria-expanded={isMobileServicesOpen}
                      >
                        {link.name}
                        <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isMobileServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="grid grid-cols-1 gap-1 pb-5">
                            {services.map(service => (
                              <Link
                                key={service.slug}
                                href={`/servicios/${service.slug}`}
                                onClick={closeAll}
                                tabIndex={isMobileServicesOpen ? 0 : -1}
                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors ${pathname === `/servicios/${service.slug}` ? 'bg-[#F0F9FF] text-[#0284C7]' : 'text-[#0F172A] hover:bg-gray-50'}`}
                              >
                                <span className="w-9 h-9 shrink-0 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                                  <service.icon className="w-[18px] h-[18px]" />
                                </span>
                                {service.shortTitle}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeAll}
                      className={`flex items-center justify-between py-5 text-2xl font-display font-bold ${isActive(link) ? 'text-[#0284C7]' : 'text-[#0F172A]'}`}
                    >
                      {link.name}
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="p-6 pt-4 space-y-3 border-t border-gray-100 bg-[#F8FAFC] transition-[opacity,transform] duration-400"
            style={{ transitionDelay: isMenuOpen ? '220ms' : '0ms', transform: isMenuOpen ? 'none' : 'translateY(12px)', opacity: isMenuOpen ? 1 : 0 }}
          >
            <Link
              href="/pedido"
              onClick={closeAll}
              className="block w-full bg-[#003B73] text-white py-4 rounded-full font-bold text-lg tracking-wide uppercase text-center hover:bg-[#0284C7] transition-colors shadow-lg active:scale-[0.98]"
            >
              Haz tu Pedido
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={generateGenericWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white py-3 font-bold active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white text-[#0F172A] py-3 font-bold active:scale-[0.98]">
                <Phone className="w-5 h-5" /> Llamar
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
