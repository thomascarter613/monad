import type { ReactNode } from 'react';
import { SectionLayout } from '@/components/layout/section-layout';
import { projectSource } from '@/lib/source';

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayout section="project" tree={projectSource.pageTree}>
      {children}
    </SectionLayout>
  );
}
