# SkillSwarm Component

Interactive magnetic/swarm-style skills visualization component with physics-based animations.

## Features

- 🧲 **Magnetic Effect**: Icons are attracted to cursor/touch position
- 🔄 **Spring Physics**: Smooth return to home positions when cursor leaves
- 🎨 **Glassmorphism**: Modern glass effect with backdrop blur
- ♿ **Accessible**: Full keyboard navigation and ARIA labels
- 📱 **Touch Support**: Works on mobile and tablet devices
- ⚡ **Performance**: Optimized with `requestAnimationFrame` and `will-change`
- 🎛️ **Customizable**: Adjustable physics parameters

## Usage

### Astro

```astro
---
import SkillSwarm from '@/components/SkillSwarm';
import iconsData from '@/data/icons.json';
---

<SkillSwarm client:load icons={iconsData} />
```

### Next.js / React

```tsx
import SkillSwarm from '@/components/SkillSwarm';
import iconsData from '@/data/icons.json';

export default function Page() {
  return <SkillSwarm icons={iconsData} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icons` | `Icon[]` | **required** | Array of icon objects |
| `maxAttractDist` | `number` | `150` | Maximum distance for attraction (px) |
| `attractStrength` | `number` | `0.02` | Strength of attraction force |
| `repelStrength` | `number` | `0.15` | Strength of repulsion force |
| `springK` | `number` | `0.08` | Spring constant for return animation |
| `damping` | `number` | `0.85` | Damping factor (0-1, lower = more damping) |

## Icon Data Structure

```typescript
interface Icon {
  id: string;        // Unique identifier
  label: string;     // Accessible label (aria-label)
  src: string;       // Image URL or path
}
```

### Example

```json
[
  {
    "id": "flutter",
    "label": "Flutter",
    "src": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
  }
]
```

## Customization

### Adjusting Physics

Fine-tune the behavior by adjusting props:

```astro
<SkillSwarm 
  client:load 
  icons={iconsData}
  maxAttractDist={200}
  attractStrength={0.03}
  repelStrength={0.2}
  springK={0.1}
  damping={0.9}
/>
```

**Parameter Guide:**

- **maxAttractDist**: How far the cursor can be to attract icons (larger = wider range)
- **attractStrength**: How strongly icons are pulled toward cursor (higher = stronger pull)
- **repelStrength**: How strongly icons push away when too close (higher = more push)
- **springK**: How quickly icons return to home (higher = faster return)
- **damping**: How much velocity is reduced each frame (lower = more damping, smoother)

### Styling

The component uses Tailwind CSS classes. To customize:

1. Edit the component's className props
2. Override with custom CSS using the component's class names
3. Modify the inline styles for glassmorphism effects

## Accessibility

- ✅ Full keyboard navigation (Tab to focus icons)
- ✅ ARIA labels on all icons
- ✅ Title tooltips
- ✅ Focus rings for keyboard users
- ✅ Respects `prefers-reduced-motion`

## Performance

- Uses `requestAnimationFrame` for smooth 60fps animations
- `will-change: transform` for GPU acceleration
- Minimal layout thrashing (only calculates positions on init/resize)
- Efficient collision detection between icons

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires CSS `backdrop-filter` support for glassmorphism effect

## Troubleshooting

### Icons not moving

- Check that `client:load` is used in Astro
- Verify `prefers-reduced-motion` is not enabled
- Ensure container has proper dimensions

### Performance issues

- Reduce number of icons
- Lower `maxAttractDist` value
- Increase `damping` for smoother but slower animations

### Touch not working

- Ensure `touch-action: none` is set (handled by component)
- Check that touch events are not being prevented elsewhere




