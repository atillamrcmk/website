import type { SkillArea } from '@/data/skillAreas';

interface SkillDetailPanelProps {
  open: boolean;
  area?: SkillArea;
  lang: 'tr' | 'en';
  labels: {
    title: string;
    hint: string;
    usedIn: string;
    tech: string;
    close: string;
    noProjects: string;
  };
  onClose: () => void;
  panelId: string;
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-light-text backdrop-blur-md">
      {label}
    </span>
  );
}

export default function SkillDetailPanel({ open, area, lang, labels, onClose, panelId }: SkillDetailPanelProps) {
  return (
    <aside
      id={panelId}
      className={[
        'card scroll-reveal relative p-6 transition-all',
        open ? 'opacity-100' : 'opacity-100',
      ].join(' ')}
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">{labels.title}</div>
        {open ? (
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-light-text transition-all hover:border-accent-from/35 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accent-from/60 focus:ring-offset-2 focus:ring-offset-dark-bg"
            onClick={onClose}
            aria-label={labels.close}
            title={labels.close}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>

      {!open || !area ? (
        <p className="mt-4 text-sm leading-relaxed text-light-muted">{labels.hint}</p>
      ) : (
        <div className="mt-4">
          <h3 className="break-words text-xl font-semibold text-light-text">{area.label[lang]}</h3>
          <p className="mt-3 break-words text-sm leading-relaxed text-light-muted">{area.description[lang]}</p>

          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">{labels.tech}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {area.tech.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">{labels.usedIn}</div>

            {area.projects.length ? (
              <ul className="mt-3 space-y-2" role="list">
                {area.projects.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      className="group inline-flex w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-light-text transition-all hover:border-accent-from/35 hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent-from/60 focus:ring-offset-2 focus:ring-offset-dark-bg"
                      target={p.href.startsWith('http') ? '_blank' : undefined}
                      rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span className="min-w-0 flex-1 break-all font-medium">{p.name}</span>
                      <span className="ml-3 grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition-all group-hover:border-accent-from/30 group-hover:bg-accent-from/10" aria-hidden="true">
                        <svg className="h-4 w-4 text-accent-from" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-light-muted">{labels.noProjects}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}


