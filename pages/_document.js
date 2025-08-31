import { Html, Head, Main, NextScript } from 'next/document';

// Define global for browser environment
if (typeof global === 'undefined' && typeof window !== 'undefined') {
  window.global = window;
}

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Define global for browser environment
            if (typeof global === 'undefined' && typeof window !== 'undefined') {
              window.global = window;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}