export default function LoadingPage() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col justify-center px-6 py-20"
    >
      <span className="sr-only">Loading publication content</span>
      <div className="h-3 w-40 animate-pulse rounded bg-fd-muted" />
      <div className="mt-6 h-12 w-full max-w-2xl animate-pulse rounded-lg bg-fd-muted" />
      <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-fd-muted" />
      <div className="mt-2 h-5 w-4/5 max-w-lg animate-pulse rounded bg-fd-muted" />
    </main>
  );
}
