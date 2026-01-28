import { useMemo, useState } from 'react';

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  tools: string[];
}

interface WorkflowStepperProps {
  title: string;
  steps: WorkflowStep[];
  activeLabel: string;
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-light-text backdrop-blur-md">
      {label}
    </span>
  );
}

export default function WorkflowStepper({ title, steps, activeLabel }: WorkflowStepperProps) {
  const safeSteps = useMemo(() => (steps.length ? steps : []), [steps]);
  const [activeId, setActiveId] = useState(safeSteps[0]?.id ?? '');

  const active = useMemo(() => safeSteps.find((s) => s.id === activeId) ?? safeSteps[0], [safeSteps, activeId]);

  if (!safeSteps.length) return null;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="scroll-reveal mb-8">
          <h2 className="text-2xl font-bold text-light-text sm:text-3xl">
            <span className="gradient-text">{title}</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Steps */}
          <div className="lg:col-span-5">
            {/* Mobile: horizontal scroll */}
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:hidden" role="list">
              {safeSteps.map((step, idx) => {
                const isActive = step.id === active?.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveId(step.id)}
                    className={[
                      'shrink-0 rounded-full border px-4 py-2 text-left text-sm backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-accent-from/60 focus:ring-offset-2 focus:ring-offset-dark-bg',
                      isActive ? 'border-accent-from/40 bg-white/[0.08] text-light-text' : 'border-white/10 bg-white/[0.05] text-light-muted hover:text-light-text',
                    ].join(' ')}
                    aria-pressed={isActive}
                  >
                    <span className="mr-2 text-xs text-light-muted">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-semibold">{step.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden space-y-2 lg:block" role="list">
              {safeSteps.map((step, idx) => {
                const isActive = step.id === active?.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveId(step.id)}
                    className={[
                      'group flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-accent-from/60 focus:ring-offset-2 focus:ring-offset-dark-bg',
                      isActive
                        ? 'border-accent-from/40 bg-white/[0.06] shadow-lg shadow-accent-from/10'
                        : 'border-white/10 bg-white/[0.04] hover:border-accent-from/30',
                    ].join(' ')}
                    aria-pressed={isActive}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-light-muted">{String(idx + 1).padStart(2, '0')}</span>
                        <span className={['font-semibold', isActive ? 'text-light-text' : 'text-light-text/90'].join(' ')}>
                          {step.title}
                        </span>
                      </div>
                      <div className="mt-1 line-clamp-1 text-sm text-light-muted">{step.description}</div>
                    </div>
                    <span
                      className={[
                        'ml-3 grid h-8 w-8 place-items-center rounded-xl border transition-all',
                        isActive ? 'border-accent-from/40 bg-accent-from/10' : 'border-white/10 bg-white/[0.03] group-hover:border-accent-from/30',
                      ].join(' ')}
                      aria-hidden="true"
                    >
                      <svg className="h-4 w-4 text-accent-from" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7">
            <div className="card scroll-reveal p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">
                    {activeLabel}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-light-text">{active?.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-light-muted">{active?.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(active?.tools ?? []).map((tool) => (
                  <Chip key={tool} label={tool} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


