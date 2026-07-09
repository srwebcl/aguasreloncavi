export function generateWhatsAppLink(productName: string, quantity: number = 1): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56981465007';
  const text = `Hola Aguas Reloncaví, me gustaría pedir ${quantity}x ${productName}. ¿Cuál es el proceso a seguir?`;
  
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function generateGenericWhatsAppLink(): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56981465007';
  const text = 'Hola Aguas Reloncaví, necesito información sobre el reparto de agua purificada.';
  
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
