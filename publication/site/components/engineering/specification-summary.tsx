import type { ReactNode } from 'react';
import { EngineeringIcon } from './icons';

type SpecificationSummaryProps = {
  id: string;
  status: string;
  scope?: string;
  normative?: boolean;
  children?: ReactNode;
};

export function SpecificationSummary({
  id,
  status,
  scope,
  normative = true,
  children,
}: SpecificationSummaryProps) {
  return (
    <aside className="monad-specification-summary" aria-label={`Specification ${id}`}>
      <header>
        <EngineeringIcon name="specification" />
        <div>
          <span>Specification summary</span>
          <code>{id}</code>
        </div>
      </header>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>{status}</dd>
        </div>
        <div>
          <dt>Authority</dt>
          <dd>{normative ? 'Normative' : 'Informative'}</dd>
        </div>
        {scope ? (
          <div>
            <dt>Scope</dt>
            <dd>{scope}</dd>
          </div>
        ) : null}
      </dl>
      {children ? <div className="monad-specification-summary__body">{children}</div> : null}
    </aside>
  );
}
