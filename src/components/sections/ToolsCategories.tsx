export interface ToolRow {
  name: string;
  value: string;
  role: string;
  description?: string;
}

export interface ToolCategory {
  title: string;
  why: string;
  items: ToolRow[];
}

interface ToolsCategoriesProps {
  title: string;
  categories: ToolCategory[];
  ariaLabel: string;
}

export default function ToolsCategories({ title, categories, ariaLabel }: ToolsCategoriesProps) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="scroll-reveal mb-8">
          <h2 className="text-2xl font-bold text-light-text sm:text-3xl">
            <span className="gradient-text">{title}</span>
          </h2>
        </div>

        <div className="space-y-10" aria-label={ariaLabel}>
          {categories.map((cat) => (
            <div key={cat.title} className="scroll-reveal">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-light-text">{cat.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-light-muted">{cat.why}</p>
              </div>

              <div className="card overflow-hidden">
                <ul className="divide-y divide-white/10" role="list">
                  {cat.items.map((row) => (
                    <li
                      key={`${cat.title}-${row.name}`}
                      className="group flex items-start justify-between gap-4 px-5 py-4 transition-all hover:bg-white/[0.03]"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-semibold text-light-text group-hover:text-accent-from">
                            {row.name}
                          </span>
                          <span className="text-sm text-light-muted">{row.value}</span>
                        </div>
                        <div className="mt-1 text-xs font-medium text-light-muted">{row.role}</div>
                        {row.description ? (
                          <p className="mt-2 text-sm leading-relaxed text-light-muted">{row.description}</p>
                        ) : null}
                      </div>

                      <span
                        className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition-all group-hover:border-accent-from/30 group-hover:bg-accent-from/10"
                        aria-hidden="true"
                      >
                        <svg className="h-5 w-5 text-accent-from" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


