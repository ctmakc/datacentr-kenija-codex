interface PageShellProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 text-base text-gray-600">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
