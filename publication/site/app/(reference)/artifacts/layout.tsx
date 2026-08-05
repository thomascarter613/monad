import type { ReactNode } from 'react';
import { SectionLayout } from '@/components/layout/section-layout';
import { artifactSource } from '@/lib/source';

export default function ArtifactsLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayout section="artifacts" tree={artifactSource.pageTree}>
      {children}
    </SectionLayout>
  );
}
