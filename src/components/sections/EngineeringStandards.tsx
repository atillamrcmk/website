interface StandardItem {
  title: string;
  description: string;
}

interface EngineeringStandardsProps {
  title: string;
  items: StandardItem[];
}

export default function EngineeringStandards({ title, items }: EngineeringStandardsProps) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="scroll-reveal mb-8">
          <h2 className="text-2xl font-bold text-light-text sm:text-3xl">
            <span className="gradient-text">{title}</span>
          </h2>
        </div>

        <div className="card scroll-reveal p-6">
          <ul className="space-y-4" role="list">
            {items.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span
                  className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-from/20 to-accent-to/20 text-accent-from"
                  aria-hidden="true"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-light-text">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-light-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


