import { MonadMark } from '@/components/brand/monad-mark';
import { siteConfig } from '@/lib/config/site';

type SiteIdentityProps = {
  compact?: boolean;
};

export function SiteIdentity({ compact = false }: SiteIdentityProps) {
  return (
    <span className="flex items-center gap-2.5">
      <MonadMark className="size-6 shrink-0 text-[var(--monad-section-accent)]" />
      <span className="flex items-baseline gap-2">
        <span className="font-semibold tracking-tight">{siteConfig.shortName}</span>
        {compact ? null : (
          <span className="hidden font-mono text-xs text-fd-muted-foreground sm:inline">
            Engineering Log
          </span>
        )}
      </span>
    </span>
  );
}
