import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { EngineeringIcon, type EngineeringIconName } from './icons';

export const engineeringNoteKinds = [
  'decision',
  'constraint',
  'experiment',
  'failure',
  'implementation',
  'action',
  'checkpoint',
  'result',
  'evidence',
] as const;

export type EngineeringNoteKind = (typeof engineeringNoteKinds)[number];

const labels: Record<EngineeringNoteKind, string> = {
  decision: 'Decision',
  constraint: 'Design constraint',
  experiment: 'Experiment',
  failure: 'Failure log',
  implementation: 'Implementation note',
  action: 'Repository action',
  checkpoint: 'Reader checkpoint',
  result: 'Result',
  evidence: 'Verification evidence',
};

type EngineeringNoteProps = ComponentPropsWithoutRef<'aside'> & {
  kind: EngineeringNoteKind;
  title?: string;
  children: ReactNode;
};

export function EngineeringNote({ kind, title, children, className, ...props }: EngineeringNoteProps) {
  const heading = title ?? labels[kind];

  return (
    <aside
      className={['monad-engineering-note', className].filter(Boolean).join(' ')}
      data-note-kind={kind}
      aria-label={heading}
      {...props}
    >
      <header className="monad-engineering-note__header">
        <EngineeringIcon
          className="monad-engineering-note__icon"
          name={kind as EngineeringIconName}
        />
        <div>
          <span className="monad-engineering-note__kind">{labels[kind]}</span>
          {title ? <p className="monad-engineering-note__title">{title}</p> : null}
        </div>
      </header>
      <div className="monad-engineering-note__body">{children}</div>
    </aside>
  );
}

export type NamedEngineeringNoteProps = Omit<EngineeringNoteProps, 'kind'>;

export function Decision(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="decision" {...props} />;
}

export function Constraint(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="constraint" {...props} />;
}

export function Experiment(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="experiment" {...props} />;
}

export function FailureLog(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="failure" {...props} />;
}

export function ImplementationNote(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="implementation" {...props} />;
}

export function RepositoryAction(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="action" {...props} />;
}

export function ReaderCheckpoint(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="checkpoint" {...props} />;
}

export function Result(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="result" {...props} />;
}

export function VerificationEvidence(props: NamedEngineeringNoteProps) {
  return <EngineeringNote kind="evidence" {...props} />;
}
