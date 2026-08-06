import { DocsPage } from 'fumadocs-ui/page';
import { publicationMetadata } from '@/lib/metadata';
import { ciPolicy, deploymentProfiles, releasePolicy } from '@/operations.config.mjs';

export const metadata = publicationMetadata({
  title: 'Publication Operations',
  description:
    'CI gates, deployment profiles, release channels, health checks, and operating procedures for the Monad Engineering Log.',
  route: '/project/operations',
});

export default function PublicationOperationsPage() {
  return (
    <DocsPage toc={[]} full>
      <header className="monad-article-header">
        <div className="monad-article-header__eyebrow monad-kicker">
          <span>Publication platform</span>
          <span aria-hidden="true">/</span>
          <span>operations</span>
        </div>
        <h1 className="monad-article-title">Publication Operations</h1>
        <p className="monad-article-description">
          The controls that keep the Monad documentation site verifiable, deployable, recoverable,
          and capable of producing immutable publication editions.
        </p>
      </header>

      <section className="monad-operations-grid" aria-labelledby="ci-heading">
        <article className="monad-operations-card">
          <p className="monad-kicker">Continuous integration</p>
          <h2 id="ci-heading">Required quality gates</h2>
          <ul>
            {ciPolicy.pullRequestChecks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </article>
        <article className="monad-operations-card">
          <p className="monad-kicker">Release policy</p>
          <h2>Immutable documentation editions</h2>
          <p>
            Tags beginning with <code>{releasePolicy.tagPrefix}</code> build the complete edition
            and attach checksummed artifacts to a GitHub release.
          </p>
        </article>
      </section>

      <h2>Supported deployment profiles</h2>
      <div className="monad-operations-grid">
        {deploymentProfiles.map((profile) => (
          <article className="monad-operations-card" key={profile.key}>
            <p className="monad-kicker">{profile.classification}</p>
            <h3>{profile.title}</h3>
            <p>{profile.notes}</p>
            <dl>
              <div>
                <dt>Health</dt>
                <dd>
                  <code>{profile.healthRoute}</code>
                </dd>
              </div>
              {'buildCommand' in profile && profile.buildCommand ? (
                <div>
                  <dt>Build</dt>
                  <dd>
                    <code>{profile.buildCommand}</code>
                  </dd>
                </div>
              ) : null}
              {'dockerfile' in profile && profile.dockerfile ? (
                <div>
                  <dt>Dockerfile</dt>
                  <dd>
                    <code>{profile.dockerfile}</code>
                  </dd>
                </div>
              ) : null}
            </dl>
          </article>
        ))}
      </div>

      <h2>Operational endpoints</h2>
      <ul>
        <li>
          <code>/api/health</code> — liveness, build identity, and registry readiness.
        </li>
        <li>
          <code>/api/operations</code> — public CI, deployment, and release contracts.
        </li>
        <li>
          <code>/api/editions</code> — generated edition inventory.
        </li>
      </ul>
    </DocsPage>
  );
}
