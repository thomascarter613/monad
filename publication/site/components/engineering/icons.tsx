import type { ReactNode, SVGProps } from 'react';

export type EngineeringIconName =
  | 'decision'
  | 'constraint'
  | 'experiment'
  | 'failure'
  | 'implementation'
  | 'action'
  | 'checkpoint'
  | 'result'
  | 'evidence'
  | 'terminal'
  | 'artifact'
  | 'timeline'
  | 'figure'
  | 'specification';

type IconProps = SVGProps<SVGSVGElement> & { name: EngineeringIconName };

const paths: Record<EngineeringIconName, ReactNode> = {
  decision: <path d="m7 12 3 3 7-7M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />,
  constraint: <path d="M8 3v4m8-4v4M5 7h14M6 7v12h12V7M9 11h6m-6 4h4" />,
  experiment: <path d="M9 3h6m-5 0v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 14h8" />,
  failure: (
    <path d="M12 9v4m0 4h.01M10.2 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.8 3.9a2 2 0 0 0-3.6 0Z" />
  ),
  implementation: <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />,
  action: <path d="M5 4h14v16H5zM8 8h8m-8 4h5m-5 4h7" />,
  checkpoint: <path d="M6 4v16m0-14h11l-2 4 2 4H6" />,
  result: <path d="m4 14 4-4 4 4 8-8M16 6h4v4" />,
  evidence: <path d="M4 5h16v14H4zM8 9h8m-8 4h8m-8 4h5" />,
  terminal: <path d="M4 5h16v14H4zM7 9l3 3-3 3m5 0h5" />,
  artifact: <path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5m-5 4h5" />,
  timeline: <path d="M6 4v16m0-13h5m-5 5h9m-9 5h12M4 7h4m-4 5h4m-4 5h4" />,
  figure: <path d="M4 5h16v14H4zM7 15l3-3 3 3 2-2 3 3M9 9h.01" />,
  specification: <path d="M6 3h12v18H6zM9 7h6m-6 4h6m-6 4h4" />,
};

export function EngineeringIcon({ name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
