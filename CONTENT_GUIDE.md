# İçerik Güncelleme Rehberi

Bu dosya, portföy sitesindeki içerikleri nasıl güncelleyeceğinizi açıklar.

## 📁 Dosya Yapısı

### Site Bilgileri
**Dosya:** `src/data/site.ts`

Bu dosyada kişisel bilgileriniz bulunur:
- `name`: İsminiz
- `role`: Mesleğiniz/Unvanınız
- `tagline`: Kısa açıklama (hero section'da görünür)
- `description`: Uzun açıklama (SEO için)
- `links`: Sosyal medya ve iletişim linkleri
- `availability`: Durum mesajı

**Örnek:**
```typescript
export const site = {
  name: 'Atilla',
  role: 'Mobile Developer',
  tagline: 'Flutter, Android, Firebase, UI/UX, Performans',
  // ...
};
```

### Projeler
**Dosya:** `src/data/projects.ts`

Ana sayfada gösterilecek projeleri burada tanımlayın:

```typescript
export const selectedProjects: Project[] = [
  {
    number: '01',
    title: 'Proje Adı',
    description: 'Proje açıklaması',
    tags: ['Flutter', 'Firebase'],
    href: '/projects/proje-slug',
  },
  // ...
];
```

### Yetenekler (Skills)
**Dosya:** `src/data/skills.ts`

İki tip skill verisi var:

1. **SkillSwarm için ikonlar** (`skills` array):
   - `id`: Benzersiz ID
   - `label`: Görünen isim
   - `src`: İkon URL'si (SVG önerilir)

2. **Pill badges için** (`skillPills` array):
   - Sadece string array

**Örnek:**
```typescript
export const skills: Skill[] = [
  {
    id: 'flutter',
    label: 'Flutter',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  },
  // ...
];
```

## 🎨 Tasarım Token'ları

Renkler ve stiller `tailwind.config.mjs` ve `src/styles/global.css` dosyalarında tanımlı:

- **Arka plan:** `#070A10` (dark.bg)
- **Metin:** `#E6EAF2` (light.text)
- **Muted metin:** `rgba(230, 234, 242, 0.7)` (light.muted)
- **Border:** `rgba(255, 255, 255, 0.10)` (dark.border)
- **Kart arka plan:** `rgba(255, 255, 255, 0.04)` (dark.surface)
- **Gradient:** `#7C3AED` → `#22D3EE` (accent.from → accent.to)

## 📄 Sayfa İçerikleri

### Ana Sayfa
**Dosya:** `src/pages/index.astro`

Ana sayfa şu bölümlerden oluşur:
1. **Hero Section**: Büyük başlık ve CTA butonları
2. **Availability Badge**: Durum rozeti
3. **Card Grid**: 5 farklı kart (collaboration, passionate, timezone, work together, browser mock)
4. **Skills Section**: SkillSwarm interaktif bileşeni
5. **Selected Work**: Seçili projeler

### Navbar
**Dosya:** `src/components/Navbar.astro`

Menü öğelerini `navItems` array'inde güncelleyin:
```typescript
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/cv', label: 'About' },
  // ...
];
```

## 🖼️ Görseller

Görseller için:
- **Favicon:** `public/favicon.svg`
- **Proje görselleri:** `public/` klasörüne ekleyin
- **İkonlar:** CDN'den SVG kullanın (devicons, simple-icons vb.)

## 🔧 Özelleştirme

### Kart Grid Düzeni
`src/pages/index.astro` içinde kartların `span` prop'larını değiştirerek düzeni ayarlayabilirsiniz:
- `full`: 12 kolon (tam genişlik)
- `two-thirds`: 8 kolon
- `half`: 6 kolon
- `third`: 4 kolon

### Animasyonlar
- Scroll reveal: `.scroll-reveal` class'ı otomatik çalışır
- Hover efektleri: Kartlarda otomatik
- Reduced motion: Otomatik algılanır ve devre dışı bırakılır

## 📝 Notlar

- Tüm içerikler TypeScript ile tip güvenli
- SEO meta tag'leri `BaseLayout.astro`'da otomatik oluşturulur
- Responsive tasarım: 320px'den başlar, mobile-first yaklaşım
- Accessibility: ARIA labels, semantic HTML, keyboard navigation

## 🚀 Güncelleme Adımları

1. İlgili data dosyasını açın (`src/data/`)
2. Değerleri güncelleyin
3. TypeScript hatalarını kontrol edin
4. `npm run dev` ile test edin
5. `npm run build` ile production build alın




