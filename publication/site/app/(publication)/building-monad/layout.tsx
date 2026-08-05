import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { buildingMonadSource } from '@/lib/source';

export default function BuildingMonadLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={buildingMonadSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
