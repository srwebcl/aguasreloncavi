import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { Camera } from 'lucide-react';
import { cn } from '@/components/ui/Button';

interface ImageSlotProps {
  src?: string;
  alt: string;
  icon?: LucideIcon;
  /** Indica qué fotografía corresponde a este espacio (visible solo en desarrollo). */
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

// Espacio de imagen: muestra la foto si existe; si no, un visual de marca listo para ser reemplazado.
export function ImageSlot({ src, alt, icon: Icon, caption, sizes = '100vw', priority, className, imageClassName }: ImageSlotProps) {
  return (
    <div className={cn('relative overflow-hidden bg-[#0F172A]', className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn('object-cover', imageClassName)} />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#003B73] via-[#0369A1] to-[#38BDF8]" role="img" aria-label={alt}>
          <div className="absolute -top-1/3 -right-1/4 w-3/4 aspect-square rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-1/3 -left-1/4 w-2/3 aspect-square rounded-full bg-[#0F172A]/30 blur-2xl" />
          <svg className="absolute bottom-0 left-0 w-full h-1/3 text-white/10" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40 C 80 10, 160 70, 240 40 S 360 10, 400 35 L400 100 L0 100 Z" fill="currentColor" />
            <path d="M0 65 C 100 40, 180 90, 280 60 S 380 45, 400 60 L400 100 L0 100 Z" fill="currentColor" />
          </svg>
          {Icon && (
            <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 max-w-28 max-h-28 text-white/25" strokeWidth={1.25} />
          )}
          {process.env.NODE_ENV === 'development' && caption && (
            <span className="absolute left-3 bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/40 bg-black/20 px-2.5 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
              <Camera className="w-3.5 h-3.5 shrink-0" /> Foto: {caption}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
