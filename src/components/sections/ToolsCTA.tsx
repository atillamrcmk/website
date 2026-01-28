interface ToolsCTAProps {
  title: string;
  subtitle: string;
  primary: { label: string; href: string; ariaLabel?: string };
  secondary: { label: string; href: string; ariaLabel?: string };
}

export default function ToolsCTA({ title, subtitle, primary, secondary }: ToolsCTAProps) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="card scroll-reveal border-accent-from/20 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-bold text-light-text sm:text-3xl">
                <span className="gradient-text">{title}</span>
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-light-muted">{subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={primary.href}
                className="inline-flex items-center justify-center rounded-[24px] bg-gradient-to-r from-accent-from to-accent-to px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-from focus:ring-offset-2 focus:ring-offset-dark-bg"
                aria-label={primary.ariaLabel || primary.label}
              >
                {primary.label}
              </a>
              <a
                href={secondary.href}
                className="inline-flex items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-light-text backdrop-blur-md transition-all hover:border-accent-from/50 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent-from focus:ring-offset-2 focus:ring-offset-dark-bg"
                aria-label={secondary.ariaLabel || secondary.label}
              >
                {secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


