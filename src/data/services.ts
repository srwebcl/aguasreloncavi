import type { LucideIcon } from 'lucide-react';
import { Droplets, Gauge, Drill, Network, Waves } from 'lucide-react';

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  /** Foto principal del servicio. Si falta, se muestra un visual de marca. */
  heroImage?: string;
  /** Espacios para fotos de trabajos realizados (src opcional, caption orienta qué foto va). */
  gallery: { src?: string; caption: string }[];
  summary: string;
  description: string[];
  benefits: { title: string; description: string }[];
  steps: string[];
};

export const services: Service[] = [
  {
    slug: 'tratamiento-agua-potable',
    title: 'Tratamiento de agua potable',
    shortTitle: 'Tratamiento de agua',
    icon: Droplets,
    gallery: [
      { caption: 'Sistema de tratamiento instalado' },
      { caption: 'Análisis de parámetros del agua' },
      { caption: 'Equipo de remoción de hierro y manganeso' },
    ],
    summary: 'Diagnóstico y tratamiento de tu fuente de agua: eliminamos sedimentos, hierro, manganeso, turbiedad y corregimos pH y dureza para un agua segura y de excelente sabor.',
    description: [
      'Si tu agua presenta color, mal olor, manchas en artefactos o sabor metálico, existe una solución. Analizamos los parámetros críticos de tu fuente y diseñamos el tratamiento que corrige el problema de raíz: filtración, desinfección, ablandamiento, corrección de pH u ósmosis inversa.',
      'Atendemos hogares, empresas, parcelas y sistemas de agua potable rural (APR) del sur de Chile, con equipos certificados y acompañamiento desde el diagnóstico hasta la puesta en marcha y el seguimiento.',
    ],
    benefits: [
      { title: 'Diagnóstico preciso', description: 'Análisis de laboratorio para identificar qué parámetros están fuera de norma.' },
      { title: 'Agua segura y sin manchas', description: 'Eliminamos bacterias, sedimentos, hierro y manganeso que tiñen loza y ropa.' },
      { title: 'Mejor sabor y pH equilibrado', description: 'Sin olor a cloro ni sabor metálico, y con cañerías y calefont protegidos.' },
      { title: 'Cumplimiento normativo', description: 'Soluciones orientadas a los requisitos de la NCh 409 de agua potable.' },
    ],
    steps: ['Visita técnica y toma de muestras', 'Informe de resultados y propuesta', 'Instalación y puesta en marcha', 'Verificación y mantención'],
  },
  {
    slug: 'instalacion-filtros-presion',
    title: 'Instalación de Filtros en Presión',
    shortTitle: 'Filtros en presión',
    icon: Gauge,
    gallery: [
      { caption: 'Filtro en presión instalado en vivienda' },
      { caption: 'Recarga de arena y carbón activado' },
      { caption: 'Válvula y by-pass de mantención' },
    ],
    summary: 'Suministro e instalación de filtros presurizados para agua filtrada en toda tu casa, más el cambio de cargas filtrantes cuando tu equipo pierde rendimiento.',
    description: [
      'Los filtros en presión se instalan en la entrada de la red y tratan toda el agua de la vivienda o empresa. Son ideales para agua de pozo, APR o red con exceso de sedimentos. Suministramos el equipo completo (estanque, válvula y medio filtrante), lo instalamos y configuramos el retrolavado.',
      'Con el uso, los medios filtrantes se saturan. También realizamos el cambio de cargas: retiro del medio saturado, limpieza del estanque y recarga con arena sílice, carbón activado, zeolita o resinas certificadas, dejando el equipo operativo el mismo día.',
    ],
    benefits: [
      { title: 'Agua filtrada en toda la casa', description: 'Cocina, baños y lavandería reciben agua limpia.' },
      { title: 'Cambio de cargas en el día', description: 'Retiro, recarga y puesta en marcha en una sola visita.' },
      { title: 'Medios certificados', description: 'Arena sílice, carbón activado, zeolita y resinas aptas para agua potable.' },
      { title: 'Garantía y respaldo', description: 'Equipos con garantía y servicio técnico local en Puerto Montt.' },
    ],
    steps: ['Evaluación de consumo, presión y equipo', 'Suministro o recarga del medio filtrante', 'Instalación y retrolavado', 'Prueba de funcionamiento y capacitación'],
  },
  {
    slug: 'mantencion-pozos-profundos',
    title: 'Mantención pozos profundos',
    shortTitle: 'Pozos profundos',
    icon: Drill,
    gallery: [
      { caption: 'Inspección de pozo profundo' },
      { caption: 'Revisión de bomba sumergible' },
      { caption: 'Tablero eléctrico y presurización' },
    ],
    summary: 'Mantención preventiva y correctiva de pozos profundos, bombas sumergibles y sistemas de impulsión.',
    description: [
      'Un pozo sin mantención pierde caudal y puede contaminarse. Realizamos limpieza, desinfección, revisión de bombas sumergibles, tableros eléctricos y sistemas de presurización.',
      'Atendemos pozos de uso domiciliario, agrícola e industrial en Puerto Montt y alrededores, con planes de mantención periódica.',
    ],
    benefits: [
      { title: 'Caudal asegurado', description: 'Limpieza y revisión para mantener la producción del pozo.' },
      { title: 'Agua desinfectada', description: 'Cloración y control sanitario del pozo y estanques.' },
      { title: 'Menos fallas', description: 'Detectamos desgaste en bombas y tableros antes de que fallen.' },
      { title: 'Planes periódicos', description: 'Programas de mantención anual o semestral a tu medida.' },
    ],
    steps: ['Inspección del pozo y equipos', 'Limpieza y desinfección', 'Revisión de bomba y tablero', 'Informe técnico'],
  },
  {
    slug: 'instalacion-red-agua',
    title: 'Instalación red de agua potable',
    shortTitle: 'Red de agua potable',
    icon: Network,
    gallery: [
      { caption: 'Tendido de matriz de agua potable' },
      { caption: 'Estanque de acumulación' },
      { caption: 'Prueba de presión de la red' },
    ],
    summary: 'Diseño e instalación de redes de agua potable para viviendas, parcelas y proyectos, desde la fuente hasta la llave.',
    description: [
      'Ejecutamos redes de agua potable completas: matrices, arranques, estanques de acumulación, sistemas de presurización y conexiones domiciliarias.',
      'Trabajamos con materiales certificados (PVC, HDPE, PPR) y entregamos una instalación ordenada, probada a presión y lista para operar.',
    ],
    benefits: [
      { title: 'Proyecto integral', description: 'Desde la fuente hasta cada punto de consumo.' },
      { title: 'Materiales certificados', description: 'Tuberías y fittings aptos para agua potable.' },
      { title: 'Pruebas de presión', description: 'Verificamos hermeticidad antes de la entrega.' },
      { title: 'Ideal para parcelas', description: 'Experiencia en loteos y sectores rurales del sur.' },
    ],
    steps: ['Levantamiento en terreno', 'Diseño y presupuesto', 'Ejecución de obra', 'Pruebas y entrega'],
  },
  {
    slug: 'instalacion-sistemas-presurizados',
    title: 'Instalación de sistemas presurizados',
    shortTitle: 'Sistemas presurizados',
    icon: Waves,
    gallery: [
      { caption: 'Bomba presurizadora y estanque hidroneumático' },
      { caption: 'Sala de bombas instalada' },
      { caption: 'Tablero de control y presostato' },
    ],
    summary: 'Instalación de bombas presurizadoras y estanques hidroneumáticos para tener presión constante en todas las llaves, duchas y artefactos.',
    description: [
      '¿Poca presión en la ducha o el segundo piso? Instalamos sistemas presurizados con bomba, estanque hidroneumático y control automático (presostato o variador de frecuencia) que mantienen una presión estable aunque se usen varias llaves a la vez.',
      'Dimensionamos el equipo según tu consumo, altura y número de baños, y lo integramos con tu pozo, estanque de acumulación o red existente. Ideal para viviendas, parcelas, edificios pequeños y empresas.',
    ],
    benefits: [
      { title: 'Presión constante', description: 'Ducha, cocina y segundo piso con el mismo caudal, sin variaciones.' },
      { title: 'Equipo bien dimensionado', description: 'Bomba y estanque calculados según tu consumo real.' },
      { title: 'Funcionamiento automático', description: 'Partida y parada automática, con protección contra marcha en seco.' },
      { title: 'Menor consumo eléctrico', description: 'Opciones con variador de frecuencia para ahorrar energía.' },
    ],
    steps: ['Evaluación de presión y consumo', 'Selección de bomba y estanque', 'Instalación y conexión eléctrica', 'Calibración y prueba de funcionamiento'],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
