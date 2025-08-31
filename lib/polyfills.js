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

// Ensure globalThis is defined everywhere
if (typeof globalThis === 'undefined') {
  if (typeof self !== 'undefined') {
    self.globalThis = self;
  } else if (typeof window !== 'undefined') {
    window.globalThis = window;
  } else if (typeof global !== 'undefined') {
    global.globalThis = global;
  }
}

// Ensure global is defined
if (typeof globalThis !== 'undefined' && typeof global === 'undefined') {
  globalThis.global = globalThis;
}

// Ensure module and exports are defined
if (typeof globalThis !== 'undefined') {
  if (typeof globalThis.exports === 'undefined') {
    globalThis.exports = {};
  }
  if (typeof globalThis.module === 'undefined') {
    globalThis.module = { exports: globalThis.exports };
  }
}