import Link from 'next/link';
import type { BuildingMonadArtifact } from '@/lib/building-monad/types';

type ArtifactIntroductionsProps = {
  artifacts: BuildingMonadArtifact[];
};

function label(value: string) {
  return value.replaceAll('-', ' ');
}

export function ArtifactIntroductions({ artifacts }: ArtifactIntroductionsProps) {
  if (artifacts.length === 0) return null;

  return (
    <section
      className="monad-artifact-introductions"
      aria-labelledby="introduced-artifacts-heading"
    >
      <p className="monad-kicker">Durable outputs</p>
      <h2 id="introduced-artifacts-heading">Artifacts connected in this installment</h2>
      <div className="monad-artifact-introductions__grid">
        {artifacts.map((artifact) => (
          <Link href={artifact.route} key={artifact.id}>
            <span className="font-mono">{artifact.id}</span>
            <strong>{artifact.title}</strong>
            <small>{label(artifact.relationship)}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
