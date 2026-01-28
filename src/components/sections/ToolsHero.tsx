interface ToolsHeroProps {
  title: string;
  subtitle: string;
  badge: string;
}

export default function ToolsHero({ title, subtitle, badge }: ToolsHeroProps) {
  return (
    <section className="section-padding pt-32 pb-10">
      <div className="container-custom">
        <div className="grid items-start gap-6 md:grid-cols-[1fr_auto]">
          <div className="scroll-reveal">
            <h1 className="text-4xl font-bold text-light-text sm:text-5xl">
              <span className="gradient-text">{title}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-light-muted sm:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="scroll-reveal md:justify-self-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-light-text backdrop-blur-md">
              <span
                className="h-2 w-2 rounded-full bg-gradient-to-r from-accent-from to-accent-to"
                aria-hidden="true"
              />
              <span>{badge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


