export interface SkillAreaProject {
  name: string;
  href: string;
}

export interface SkillArea {
  id: 'mobile' | 'backend' | 'ai' | 'devops' | 'architecture' | 'production';
  label: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  tech: string[];
  /**
   * Optional explicit project links. If empty, the UI will show a general statement (no placeholders).
   */
  projects: SkillAreaProject[];
  /**
   * Optional tag hints to auto-link from src/data/projects.ts (selectedProjects).
   */
  projectTagHints?: string[];
}

// No fabricated metrics; keep copy outcome/process oriented.
export const skillAreas: SkillArea[] = [
  {
    id: 'mobile',
    label: { tr: 'Mobile', en: 'Mobile' },
    description: {
      tr: 'Ürün seviyesinde mobil deneyimler geliştiririm: UI tutarlılığı, state akışı ve entegrasyonları sürdürülebilir tutmaya odaklanırım.',
      en: 'I build product-grade mobile experiences with consistent UI, clear state flows, and maintainable integrations.',
    },
    tech: ['Flutter', 'Dart', 'Firebase', 'State', 'Performance'],
    projects: [],
    projectTagHints: ['Flutter', 'Dart', 'Mobile'],
  },
  {
    id: 'backend',
    label: { tr: 'Backend', en: 'Backend' },
    description: {
      tr: 'API sözleşmelerini sade ve öngörülebilir tasarlarım: auth, hata akışları ve veri erişim katmanını net sınırlarla kurarım.',
      en: 'I design predictable APIs: auth, error flows, and data access layers with clear boundaries.',
    },
    tech: ['Node.js', 'REST', 'Auth', 'DB', 'Logging'],
    projects: [],
    projectTagHints: ['Node.js', 'REST', 'Real-time'],
  },
  {
    id: 'ai',
    label: { tr: 'AI / ML', en: 'AI / ML' },
    description: {
      tr: 'Otomasyon ve Computer Vision ihtiyaçlarında önce küçük PoC’larla doğrular, ardından ürüne temiz bir entegrasyonla taşırım.',
      en: 'For automation and computer vision, I validate with small PoCs and then integrate cleanly into the product.',
    },
    tech: ['Python', 'OpenCV', 'Pipelines', 'Integration'],
    projects: [],
    projectTagHints: ['OpenCV', 'Python'],
  },
  {
    id: 'devops',
    label: { tr: 'DevOps', en: 'DevOps' },
    description: {
      tr: 'Üretime çıkışı kontrollü hale getiririm: deploy akışı, temel güvenlik ve bakım kolaylığı önceliğimdir.',
      en: 'I make shipping predictable with controlled deploy flows, baseline security, and maintainable ops.',
    },
    tech: ['Deploy', 'CI/CD', 'SSL', 'Nginx'],
    projects: [],
  },
  {
    id: 'architecture',
    label: { tr: 'Architecture', en: 'Architecture' },
    description: {
      tr: 'Modül sınırlarını ve sorumlulukları netleştiririm; büyüyen projede “karmaşıklık” yerine “sistem” olmasını hedeflerim.',
      en: 'I clarify boundaries and responsibilities so a growing codebase stays a system—not a mess.',
    },
    tech: ['Modularity', 'State', 'API', 'DB'],
    projects: [],
  },
  {
    id: 'production',
    label: { tr: 'Production', en: 'Production' },
    description: {
      tr: 'Kalite ve gözlemlenebilirliği önemserim: loglama, hata yakalama ve performans gözlemiyle üretimde güven verir.',
      en: 'I care about quality and visibility: logging, error handling, and performance checks for production confidence.',
    },
    tech: ['Logging', 'Monitoring', 'Performance', 'Docs'],
    projects: [],
  },
];


