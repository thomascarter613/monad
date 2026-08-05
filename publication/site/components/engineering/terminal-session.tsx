import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { EngineeringIcon } from './icons';

type TerminalSessionProps = ComponentPropsWithoutRef<'figure'> & {
  title?: string;
  prompt?: string;
  language?: string;
  children: ReactNode;
};

export function TerminalSession({
  title = 'Terminal session',
  prompt,
  language,
  children,
  className,
  ...props
}: TerminalSessionProps) {
  return (
    <figure
      className={['monad-terminal', className].filter(Boolean).join(' ')}
      data-language={language}
      {...props}
    >
      <figcaption className="monad-terminal__header">
        <span className="monad-terminal__lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="monad-terminal__title">
          <EngineeringIcon name="terminal" />
          {title}
        </span>
        {prompt ? <code className="monad-terminal__prompt">{prompt}</code> : null}
      </figcaption>
      <div className="monad-terminal__body">{children}</div>
    </figure>
  );
}
