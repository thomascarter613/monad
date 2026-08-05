export default function LoadingPage() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col justify-center px-6 py-20"
      data-monad-section="project"
    >
      <span className="sr-only">Loading publication content</span>
      <div className="h-1 w-20 animate-pulse rounded-full bg-[var(--monad-section-accent)]" />
      <div className="mt-7 h-14 w-full max-w-2xl animate-pulse rounded-lg bg-fd-muted" />
      <div className="mt-5 h-5 w-full max-w-xl animate-pulse rounded bg-fd-muted" />
      <div className="mt-2 h-5 w-4/5 max-w-lg animate-pulse rounded bg-fd-muted" />
    </main>
  );
}
