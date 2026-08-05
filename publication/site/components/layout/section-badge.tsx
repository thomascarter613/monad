import { MonadMark } from '@/components/brand/monad-mark';

const sectionCopy = {
  'building-monad': {
    label: 'Engineering narrative',
    description: 'Chronological reasoning, decisions, experiments, and implementation history.',
  },
  system: {
    label: 'System reference',
    description: 'Stable concepts, architecture, components, and operating models.',
  },
  artifacts: {
    label: 'Governed artifacts',
    description: 'Specifications, decisions, evidence, registries, and formal relationships.',
  },
  project: {
    label: 'Project state',
    description: 'Current status, roadmap, releases, and execution history.',
  },
} as const;

export type PublicationSection = keyof typeof sectionCopy;

export function SectionBadge({ section }: { section: PublicationSection }) {
  const copy = sectionCopy[section];

  return (
    <div className="monad-section-badge">
      <div className="monad-section-badge__mark">
        <MonadMark className="size-4" />
        <span className="monad-kicker">{copy.label}</span>
      </div>
      <p className="text-xs leading-5 text-fd-muted-foreground">{copy.description}</p>
    </div>
  );
}
