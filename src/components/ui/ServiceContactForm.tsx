'use client';

import { useActionState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { sendContactRequest, type ContactState } from '@/app/actions/contact';
import { services } from '@/data/services';
import { generateGenericWhatsAppLink } from '@/utils/whatsapp';
import { cn } from '@/components/ui/Button';

const initialState: ContactState = { status: 'idle' };

const inputClass =
  'w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#0284C7] focus:bg-white focus:ring-4 focus:ring-[#0284C7]/10 transition-all text-[#0F172A] font-medium placeholder:text-gray-400';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-500 font-medium mt-1.5">{message}</p>;
}

export function ServiceContactForm({ defaultService }: { defaultService?: string }) {
  const [state, formAction, isPending] = useActionState(sendContactRequest, initialState);

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 animate-in" role="status">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-display font-bold text-[#0F172A] mb-3">¡Solicitud enviada!</h3>
        <p className="text-gray-500 max-w-sm mb-8">Un técnico te contactará a la brevedad. Si es urgente, escríbenos directamente por WhatsApp.</p>
        <a
          href={generateGenericWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-bold hover:bg-[#1DA851] transition-colors"
        >
          Ir a WhatsApp
        </a>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-bold text-gray-700 mb-2">Nombre *</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" defaultValue={v.name} placeholder="Ej. Juan Pérez" className={cn(inputClass, e.name && 'border-red-300')} aria-invalid={!!e.name} />
          <FieldError message={e.name} />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-bold text-gray-700 mb-2">Teléfono *</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="+56 9 1234 5678" className={cn(inputClass, e.phone && 'border-red-300')} aria-invalid={!!e.phone} />
          <FieldError message={e.phone} />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-bold text-gray-700 mb-2">Correo</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="tucorreo@ejemplo.cl" className={cn(inputClass, e.email && 'border-red-300')} aria-invalid={!!e.email} />
          <FieldError message={e.email} />
        </div>
        <div>
          <label htmlFor="cf-location" className="block text-sm font-bold text-gray-700 mb-2">Sector o comuna</label>
          <input id="cf-location" name="location" type="text" defaultValue={v.location} placeholder="Ej. Alerce, Puerto Varas" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-service" className="block text-sm font-bold text-gray-700 mb-2">Servicio de interés</label>
        <select id="cf-service" name="service" defaultValue={v.service ?? defaultService ?? ''} className={cn(inputClass, 'appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2720%27%20height=%2720%27%20fill=%27none%27%20stroke=%27%2364748b%27%20stroke-width=%272%27%3E%3Cpath%20d=%27M5%208l5%205%205-5%27/%3E%3C/svg%3E")] bg-no-repeat bg-[right_1rem_center] pr-12')}>
          <option value="">No estoy seguro / Consulta general</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>{service.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-bold text-gray-700 mb-2">¿Cómo podemos ayudarte? *</label>
        <textarea id="cf-message" name="message" rows={4} defaultValue={v.message} placeholder="Describe brevemente tu necesidad: tipo de propiedad, fuente de agua, problema detectado..." className={cn(inputClass, 'resize-none', e.message && 'border-red-300')} aria-invalid={!!e.message} />
        <FieldError message={e.message} />
      </div>

      {state.status === 'error' && state.message && (
        <p className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600" role="alert">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#0284C7] transition-colors disabled:opacity-60 active:scale-[0.99]"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        {isPending ? 'Enviando...' : 'Solicitar cotización'}
      </button>
      <p className="text-xs text-gray-400 text-center">Respondemos en horario hábil. Tus datos solo se usan para contactarte.</p>
    </form>
  );
}
