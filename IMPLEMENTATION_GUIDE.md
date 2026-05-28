# The Dev Bhoomi Foundation - Implementation & Style Guide

## 🎯 Quick Reference

### Primary Colors
```tsx
// Use in Tailwind
bg-primary-900     // #0B3C5D
text-primary-900   // #0B3C5D
bg-accent-500      // #E58A1F
text-accent-600    // #E58A1F
```

### Gradients
```tsx
// Tailwind gradient backgrounds
className="bg-gradient-primary"      // Primary blue gradient
className="bg-gradient-accent"       // Orange gradient
className="bg-gradient-hero"         // Multi-color hero gradient
className="bg-gradient-dark"         // Dark navy gradient
className="bg-gradient-soft"         // Soft background gradient
```

### Typography
```tsx
// Font usage
className="font-heading"             // Poppins (headings)
className="font-body"                // Inter (body text)
className="font-accent"              // Cormorant Garamond (optional)

// Sizes
className="text-xs"  // 12px
className="text-sm"  // 14px
className="text-base" // 16px
className="text-lg"  // 18px
className="text-xl"  // 20px
className="text-2xl" // 24px
className="text-3xl" // 30px
className="text-4xl" // 36px
className="text-5xl" // 48px

// Weights
className="font-light"     // 300
className="font-normal"    // 400
className="font-medium"    // 500
className="font-semibold"  // 600
className="font-bold"      // 700
```

### Spacing
```tsx
// Use these consistently
p-md   // 16px padding
m-lg   // 24px margin
gap-xl // 32px gap between grid items
```

---

## 🧩 Component Usage

### Button Variants
```tsx
import { Button } from "@/components/ui";

// Primary Button
<Button variant="primary" size="md">
  Click Me
</Button>

// Accent Button
<Button variant="accent" size="lg">
  Donate Now
</Button>

// Secondary Button
<Button variant="secondary">
  Learn More
</Button>

// Outline Button
<Button variant="outline">
  Cancel
</Button>

// Ghost Button
<Button variant="ghost">
  Minimal Button
</Button>

// Animated Button
<Button animated>
  Hover for animation
</Button>
```

### Cards
```tsx
import { Card } from "@/components/ui";

// Basic Card
<Card>
  Content here
</Card>

// Hoverable Card
<Card hover>
  Hover for elevation effect
</Card>

// With custom className
<Card className="h-full">
  Custom styling
</Card>
```

### Section Component
```tsx
import { Section } from "@/components/ui";

// Section with title and subtitle
<Section
  title="Our Impact"
  subtitle="Making a difference"
  className="bg-primary-50"
>
  {/* Content */}
</Section>

// Full-width section
<Section fullWidth className="bg-gradient-primary text-white">
  {/* Content */}
</Section>
```

### Badge
```tsx
import { Badge } from "@/components/ui";

// Default Badge
<Badge>Default</Badge>

// Colored Badges
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Icon Box
```tsx
import { IconBox } from "@/components/ui";
import { Heart } from "lucide-react";

// Size and variant options
<IconBox size="md" variant="accent">
  <Heart className="h-6 w-6" />
</IconBox>

// Size: sm | md | lg
// Variant: primary | accent | secondary
```

---

## 🎨 Common Pattern Examples

### Hero Section with Gradient
```tsx
<div className="relative min-h-screen bg-gradient-hero overflow-hidden pt-20">
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated background elements */}
  </div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</div>
```

### Premium Card Layout
```tsx
<Card hover className="flex flex-col">
  <div className="h-40 bg-gradient-primary rounded-lg mb-4" />
  
  <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">
    Title
  </h3>
  
  <p className="text-sm text-primary-600 dark:text-primary-300 mb-4 flex-1">
    Description
  </p>
  
  <button className="w-full py-2 rounded-lg bg-gradient-accent text-white font-semibold hover:shadow-lg transition-all">
    Action
  </button>
</Card>
```

### Form Input
```tsx
<div>
  <label className="block text-sm font-medium text-primary-900 dark:text-white mb-2">
    Label
  </label>
  <input
    type="text"
    placeholder="Enter value"
    className="w-full px-4 py-2 border border-primary-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
  />
</div>
```

### Grid Section
```tsx
<Section title="Section Title" subtitle="Subtitle here">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} hover>
          {/* Card content */}
        </Card>
      ))}
    </div>
  </div>
</Section>
```

---

## 🌓 Dark Mode Guidelines

### Always Test Both Modes
```tsx
// Light mode defaults
className="bg-white text-primary-900"

// Dark mode overrides
className="dark:bg-slate-800 dark:text-white"

