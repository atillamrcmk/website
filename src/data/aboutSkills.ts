export interface AboutSkillCard {
  id: string;
  icon: 'mobile' | 'backend' | 'database' | 'ai' | 'devops' | 'architecture';
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  chips: string[];
}

export interface AboutSkillsContent {
  headings: {
    core: { tr: string; en: string };
    deliver: { tr: string; en: string };
    selectedWork: { tr: string; en: string };
  };
  coreCards: AboutSkillCard[];
  deliverLeft: { tr: string[]; en: string[] };
  howIWork: { tr: string[]; en: string[] };
  proof: {
    ctaBar: {
      text: { tr: string; en: string };
      primary: { tr: string; en: string };
      secondary: { tr: string; en: string };
    };
    viewProject: { tr: string; en: string };
  };
}

// No fabricated metrics; keep copy outcome/process oriented and recruiting-friendly.
export const aboutSkillsContent: AboutSkillsContent = {
  headings: {
    core: { tr: 'Uzmanlık Alanlarım', en: 'Core Expertise' },
    deliver: { tr: 'Neler Teslim Ederim?', en: 'What I deliver' },
    selectedWork: { tr: 'Seçilmiş Çalışmalar', en: 'Selected Work' },
  },
  coreCards: [
    {
      id: 'mobile',
      icon: 'mobile',
      title: { tr: 'Mobile (Flutter)', en: 'Mobile (Flutter)' },
      description: {
        tr: 'Ürün seviyesinde UI ve state akışını sade tutarak sürdürülebilir mobil deneyimler geliştiririm.',
        en: 'I build product-grade mobile experiences with clean UI and simple state flows.',
      },
      chips: ['Flutter', 'Dart', 'State', 'Performance'],
    },
    {
      id: 'backend',
      icon: 'backend',
      title: { tr: 'Backend (Node.js / REST)', en: 'Backend (Node.js / REST)' },
      description: {
        tr: 'Sözleşmesi net API’ler tasarlar; auth ve hata akışlarını öngörülebilir hale getiririm.',
        en: 'I design APIs with clear contracts and predictable auth + error flows.',
      },
      chips: ['Node.js', 'REST', 'Auth', 'Logging'],
    },
    {
      id: 'database',
      icon: 'database',
      title: { tr: 'Database (PostgreSQL / Firebase)', en: 'Database (PostgreSQL / Firebase)' },
      description: {
        tr: 'Veri modelini ürün ihtiyacına göre kurgular; erişim katmanını sade ve güvenli tutarım.',
        en: 'I model data around product needs and keep access layers simple and secure.',
      },
      chips: ['PostgreSQL', 'Firebase', 'Schema', 'Rules'],
    },
    {
      id: 'ai',
      icon: 'ai',
      title: { tr: 'AI & Computer Vision', en: 'AI & Computer Vision' },
      description: {
        tr: 'Görüntü işleme ihtiyaçlarında PoC → entegrasyon akışıyla ilerler, sınırları net tutarım.',
        en: 'For vision use-cases, I validate with PoCs then integrate with clear boundaries.',
      },
      chips: ['Python', 'OpenCV', 'Pipelines'],
    },
    {
      id: 'devops',
      icon: 'devops',
      title: { tr: 'DevOps (VPS, Nginx, SSL)', en: 'DevOps (VPS, Nginx, SSL)' },
      description: {
        tr: 'Canlıya çıkışı kontrollü kurgular; temel güvenlik ve bakım kolaylığına önem veririm.',
        en: 'I ship with controlled deploys and focus on baseline security and maintainability.',
      },
      chips: ['VPS', 'Nginx', 'PM2', 'SSL'],
    },
    {
      id: 'architecture',
      icon: 'architecture',
      title: { tr: 'Architecture & Clean Code', en: 'Architecture & Clean Code' },
      description: {
        tr: 'Modüler yapı ve okunabilir kodla büyüyen projelerde karmaşıklığı yönetilebilir tutarım.',
        en: 'I keep growing systems manageable with modular structure and readable code.',
      },
      chips: ['Modularity', 'Clean Code', 'Testing'],
    },
  ],
  deliverLeft: {
    tr: [
      'Üretime hazır mobil uygulamalar',
      'API & veri katmanı tasarımı',
      'AI entegrasyonları (görüntü işleme / inference)',
      'Canlı ortam kurulum & bakım temelleri',
    ],
    en: [
      'Production-ready mobile apps',
      'API & data-layer design',
      'AI integrations (vision / inference)',
      'Production setup & maintenance basics',
    ],
  },
  howIWork: {
    tr: [
      'Okunabilir ve sürdürülebilir kod',
      'Versiyon kontrol + düzenli teslim',
      'Hata yakalama ve loglama yaklaşımı',
      'Dokümantasyon alışkanlığı',
    ],
    en: [
      'Readable, maintainable code',
      'Version control + consistent delivery',
      'Error handling and logging approach',
      'Documentation habits',
    ],
  },
  proof: {
    viewProject: { tr: 'Projeyi Gör', en: 'View project' },
    ctaBar: {
      text: { tr: 'Bir fikir mi var? Birlikte netleştirelim.', en: 'Have an idea? Let’s shape it together.' },
      primary: { tr: 'İletişime Geç', en: 'Contact' },
      secondary: { tr: 'Projeleri Gör', en: 'View Projects' },
    },
  },
};


