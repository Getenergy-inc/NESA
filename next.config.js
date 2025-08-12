/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  // Optimize build performance
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce bundle size and fix SSR issues
  webpack: (config, { isServer, webpack }) => {
    // Client-side configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Server-side configuration to fix "self is not defined"
    if (isServer) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'self': 'global',
        })
      );
    }
    
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
