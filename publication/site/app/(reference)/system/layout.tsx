import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { systemSource } from '@/lib/source';

export default function SystemLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={systemSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
