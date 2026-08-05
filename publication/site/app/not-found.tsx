import Link from 'next/link';
import { StatusPage } from '@/components/site/status-page';

export default function NotFoundPage() {
  return (
    <StatusPage
      code="404 · Document not found"
      title="This publication route does not exist yet."
      description="The document may have moved, may not have been published, or may belong to a reserved section that has not been activated."
      actions={
        <>
          <Link
            href="/"
            className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
          >
            Return home
          </Link>
          <Link
            href="/system"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-fd-muted"
          >
            Browse the system reference
          </Link>
        </>
      }
    />
  );
}
