/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to prevent double-rendering in development
  images: {
    unoptimized: true,
  },
  // Disable static optimization for routes that use authentication
  // This prevents "Cannot read properties of null (reading 'useState')" errors
  output: 'standalone',
  experimental: {
    scrollRestoration: true,
    // Add these experimental features to improve App Router stability
    serverActions: {
      bodySizeLimit: '2mb',
    },
    serverComponentsExternalPackages: ['mongoose', 'next-auth'],
  },
  // Optimize build performance
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce bundle size and fix SSR issues
  webpack: (config, { isServer, webpack }) => {
    // Fix case sensitivity warnings
    config.resolve.symlinks = false;

    // Client-side configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Server-side configuration to fix "self is not defined" and global issues
    if (isServer) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'self': 'global',
          'global': 'globalThis',
        })
      );
    }

    // Fix global reference in middleware/edge runtime
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'global': 'globalThis',
      })
    );

    // Suppress case sensitivity warnings
    config.stats = {
      ...config.stats,
      warningsFilter: [
        /There are multiple modules with names that only differ in casing/,
        /This can lead to unexpected behavior when compiling on a filesystem with other case-semantic/,
      ],
    };
    
    // Optimize memory usage with smaller chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 200000,
          },
        },
      },
    };
    
    return config;
  },
  
}

module.exports = nextConfig
