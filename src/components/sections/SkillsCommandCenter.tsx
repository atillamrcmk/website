import { useEffect, useId, useMemo, useState } from 'react';
import { getDefaultLanguage, getTranslations, type Language } from '@/i18n';
import { skillAreas, type SkillArea } from '@/data/skillAreas';
import SkillButton from '@/components/ui/SkillButton';
import SkillDetailPanel from '@/components/ui/SkillDetailPanel';

interface SkillsCommandCenterProps {
  projects: Array<{
    title: string;
    titleEn?: string;
    href: string;
    tags: string[];
  }>;
}

type ProjectLike = SkillsCommandCenterProps['projects'][number];

function uniqByHref<T extends { href: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((i) => {
    if (seen.has(i.href)) return false;
    seen.add(i.href);
    return true;
  });
}

function matchProjectsForTags(projects: ProjectLike[], tags: string[]) {
  const needles = tags.map((t) => t.toLowerCase());
  return projects.filter((p) => p.tags.some((tag) => needles.some((n) => tag.toLowerCase().includes(n))));
}

function iconFor(id: SkillArea['id']) {
  // Minimal icons (no extra deps)
  const common = 'h-5 w-5 text-accent-from';
  if (id === 'mobile')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    );
  if (id === 'backend')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  if (id === 'ai')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.95-6.95l-2.12 2.12M8.17 15.83l-2.12 2.12m0-12.07l2.12 2.12m9.66 9.66l2.12 2.12" />
      </svg>
    );
  if (id === 'devops')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h10a4 4 0 000-8h-.3A6 6 0 006 9.3 4.5 4.5 0 003 15z" />
      </svg>
    );
  if (id === 'architecture')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4l8 4-8 4-8-4 8-4zm0 8v8m-8-6l8 4 8-4" />
      </svg>
    );
  return (
    <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function SkillsCommandCenter({ projects }: SkillsCommandCenterProps) {
  const [lang, setLang] = useState<Language>('tr');
  useEffect(() => setLang(getDefaultLanguage()), []);
  const t = useMemo(() => getTranslations(lang), [lang]);
  const c = t.home.skillsCommandCenter;

  const panelId = useId();

  const [selectedId, setSelectedId] = useState<SkillArea['id'] | null>(null);
  const selectedArea = useMemo(() => skillAreas.find((a) => a.id === selectedId) ?? undefined, [selectedId]);

  // Enrich with auto-linked projects if tagHints exist and explicit list is empty.
  const resolvedArea = useMemo(() => {
    if (!selectedArea) return undefined;
    if (selectedArea.projects.length) return selectedArea;
    if (!selectedArea.projectTagHints?.length) return selectedArea;
    const matched = uniqByHref(
      matchProjectsForTags(projects, selectedArea.projectTagHints).map((p) => ({
        name: lang === 'tr' ? p.title : p.titleEn || p.title,
        href: p.href,
      }))
    );
    return { ...selectedArea, projects: matched };
  }, [selectedArea, projects, lang]);

  // Mobile bottom sheet
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!isMobile) setSheetOpen(false);
  }, [isMobile]);

  const openDetail = (id: SkillArea['id']) => {
    setSelectedId(id);
    if (isMobile) setSheetOpen(true);
  };

  const closeDetail = () => {
    setSelectedId(null);
    setSheetOpen(false);
  };

  return (
    <div className="card scroll-reveal">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12">
        {/* Left: areas */}
        <div className="lg:col-span-3">
          <div className="hidden lg:block">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-light-muted">{c.leftTitle}</div>
            <div className="space-y-2" role="listbox" aria-label={c.leftTitle}>
              {skillAreas.map((a) => (
                <SkillButton
                  key={a.id}
                  active={selectedId === a.id}
                  label={a.label[lang]}
                  icon={iconFor(a.id)}
                  onClick={() => openDetail(a.id)}
                  ariaControls={panelId}
                />
              ))}
            </div>
          </div>

          {/* Mobile: scrollable chips */}
          <div className="lg:hidden">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-light-muted">{c.leftTitle}</div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {skillAreas.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => openDetail(a.id)}
                  aria-selected={selectedId === a.id}
                  className={[
                    'shrink-0 rounded-full border px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all min-h-[44px]',
                    selectedId === a.id
                      ? 'border-accent-from/40 bg-white/[0.08] text-light-text'
                      : 'border-white/10 bg-white/[0.05] text-light-muted hover:text-light-text',
                  ].join(' ')}
                >
                  {a.label[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: identity */}
        <div className="lg:col-span-4">
          <div className="rounded-[20px] sm:rounded-[24px] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">{c.identityEyebrow}</div>
            <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold leading-tight text-light-text">{c.identityTitle}</h3>
            <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-light-muted">{c.identitySubtitle}</p>

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-[20px] sm:rounded-[24px] bg-gradient-to-r from-accent-from to-accent-to px-4 sm:px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-from focus:ring-offset-2 focus:ring-offset-dark-bg min-h-[44px]"
              >
                {c.primaryCta}
              </a>
            </div>
          </div>
        </div>

        {/* Right: detail */}
        <div className="lg:col-span-5 hidden lg:block">
          <SkillDetailPanel
            open={Boolean(resolvedArea)}
            area={resolvedArea}
            lang={lang}
            panelId={panelId}
            onClose={closeDetail}
            labels={{
              title: c.detailTitle,
              hint: c.detailHint,
              usedIn: c.usedIn,
              tech: c.tech,
              close: c.close,
              noProjects: c.noProjects,
            }}
          />
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {isMobile && sheetOpen ? (
        <div className="fixed inset-0 z-[55] lg:hidden" role="dialog" aria-modal="true" aria-label={c.sheetTitle}>
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeDetail}
            aria-label={c.close}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[24px] border border-white/10 bg-dark-bg/95 p-4 sm:p-5 backdrop-blur-md">
            <div className="mb-3 sm:mb-4 flex items-start justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">{c.sheetTitle}</div>
                <div className="mt-2 text-lg sm:text-xl font-semibold leading-tight text-light-text">{resolvedArea?.label[lang]}</div>
              </div>
              <button
                type="button"
                className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-light-text transition-all hover:border-accent-from/35 focus:outline-none focus:ring-2 focus:ring-accent-from/60"
                onClick={closeDetail}
                aria-label={c.close}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {resolvedArea ? (
              <div>
                <p className="text-sm leading-relaxed text-light-muted">{resolvedArea.description[lang]}</p>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">{c.tech}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {resolvedArea.tech.map((tt) => (
                      <span key={tt} className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-light-text backdrop-blur-md">
                        {tt}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">{c.usedIn}</div>
                  {resolvedArea.projects.length ? (
                    <div className="mt-3 space-y-2">
                      {resolvedArea.projects.map((p) => (
                        <a
                          key={p.href}
                          href={p.href}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-light-text transition-all hover:border-accent-from/35 hover:bg-white/[0.05]"
                          target={p.href.startsWith('http') ? '_blank' : undefined}
                          rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          <span className="font-medium">{p.name}</span>
                          <svg className="h-4 w-4 text-accent-from" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm text-light-muted">{c.noProjects}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-light-muted">{c.detailHint}</p>
            )}
          </div>
        </div>
      ) : null}

    </div>
  );
}


