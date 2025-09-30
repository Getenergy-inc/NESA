/**
 * Helper functions to safely check for browser-only APIs
 */

/**
 * Safely check if we're running in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safely access the File API (only available in browser)
 */
export function getFileAPI() {
  if (isBrowser()) {
    return window.File;
  }
  return null;
}

/**
 * Safely check if a value is a File instance
 */
export function isFileInstance(value: any): boolean {
  if (!isBrowser()) {
    return false;
  }
  
  return value instanceof File;
}

/**
 * Create a safe wrapper for browser-only code
 */
export function runInBrowser(callback: () => void): void {
  if (isBrowser()) {
    callback();
  }
}