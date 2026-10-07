import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // El índice de servicios se eliminó: cada servicio tiene su landing y el listado vive en el home.
    // Servicios fusionados: las URLs antiguas apuntan al servicio que las absorbió.
    return [
      { source: '/servicios', destination: '/#servicios', permanent: true },
      { source: '/servicios/mejoramiento-calidad-agua', destination: '/servicios/tratamiento-agua-potable', permanent: true },
      { source: '/servicios/cambio-cargas-filtros', destination: '/servicios/instalacion-filtros-presion', permanent: true },
      { source: '/servicios/instalacion-filtros-presion-domiciliarios', destination: '/servicios/instalacion-filtros-presion', permanent: true },
    ];
  },
};

export default nextConfig;
