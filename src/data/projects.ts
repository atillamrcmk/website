export interface Project {
  number: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  tags: string[];
  href: string;
}

export const selectedProjects: Project[] = [
  {
    number: '01',
    title: 'CV Jobs',
    titleEn: 'CV Jobs',
    description:
      'CV\'nizdeki meslek ve yeteneklere göre iş ilanları öneren Flutter uygulaması. JSearch API kullanıyor.',
    descriptionEn:
      'Flutter app that suggests job listings based on your CV\'s profession and skills. Uses JSearch API.',
    tags: ['Flutter', 'Dart', 'REST APIs', 'JSearch API'],
    href: 'https://github.com/atillamrcmk/cv_jobs',
  },
  {
    number: '02',
    title: 'Kriz Asistani',
    titleEn: 'Crisis Assistant',
    description:
      'Kriz anlarında yardım sağlayan Flutter tabanlı mobil uygulama. Acil durum yönetimi ve iletişim özellikleri ile geliştirildi.',
    descriptionEn:
      'Flutter-based mobile app that provides assistance during crisis situations. Developed with emergency management and communication features.',
    tags: ['Flutter', 'Dart', 'Mobile'],
    href: 'https://github.com/atillamrcmk/kriz_asistani',
  },
  {
    number: '03',
    title: 'Meeting App',
    titleEn: 'Meeting App',
    description:
      'WebRTC tabanlı video konferans uygulaması. Gerçek zamanlı chat ve oda desteği ile geliştirildi.',
    descriptionEn:
      'WebRTC-based video conferencing application. Developed with real-time chat and room support.',
    tags: ['JavaScript', 'WebRTC', 'Node.js', 'Real-time'],
    href: 'https://github.com/atillamrcmk/meeting-app',
  },
  {
    number: '04',
    title: 'HizliMarket',
    titleEn: 'HizliMarket',
    description:
      'Basit barkodlu satış otomasyonu. C# ve WinForms ile geliştirilmiş masaüstü uygulaması.',
    descriptionEn:
      'Simple barcode-based sales automation. Desktop application developed with C# and WinForms.',
    tags: ['C#', '.NET', 'WinForms', 'Desktop'],
    href: 'https://github.com/atillamrcmk/HizliMarket',
  },
  {
    number: '05',
    title: 'Flutter Weather App',
    titleEn: 'Flutter Weather App',
    description:
      'Flutter ile geliştirilmiş hava durumu uygulaması. Modern UI ve gerçek zamanlı veri ile çalışır.',
    descriptionEn:
      'Weather application developed with Flutter. Works with modern UI and real-time data.',
    tags: ['Flutter', 'Dart', 'Weather API', 'Mobile'],
    href: 'https://github.com/atillamrcmk/flutter_weather_app',
  },
];

