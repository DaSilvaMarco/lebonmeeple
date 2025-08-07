import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Configuration des chemins pour utiliser le tsconfig.json de la racine
  typescript: {
    tsconfigPath: '../../tsconfig.json',
  },

  // Configuration Webpack pour les alias
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/domains': path.resolve(__dirname, './src/domains'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/ui': path.resolve(__dirname, './src/ui'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@public': path.resolve(__dirname, './public'),
    };
    return config;
  },

  // Autres options de configuration
  reactStrictMode: true,
  swcMinify: true,

  // Configuration pour les images
  images: {
    domains: ['localhost', 'picsum.photos'],
  },
};

export default nextConfig;
