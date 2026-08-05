import type { ReactNode } from 'react';
import { SectionLayout } from '@/components/layout/section-layout';
import { buildingMonadSource } from '@/lib/source';

export default function BuildingMonadLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayout section="building-monad" tree={buildingMonadSource.pageTree}>
      {children}
    </SectionLayout>
  );
}
