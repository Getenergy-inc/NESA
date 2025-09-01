// Load polyfills
import '../lib/polyfills';

// This file is only used to provide polyfills
// The actual app is in the app directory
export default function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}