'use client';

import { useState } from 'react';

export function DocumentActions({
  markdownUrl,
  sourceUrl,
}: {
  markdownUrl: string;
  sourceUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyMarkdown() {
    const response = await fetch(markdownUrl);
    if (!response.ok) throw new Error(`Unable to fetch Markdown (${response.status}).`);
    await navigator.clipboard.writeText(await response.text());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <nav className="monad-document-actions" aria-label="Document formats and source">
      <a href={markdownUrl}>View Markdown</a>
      <button type="button" onClick={() => void copyMarkdown()}>
        {copied ? 'Copied' : 'Copy Markdown'}
      </button>
      {sourceUrl ? (
        <a href={sourceUrl} rel="noreferrer" target="_blank">
          Canonical source
        </a>
      ) : null}
    </nav>
  );
}
