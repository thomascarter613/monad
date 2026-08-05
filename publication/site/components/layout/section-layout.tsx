import type { ReactNode } from 'react';
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SectionBadge, type PublicationSection } from '@/components/layout/section-badge';
import { baseOptions } from '@/lib/layout.shared';

type SectionLayoutProps = {
  section: PublicationSection;
  tree: DocsLayoutProps['tree'];
  children: ReactNode;
};

export function SectionLayout({ section, tree, children }: SectionLayoutProps) {
  return (
    <div className="contents" data-monad-section={section}>
      <DocsLayout
        {...baseOptions()}
        tree={tree}
        containerProps={{ className: 'monad-docs-layout' }}
        sidebar={{
          banner: <SectionBadge section={section} />,
          defaultOpenLevel: 1,
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
