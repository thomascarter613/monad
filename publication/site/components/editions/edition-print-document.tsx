import type { ComponentType } from 'react';
import { getPrintMDXComponents } from '@/components/mdx';
import type { PublicationPage } from '@/lib/discovery/pages';
import type { EditionDocument } from '@/lib/editions/types';

export function EditionPrintDocument({
  record,
  page,
}: {
  record: EditionDocument;
  page: PublicationPage;
}) {
  const MDX = page.data.body as ComponentType<{ components?: Record<string, unknown> }>;
  return (
    <article className="monad-edition-print__document" id={`document-${record.id.toLowerCase()}`}>
      <header>
        <p className="monad-edition-print__eyebrow">
          {record.id} · {record.kind} · {record.status}
        </p>
        <h1>{record.title}</h1>
        <p>{record.description}</p>
        <dl>
          <div>
            <dt>Canonical source</dt>
            <dd>{record.canonicalPath}</dd>
          </div>
          <div>
            <dt>Source hash</dt>
            <dd>
              <code>{record.sourceHash}</code>
            </dd>
          </div>
        </dl>
      </header>
      <div className="prose monad-edition-print__body">
        <MDX components={getPrintMDXComponents()} />
      </div>
    </article>
  );
}
