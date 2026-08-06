import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditionPrintDocument } from '@/components/editions/edition-print-document';
import { siteConfig } from '@/lib/config/site';
import { getEditionPages } from '@/lib/editions/catalog';
import { getEdition, getEditionManifest } from '@/lib/editions/manifest';

type PageProps = {
  params: Promise<{ edition: string }>;
  searchParams: Promise<{ document?: string }>;
};

export default async function EditionPrintPage({ params, searchParams }: PageProps) {
  const [{ edition: key }, query] = await Promise.all([params, searchParams]);
  const edition = await getEdition(key);
  if (!edition) notFound();
  const allPages = getEditionPages(edition);
  const requestedDocument = query.document?.toUpperCase();
  const records = requestedDocument
    ? edition.documents.filter((document) => document.id === requestedDocument)
    : edition.documents;
  if (requestedDocument && records.length === 0) notFound();
  const pageByRoute = new Map(allPages.map((entry) => [entry.page.url, entry.page]));
  const selected = records.flatMap((record) => {
    const page = pageByRoute.get(record.route);
    return page ? [{ record, page }] : [];
  });
  const title = requestedDocument ? (selected[0]?.record.title ?? edition.title) : edition.title;

  return (
    <main className="monad-edition-print" data-edition={edition.key}>
      <style>{`@page { size: ${edition.paper.format}; margin: ${edition.paper.margin.top} ${edition.paper.margin.right} ${edition.paper.margin.bottom} ${edition.paper.margin.left}; }`}</style>
      <section className="monad-edition-print__cover">
        <p>{siteConfig.name}</p>
        <h1>{title}</h1>
        <p>{requestedDocument ? selected[0]?.record.id : edition.subtitle}</p>
        <dl>
          <div>
            <dt>Edition</dt>
            <dd>{edition.defaultVersion}</dd>
          </div>
          <div>
            <dt>Documents</dt>
            <dd>{selected.length}</dd>
          </div>
          <div>
            <dt>Source digest</dt>
            <dd>
              <code>{edition.sourceDigest}</code>
            </dd>
          </div>
        </dl>
      </section>
      {!requestedDocument ? (
        <nav className="monad-edition-print__toc" aria-label="Edition contents">
          <h2>Contents</h2>
          <ol>
            {selected.map(({ record }) => (
              <li key={record.id}>
                <a href={`#document-${record.id.toLowerCase()}`}>
                  <span>{record.id}</span>
                  <strong>{record.title}</strong>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      {selected.map(({ record, page }) => (
        <EditionPrintDocument key={record.id} record={record} page={page} />
      ))}
    </main>
  );
}

export async function generateStaticParams() {
  const manifest = await getEditionManifest();
  return manifest.editions.map((edition) => ({ edition: edition.key }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
