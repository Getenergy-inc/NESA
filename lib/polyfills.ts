// Polyfills for browser and edge runtime compatibility

// Only run this code in the browser
if (typeof window !== 'undefined') {
  // Polyfill global for client-side code
  if (typeof (window as any).global === 'undefined') {
    (window as any).global = window;
    console.log('Polyfilled global object in browser environment');
  }

  // Polyfill process for client-side code if needed
  if (typeof (window as any).process === 'undefined') {
    (window as any).process = {
      env: { NODE_ENV: process.env.NODE_ENV },
      browser: true,
    };
    console.log('Polyfilled process object in browser environment');
  }
}

// This is a workaround for NextAuth.js in Edge Runtime
// The code below will never actually run in Edge Runtime,
// but it helps TypeScript understand that these globals exist
if (typeof globalThis !== 'undefined' && typeof global === 'undefined') {
  // @ts-ignore - intentionally setting global
  globalThis.global = globalThis;
}

export {};