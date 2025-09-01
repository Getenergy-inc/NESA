'use client';


if (typeof window !== 'undefined' && typeof global === 'undefined') {
  (window as any).global = window;
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2>Something went wrong!</h2>
          <p>{error.message || 'An unexpected error occurred'}</p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.5rem 1rem',
              background: '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}