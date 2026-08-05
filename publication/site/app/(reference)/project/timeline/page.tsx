import { DocsPage } from 'fumadocs-ui/page';
import { ProjectTimeline } from '@/components/exploration/project-timeline';
import { getExplorationManifest } from '@/lib/exploration/manifest';
import { publicationMetadata } from '@/lib/metadata';

export const metadata = publicationMetadata({
  title: 'Project Timeline',
  description: 'A chronology derived from publication dates, updates, build logs, and repository checkpoints.',
  route: '/project/timeline',
});

export default async function ProjectTimelinePage() {
  const manifest = await getExplorationManifest();

  return (
    <DocsPage toc={[]} full>
      <header className="monad-article-header">
        <div className="monad-article-header__eyebrow monad-kicker">
          <span>Project chronology</span>
          <span aria-hidden="true">/</span>
          <span>{manifest.timeline.eventCount} dated events</span>
        </div>
        <h1 className="monad-article-title">Project Timeline</h1>
        <p className="monad-article-description">
          Follow the documented evolution of Monad across journal installments, architecture,
          decisions, specifications, engineering records, and build logs.
        </p>
      </header>
      <ProjectTimeline manifest={manifest} />
    </DocsPage>
  );
}
