// Edge runtime polyfills to avoid ReferenceError: global/self is not defined
// This is safe because globalThis is available in Edge and Node.
(() => {
  const g: any = globalThis as any;
  if (typeof g.global === 'undefined') {
    g.global = g;
  }
  if (typeof g.self === 'undefined') {
    g.self = g;
  }
})();

export {};