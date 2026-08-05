import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { artifactSource } from '@/lib/source';

export default function ArtifactsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={artifactSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
