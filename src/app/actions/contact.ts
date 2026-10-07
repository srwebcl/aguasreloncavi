'use server';

import { Resend } from 'resend';

type Field = 'name' | 'phone' | 'email' | 'message';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Record<string, string>;
};

const get = (formData: FormData, key: string) => String(formData.get(key) ?? '').trim();

export async function sendContactRequest(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot anti-spam: los bots completan este campo oculto.
  if (get(formData, 'company')) return { status: 'success' };

  const values = {
    name: get(formData, 'name'),
    phone: get(formData, 'phone'),
    email: get(formData, 'email'),
    location: get(formData, 'location'),
    service: get(formData, 'service'),
    message: get(formData, 'message'),
  };

  const errors: ContactState['errors'] = {};
  if (values.name.length < 2) errors.name = 'Ingresa tu nombre.';
  if (values.phone.replace(/\D/g, '').length < 8) errors.phone = 'Ingresa un teléfono válido.';
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'El correo no es válido.';
  if (values.message.length < 10) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).';
  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Revisa los campos marcados.', errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_DESTINATION;
  if (!apiKey || !to) {
    return { status: 'error', message: 'El formulario no está disponible en este momento. Escríbenos por WhatsApp.', values };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'Aguas Reloncaví Web <onboarding@resend.dev>',
      to,
      replyTo: values.email || undefined,
      subject: `Solicitud de servicio: ${values.service || 'Consulta general'} — ${values.name}`,
      text: [
        `Servicio: ${values.service || 'Consulta general'}`,
        `Nombre: ${values.name}`,
        `Teléfono: ${values.phone}`,
        `Correo: ${values.email || '—'}`,
        `Sector / comuna: ${values.location || '—'}`,
        '',
        values.message,
      ].join('\n'),
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error('[contact] Error enviando correo:', err);
    return { status: 'error', message: 'No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos por WhatsApp.', values };
  }

  return { status: 'success' };
}
