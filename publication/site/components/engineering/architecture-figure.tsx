import type { ReactNode } from 'react';
import { EngineeringIcon } from './icons';

type ArchitectureFigureProps = {
  title: string;
  caption?: ReactNode;
  source?: string;
  children: ReactNode;
};

export function ArchitectureFigure({ title, caption, source, children }: ArchitectureFigureProps) {
  return (
    <figure className="monad-architecture-figure">
      <div className="monad-architecture-figure__label">
        <EngineeringIcon name="figure" />
        <span>Architecture figure</span>
      </div>
      <div className="monad-architecture-figure__body">{children}</div>
      <figcaption>
        <strong>{title}</strong>
        {caption ? <span>{caption}</span> : null}
        {source ? <small>Source: {source}</small> : null}
      </figcaption>
    </figure>
  );
}
