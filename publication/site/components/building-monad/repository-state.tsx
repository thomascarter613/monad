import type { BuildingMonadInstallment } from '@/lib/building-monad/types';

type RepositoryStateProps = {
  installment: BuildingMonadInstallment;
};

const labels = {
  commit: 'Commit',
  branch: 'Branch',
  release: 'Release',
  tree: 'Tree',
  command: 'Reproduce',
} as const;

export function RepositoryState({ installment }: RepositoryStateProps) {
  const repository = installment.repository;
  const entries = repository
    ? (Object.keys(labels) as Array<keyof typeof labels>).flatMap((key) => {
        const value = repository[key];
        return value ? [[key, value] as const] : [];
      })
    : [];

  return (
    <section className="monad-repository-state" aria-labelledby="repository-state-heading">
      <div>
        <p className="monad-kicker">Repository state</p>
        <h2 id="repository-state-heading">Reproducibility checkpoint</h2>
        <p>
          This installment is sourced from <code>{installment.canonicalPath}</code>.
        </p>
      </div>
      {entries.length > 0 ? (
        <dl>
          {entries.map(([key, value]) => (
            <div key={key}>
              <dt>{labels[key]}</dt>
              <dd>
                <code>{value}</code>
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="monad-repository-state__empty">
          No commit, branch, release, or reproduction command was recorded in the canonical
          article.
        </p>
      )}
    </section>
  );
}
