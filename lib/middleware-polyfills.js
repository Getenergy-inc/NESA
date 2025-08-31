// Polyfills for Edge Runtime middleware
if (typeof global === 'undefined') {
  globalThis.global = globalThis;
}

if (typeof process === 'undefined') {
  globalThis.process = { env: {} };
}

if (typeof exports === 'undefined') {
  globalThis.exports = {};
}

if (typeof module === 'undefined') {
  globalThis.module = { exports: globalThis.exports };
}

// Export to make sure it's included in the bundle
export default function setupPolyfills() {
  return true;
}