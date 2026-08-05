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
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-20">
      <MonadMark className="mb-8 size-12 text-fd-primary" />
      <p className="font-mono text-sm tracking-[0.18em] text-fd-muted-foreground uppercase">
        {code}
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-fd-muted-foreground">
        {description}
      </p>
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </main>
  );
}
