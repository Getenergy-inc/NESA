/**
 * Polyfill for the 'global' object.
 * In some environments like the Edge runtime, 'global' is not defined.
 * This polyfill assigns 'self' to 'global', which is a common practice
 * to make libraries that depend on 'global' work correctly.
 * 'self' is the global scope in web workers and other modern environments.
 */
// @ts-nocheck
if (typeof global === 'undefined') {
  global = self;
}