interface PageShellProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:py-12">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm">
        <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-cyan-100 blur-2xl" />
        <h1 className="relative text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 text-base text-slate-600">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
