import type { ReactNode } from 'react';
import { MonadMark } from '@/components/brand/monad-mark';

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function StatusPage({ code, title, description, actions }: StatusPageProps) {
  return (
    <main
      className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-20"
      data-monad-section="project"
    >
      <MonadMark className="mb-8 size-12 text-[var(--monad-section-accent)]" />
      <p className="monad-status-code monad-kicker">{code}</p>
      <h1 className="monad-display mt-4 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-pretty font-serif text-lg leading-8 text-fd-muted-foreground">
        {description}
      </p>
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </main>
  );
}
