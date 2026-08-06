'use client';

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          background: '#0a0a0a',
          color: '#fafafa',
        }}
      >
        <main style={{ width: 'min(42rem, calc(100% - 3rem))' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', opacity: 0.65 }}>
            {error.digest ? `GLOBAL ERROR · ${error.digest}` : 'GLOBAL ERROR'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', lineHeight: 1.05 }}>
            The publication shell failed.
          </h1>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.7, opacity: 0.75 }}>
            Retry the application. If the failure persists, preserve the digest and inspect the
            server output.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              border: 0,
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Retry application
          </button>
        </main>
      </body>
    </html>
  );
}
