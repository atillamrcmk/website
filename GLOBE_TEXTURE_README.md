# Globe Texture (globe-dots.png)

## Mevcut Durum

Şu anda `src/assets/globe-dots.svg` olarak SVG placeholder oluşturuldu. Bu SVG yüksek kalitede render edilir ve çalışır, ancak PNG formatı tercih ediliyorsa aşağıdaki adımları izleyin.

## PNG'ye Çevirme

### Yöntem 1: Online Converter
1. `src/assets/globe-dots.svg` dosyasını açın
2. [CloudConvert](https://cloudconvert.com/svg-to-png) veya benzeri bir servis kullanın
3. Çözünürlük: 2048x2048 veya daha yüksek
4. Çıktıyı `src/assets/globe-dots.png` olarak kaydedin

### Yöntem 2: Inkscape (Desktop)
```bash
inkscape src/assets/globe-dots.svg --export-filename=src/assets/globe-dots.png --export-width=2048 --export-height=2048
```

### Yöntem 3: ImageMagick
```bash
magick convert -background none -density 300 src/assets/globe-dots.svg -resize 2048x2048 src/assets/globe-dots.png
```

## Görsel Gereksinimleri

- **Format**: PNG (transparent background)
- **Boyut**: Minimum 2048x2048 (4K kalite)
- **Stil**: 
  - Üst yarı: Koyu gradient (siyah → koyu lacivert)
  - Alt yarı: Yarı görünür 3D dünya küresi
  - Kıtalar: Yüzlerce küçük, parlayan nokta (beyaz → yumuşak cyan/mavi)
  - Rim light: Mavi kenar ışığı (halo efekti)
  - Atmosferik haze ve light bloom
- **Renkler**: Derin siyah, koyu lacivert, yumuşak cyan, elektrik mavisi
- **Lokasyon**: Türkiye/Doğu Avrupa bölgesi net görünür olmalı (Erzurum yakınları için marker yerleştirme)

## Component Kullanımı

DotGlobe component'i otomatik olarak:
1. Önce PNG'yi yüklemeye çalışır (`globe-dots.png`)
2. PNG yoksa SVG'yi kullanır (`globe-dots.svg`)
3. Her ikisi de yoksa CSS fallback pattern gösterir

## Not

SVG formatı zaten yüksek kalitede ve responsive. PNG'ye çevirmek performans açısından gerekli değil, ancak tercih edilebilir.




