import Image from 'next/image';
import { catalog } from '@/data/catalog';
import { CatalogCard } from '@/components/ui/CatalogCard';
import { generateGenericWhatsAppLink } from '@/utils/whatsapp';
import { Droplets, ShieldCheck, Truck, Star } from 'lucide-react';
import { OrderWizard } from '@/components/ui/OrderWizard';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-16 pb-64 overflow-hidden flex flex-col items-center justify-start min-h-[80vh]">
        <div className="absolute inset-0 -z-10 bg-white">
           <Image src="/images/truck2.jpeg" alt="Reparto de agua" fill sizes="100vw" className="object-cover" priority />
           <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] from-40% via-[#0F172A]/80 via-60% to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 text-center w-full relative z-10 mt-2 md:mt-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm mb-8 animate-fade-in-up uppercase tracking-wider sm:tracking-widest shadow-2xl whitespace-nowrap">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> Repartos en todo Puerto Montt
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight mx-auto">
            El agua más pura del sur,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#E0F2FE]">directo en tu puerta.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-medium drop-shadow-md">
            Pide hoy, recíbelo hoy. Bidones de 25L libres de sodio con un servicio express en el que puedes confiar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <a 
              href="#pedido"
              className="bg-[#38BDF8] text-[#0F172A] px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:-translate-y-1 w-full sm:w-auto"
            >
              Hacer Pedido Ahora
            </a>
            <a 
              href="#catalogo"
              className="bg-transparent text-white border-2 border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:border-white hover:bg-white hover:text-[#0F172A] transition-all w-full sm:w-auto"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      </section>

      {/* Pedido Online Section */}
      <section id="pedido" className="pt-16 pb-24 bg-gradient-to-b from-gray-50 to-white relative border-t-4 border-[#38BDF8] overflow-hidden -mt-20 z-20 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] scroll-mt-32">
        {/* Floating bidon image as decoration */}
        <div className="absolute -left-20 top-40 w-72 h-[30rem] opacity-[0.04] rotate-12 -z-0 pointer-events-none hidden md:block">
           <Image src="/images/bidon.png" alt="Bidón" fill sizes="256px" className="object-contain" />
        </div>
        <div className="absolute -right-20 bottom-0 w-72 h-[30rem] opacity-[0.04] -rotate-12 -z-0 pointer-events-none hidden md:block">
           <Image src="/images/bidon.png" alt="Bidón" fill sizes="256px" className="object-contain" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
           <div className="text-center mb-12">
            <span className="text-[#0284C7] font-bold tracking-widest uppercase text-sm mb-2 block">100% Garantizado</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0F172A] mb-4">Haz tu pedido online</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Rápido, sin fricciones y directo al WhatsApp de reparto.</p>
          </div>
          <OrderWizard />
        </div>
      </section>

      {/* Proceso de Purificación - Carousel */}
      <section id="proceso" className="py-24 bg-[#0F172A] relative overflow-hidden text-white scroll-mt-32">
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full">
            <Image src="/images/hero2.jpeg" alt="Planta" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">No es solo agua, es salud.</h2>
            <p className="text-xl text-gray-400">Un proceso de purificación avanzado para llevar lo mejor a tu mesa.</p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
            {/* Carousel Item 1 */}
            <div className="snap-start shrink-0 w-[85vw] md:w-[400px] bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/15 transition-colors">
              <div className="w-16 h-16 bg-[#0284C7] rounded-2xl flex items-center justify-center shadow-lg text-white mb-8">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Ósmosis Inversa</h3>
              <p className="text-gray-300 text-lg">Múltiples etapas de filtración que remueven metales pesados, sarro e impurezas a nivel molecular.</p>
            </div>
            
            {/* Carousel Item 2 */}
            <div className="snap-start shrink-0 w-[85vw] md:w-[400px] bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/15 transition-colors">
              <div className="w-16 h-16 bg-[#0284C7] rounded-2xl flex items-center justify-center shadow-lg text-white mb-8">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Libre de Sodio</h3>
              <p className="text-gray-300 text-lg">Procesamos el agua para que sea 100% libre de sodio. Ideal para proteger tu corazón y el de tu familia.</p>
            </div>
            
            {/* Carousel Item 3 */}
            <div className="snap-start shrink-0 w-[85vw] md:w-[400px] bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/15 transition-colors">
              <div className="w-16 h-16 bg-[#0284C7] rounded-2xl flex items-center justify-center shadow-lg text-white mb-8">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Reparto Express</h3>
              <p className="text-gray-300 text-lg">Camiones en ruta constante por todo Puerto Montt para que nunca te falte agua pura en casa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="py-24 bg-[#F8FAFC] relative scroll-mt-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0F172A] mb-4">Nuestros Productos</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Selecciona tu producto y agrégalo en el formulario de arriba.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.map((product) => (
              <div key={product.id} className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white border border-gray-100">
                <CatalogCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios - Formato Revista / Pro */}
      <section id="testimonios" className="py-32 bg-white relative overflow-hidden scroll-mt-32">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full">
             <Image src="/images/truck1.jpeg" alt="Reparto" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-[0.03]" />
             <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:bg-gradient-to-l md:from-transparent md:to-white" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <h2 className="text-4xl lg:text-5xl font-display font-black text-[#0F172A] leading-tight mb-6 lg:mb-8">
                Las familias de <span className="text-[#0284C7]">Puerto Montt</span> nos prefieren.
              </h2>
              <div className="flex justify-center lg:justify-start gap-1 lg:gap-2 text-yellow-400 mb-6 lg:mb-8">
                <Star className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
                <Star className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
                <Star className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
                <Star className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
                <Star className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
              </div>
              <blockquote className="text-lg lg:text-xl text-gray-700 font-medium leading-relaxed italic mb-8 border-l-0 lg:border-l-4 border-transparent lg:border-[#0284C7] pl-0 lg:pl-6 relative">
                <span className="lg:hidden block text-6xl text-[#0284C7]/20 absolute -top-6 left-1/2 -translate-x-1/2">"</span>
                <span className="relative z-10">"Cambió el sabor del té y el café en la casa. Se nota la diferencia al ser libre de sodio. El reparto a Valle Volcanes es súper puntual, no los cambio por nada."</span>
              </blockquote>
              <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
                 <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center text-white font-bold text-lg">MJ</div>
                 <div className="text-center lg:text-left">
                    <div className="font-bold text-[#0F172A]">María José S.</div>
                    <div className="text-sm text-gray-500">Valle Volcanes</div>
                 </div>
              </div>
            </div>
            
            <div className="h-[500px] overflow-hidden relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                <div className="animate-marquee-vertical pt-4">
                    {/* Testimonial List (Duplicated for infinite scroll) */}
                    {[1, 2].map((loop) => (
                      <div key={loop} className="space-y-6 pb-6">
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all mx-4">
                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                "Excelente servicio, los bidones siempre llegan impecables y sellados. Atención rápida por WhatsApp, algo que se valora mucho hoy en día."
                            </p>
                            <div className="font-bold text-[#0F172A]">Carlos M. <span className="text-gray-400 font-normal ml-2">Alerce Histórico</span></div>
                        </div>
                        <div className="bg-[#0284C7] p-8 rounded-3xl shadow-xl text-white mx-4">
                            <p className="text-white/90 text-lg mb-6 leading-relaxed">
                                "Compramos la promo de 2 bidones + dispensador y fue la mejor inversión. Agua fresca siempre."
                            </p>
                            <div className="font-bold">Familia Soto <span className="text-[#bae6fd] font-normal ml-2">Puerta Sur</span></div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all mx-4">
                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                "El repartidor es súper amable, llega siempre el día acordado. Llevamos 2 años pidiendo con ellos."
                            </p>
                            <div className="font-bold text-[#0F172A]">Andrea V. <span className="text-gray-400 font-normal ml-2">Cardonal</span></div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all mx-4">
                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                "Sufro de hipertensión y que el agua sea estrictamente sin sodio me dio mucha tranquilidad. Recomendado."
                            </p>
                            <div className="font-bold text-[#0F172A]">Felipe R. <span className="text-gray-400 font-normal ml-2">Mirador de la Bahía</span></div>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
