'use client';

import { useEffect } from 'react';
import { StatusPage } from '@/components/site/status-page';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('monad:publication-error', {
        detail: { message: error.message, digest: error.digest },
      }),
    );
  }, [error]);

  return (
    <StatusPage
      code={error.digest ? `Application error · ${error.digest}` : 'Application error'}
      title="The publication could not render this page."
      description="The failure was contained by the application boundary. Retry the render; if it persists, preserve the error digest for diagnosis."
      actions={
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
        >
          Retry
        </button>
      }
    />
  );
}
