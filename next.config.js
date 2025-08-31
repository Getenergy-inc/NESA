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
  // Simplified webpack config
  webpack: (config, { isServer, webpack }) => {
    // Client-side configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // Normalize module casing to avoid duplicate modules on Windows
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        globalThis: require.resolve('globalthis'),
      };
      
      // Provide global polyfill using normalized module name
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.ProvidePlugin({
          global: require.resolve('globalthis'),
        })
      );
    }
    
    // Suppress case sensitivity warnings
    config.stats = {
      ...config.stats,
      warningsFilter: [
        /There are multiple modules with names that only differ in casing/,
        /This can lead to unexpected behavior when compiling on a filesystem with other case-semantic/,
      ],
    };
    
    return config;
  },
}

module.exports = nextConfig