// Combined properly
className="bg-white dark:bg-slate-900 text-primary-900 dark:text-white"
```

### Dark Mode Card Example
```tsx
<div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-primary-100 dark:border-slate-700 rounded-2xl p-6">
  <h3 className="text-primary-900 dark:text-white">Title</h3>
  <p className="text-primary-600 dark:text-primary-300">Description</p>
</div>
```

---

## ✨ Animation Guidelines

### Framer Motion Animations
```tsx
import { motion } from "framer-motion";

// Fade Up Animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Hover Animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Hover me
</motion.button>

// Stagger Children
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.1 }}
>
  {items.map((item) => (
    <motion.div key={item.id} initial={{ y: 20 }} animate={{ y: 0 }}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Tailwind Animations
```tsx
// Built-in animations
className="animate-fade-up"      // Fade and move up
className="animate-fade-in"      // Simple fade
className="animate-float"        // Floating effect
className="animate-shimmer"      // Skeleton shimmer
className="animate-pulse-soft"   // Gentle pulse
```

---

## 📱 Responsive Classes

### Breakpoint Usage
```tsx
// Mobile first approach
className="px-4 sm:px-6 lg:px-8"
className="text-2xl md:text-3xl lg:text-4xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Common patterns
className="hidden md:block"      // Hide on mobile
className="md:hidden"            // Show only on mobile
className="w-full lg:w-1/2"      // Responsive width
```

---

## 🎯 Navigation Patterns

### Navbar Links with Underline
```tsx
<a href="/link" className="relative group">
  Link Text
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
</a>
```

### Mobile Menu Animation
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      {/* Menu content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 📊 Data Visualization Patterns

### Progress Bar
```tsx
<div className="w-full h-2 bg-primary-200 dark:bg-slate-700 rounded-full overflow-hidden">
  <div
    className="h-full bg-gradient-accent transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

### Stat Cards
```tsx
<Card>
  <div className="text-3xl md:text-4xl font-bold text-accent-600 mb-1">
    {value}
  </div>
  <div className="text-primary-600 dark:text-primary-300 font-medium">
    {label}
  </div>
</Card>
```

### Timeline
```tsx
<div className="flex gap-6">
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
      1
    </div>
    {i < items.length - 1 && (
      <div className="w-1 h-20 bg-gradient-to-b from-accent-500 to-transparent mt-2" />
    )}
  </div>
  <div className="pt-2">
    <h3 className="font-semibold">{item.title}</h3>
    <p>{item.description}</p>
  </div>
</div>
```

---

## 🔐 Accessibility Checklist

- [ ] Color contrast meets WCAG AA standard
- [ ] All interactive elements are keyboard accessible
- [ ] Form labels are properly associated
- [ ] Images have meaningful alt text
- [ ] ARIA attributes used appropriately
- [ ] Focus indicators are visible
- [ ] Touch targets are 44px minimum
- [ ] Semantic HTML is used
- [ ] Page structure is logical
- [ ] Error messages are clear and helpful

---

## ⚡ Performance Tips

1. **Lazy Loading:** Use Next.js `<Image>` component
2. **Code Splitting:** Use dynamic imports for heavy components
3. **Animation Performance:** Use GPU-accelerated transforms
4. **Bundle Size:** Tree-shake unused Tailwind classes
5. **Caching:** Leverage Next.js ISR and caching strategies
6. **Compression:** Optimize images with next/image

---

## 🚀 Common Implementations

### Alert Box
```tsx
<div className="p-4 rounded-lg bg-success/10 dark:bg-success/20 border border-success/30 text-success">
  <p className="font-medium">Success message</p>
</div>
```

### Loading Skeleton
```tsx
<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="h-20 bg-primary-200 dark:bg-slate-700 rounded-lg animate-shimmer" />
  ))}
</div>
```

### Modal Overlay
```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-md"
  >
    {/* Modal content */}
  </motion.div>
</div>
```

### Empty State
```tsx
<div className="text-center py-12">
  <div className="text-6xl mb-4">📭</div>
  <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
    No items found
  </h3>
  <p className="text-primary-600 dark:text-primary-300 mb-4">
    Try adjusting your filters
  </p>
  <Button>Clear filters</Button>
</div>
```

---

## 📚 Resources

- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion/
- **Lucide Icons:** https://lucide.dev
- **Next.js:** https://nextjs.org
- **React 19:** https://react.dev

---

## 🎓 Best Practices

1. **Keep Components Small:** Single responsibility principle
2. **Use Composition:** Build complex UIs from simple parts
3. **Consistent Naming:** Use clear, descriptive names
4. **DRY Principle:** Don't repeat yourself
5. **Accessible First:** Build for everyone
6. **Mobile First:** Design for small screens first
7. **Test in Dark Mode:** Always verify both themes
8. **Performance First:** Optimize critical paths

---

**Last Updated:** May 2024
**Version:** 1.0
**Status:** Production-Ready
