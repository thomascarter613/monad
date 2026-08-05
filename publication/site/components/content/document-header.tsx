import type { ReactNode } from 'react';

type DocumentHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  kind?: string;
  status?: string;
};

function humanize(value: string) {
  return value.replaceAll('-', ' ');
}

export function DocumentHeader({ title, description, id, kind, status }: DocumentHeaderProps) {
  return (
    <header className="monad-article-header">
      <div className="monad-article-header__eyebrow monad-kicker">
        <span>{id ?? 'Monad Engineering Log'}</span>
        {kind ? <span aria-hidden="true">/</span> : null}
        {kind ? <span>{humanize(kind)}</span> : null}
        {status ? <span aria-hidden="true">/</span> : null}
        {status ? <span>{humanize(status)}</span> : null}
      </div>
      <h1 className="monad-article-title">{title}</h1>
      {description ? <p className="monad-article-description">{description}</p> : null}
    </header>
  );
}
