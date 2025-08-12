// Global polyfills for server-side rendering
if (typeof global !== 'undefined' && typeof window === 'undefined') {
  // Define self for server-side rendering
  global.self = global;
  
  // Define window for server-side rendering
  global.window = global;
  
  // Define document for server-side rendering
  global.document = {
    createElement: () => ({}),
    getElementById: () => null,
    addEventListener: () => {},
    removeEventListener: () => {},
  };
  
  // Define navigator for server-side rendering
  global.navigator = {
    userAgent: 'node',
    onLine: true,
  };
  
  // Define location for server-side rendering
  global.location = {
    href: '',
    origin: '',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
  };
}