import Link from 'next/link';
import { MonadMark } from '@/components/brand/monad-mark';
import { siteConfig } from '@/lib/config/site';

export function PublicationMasthead() {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-fd-border pb-5">
      <div className="flex min-w-0 items-center gap-3">
        <MonadMark className="size-9 shrink-0 text-[var(--monad-section-accent)]" />
        <div className="min-w-0">
          <p className="monad-kicker truncate text-fd-muted-foreground">Engineering Log</p>
          <p className="truncate font-semibold tracking-tight">{siteConfig.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Link className="monad-masthead-search" href="/search">
          Search
        </Link>
        <p className="hidden max-w-72 text-right font-mono text-[0.68rem] leading-5 tracking-[0.12em] text-fd-muted-foreground uppercase sm:block">
          Architecture · Decisions · Specifications · Evidence
        </p>
      </div>
    </header>
  );
}
