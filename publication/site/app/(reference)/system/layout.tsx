import type { ReactNode } from 'react';
import { SectionLayout } from '@/components/layout/section-layout';
import { systemSource } from '@/lib/source';

export default function SystemLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayout section="system" tree={systemSource.pageTree}>
      {children}
    </SectionLayout>
  );
}
