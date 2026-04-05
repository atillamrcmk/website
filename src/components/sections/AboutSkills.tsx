import { aboutSkillsContent } from '@/data/aboutSkills';

type Lang = 'tr' | 'en';

interface ProjectPreview {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  tags: string[];
}

interface AboutSkillsProps {
  lang: Lang;
  projects: ProjectPreview[];
}

function Icon({ name }: { name: string }) {
  const common = 'h-5 w-5 text-accent-from';
  if (name === 'mobile')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    );
  if (name === 'backend')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  if (name === 'database')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4zm0 5c0 2.2 3.6 4 8 4s8-1.8 8-4m-16 5c0 2.2 3.6 4 8 4s8-1.8 8-4" />
      </svg>
    );
  if (name === 'ai')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.95-6.95l-2.12 2.12M8.17 15.83l-2.12 2.12m0-12.07l2.12 2.12m9.66 9.66l2.12 2.12" />
      </svg>
    );
  if (name === 'devops')
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h10a4 4 0 000-8h-.3A6 6 0 006 9.3 4.5 4.5 0 003 15z" />
      </svg>
    );
  return (
    <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6l8 4-8 4-8-4 8-4zm0 8v8m-8-6l8 4 8-4" />
    </svg>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-light-text backdrop-blur-md">
      {label}
    </span>
  );
}

export default function AboutSkills({ lang, projects }: AboutSkillsProps) {
  const base = `/${lang}`;
  const c = aboutSkillsContent;
  const H = (key: keyof typeof c.headings) => c.headings[key][lang];

  const previews = projects.slice(0, 3).map((p) => ({
    title: lang === 'tr' ? p.title : p.titleEn || p.title,
    description: lang === 'tr' ? p.description : p.descriptionEn || p.description,
    tags: p.tags.slice(0, 4),
  }));

  return (
    <div className="mb-16">
      {/* A) CORE SKILLS */}
      <div className="mb-12 scroll-reveal">
        <h2 className="mb-6 text-3xl font-bold text-light-text sm:text-4xl">{H('core')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.coreCards.map((card) => (
            <div key={card.id} className="card card-hover">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon name={card.icon} />
                </span>
                <h3 className="text-lg font-semibold text-light-text">{card.title[lang]}</h3>
              </div>
              <p className="text-sm leading-relaxed text-light-muted">{card.description[lang]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.chips.map((chip) => (
                  <Chip key={chip} label={chip} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* B) WHAT I DELIVER */}
      <div className="mb-12 scroll-reveal">
        <h2 className="mb-6 text-3xl font-bold text-light-text sm:text-4xl">{H('deliver')}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <ul className="space-y-3" role="list">
              {c.deliverLeft[lang].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-accent-from" aria-hidden="true">▸</span>
                  <span className="text-base leading-relaxed text-light-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="text-xs font-semibold uppercase tracking-wide text-light-muted">
              {lang === 'tr' ? 'How I work' : 'How I work'}
            </div>
            <ul className="mt-4 space-y-3" role="list">
              {c.howIWork[lang].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-accent-from" aria-hidden="true">✓</span>
                  <span className="text-base leading-relaxed text-light-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* C) PROOF / HIGHLIGHTS */}
      <div className="scroll-reveal">
        <h2 className="mb-6 text-3xl font-bold text-light-text sm:text-4xl">{H('selectedWork')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {previews.map((p) => (
            <a
              key={p.title}
              href={`${base}/projects`}
              className="card card-hover block"
              aria-label={`${c.proof.viewProject[lang]}: ${p.title}`}
            >
              <h3 className="text-lg font-semibold text-light-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-light-muted">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-from">
                {c.proof.viewProject[lang]}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 card border-accent-from/20 bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-base leading-relaxed text-light-muted">{c.proof.ctaBar.text[lang]}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`${base}/contact`}
                className="inline-flex items-center justify-center rounded-[24px] bg-gradient-to-r from-accent-from to-accent-to px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-from focus:ring-offset-2 focus:ring-offset-dark-bg"
              >
                {c.proof.ctaBar.primary[lang]}
              </a>
              <a
                href={`${base}/projects`}
                className="inline-flex items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-light-text backdrop-blur-md transition-all hover:border-accent-from/50 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent-from focus:ring-offset-2 focus:ring-offset-dark-bg"
              >
                {c.proof.ctaBar.secondary[lang]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


