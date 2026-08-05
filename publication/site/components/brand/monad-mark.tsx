import type { SVGProps } from 'react';

type MonadMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function MonadMark({ title, ...props }: MonadMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14 27.5c3.25-7.75 7.25-11.5 12-11.5 4.2 0 7.1 2.15 8.7 6.45M34 20.5C30.75 28.25 26.75 32 22 32c-4.2 0-7.1-2.15-8.7-6.45"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <circle cx="24" cy="24" r="2.25" fill="currentColor" />
    </svg>
  );
}
