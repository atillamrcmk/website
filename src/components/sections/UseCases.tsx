interface UseCaseCard {
  title: string;
  problem: string;
  approach: string;
  tools: string[];
}

interface UseCasesProps {
  title: string;
  cards: UseCaseCard[];
  labels: {
    problem: string;
    approach: string;
  };
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-light-text backdrop-blur-md">
      {label}
    </span>
  );
}

export default function UseCases({ title, cards, labels }: UseCasesProps) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="scroll-reveal mb-8">
          <h2 className="text-2xl font-bold text-light-text sm:text-3xl">
            <span className="gradient-text">{title}</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="card card-hover scroll-reveal p-6">
              <h3 className="text-xl font-semibold text-light-text">{card.title}</h3>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">
                    {labels.problem}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-light-muted">{card.problem}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">
                    {labels.approach}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-light-muted">{card.approach}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {card.tools.map((tool) => (
                  <Chip key={tool} label={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


