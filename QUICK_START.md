# The Dev Bhoomi Foundation - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit http://localhost:3000 in your browser

---

## 📖 Documentation Quick Links

| Document | Purpose |
|----------|---------|
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Design tokens, colors, typography, spacing |
| [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) | Code patterns, component usage, examples |
| [UI_UX_DESIGN.md](./UI_UX_DESIGN.md) | Visual design philosophy, principles |
| [README_COMPLETE.md](./README_COMPLETE.md) | Project overview and architecture |
| [DELIVERABLES.md](./DELIVERABLES.md) | Complete list of features and components |

---

## 🎨 Key Files to Know

### Design System
```
lib/constants.ts          → Colors, spacing, typography, gradients
tailwind.config.ts        → Tailwind CSS configuration
app/globals.css           → Global styles and animations
```

### Components
```
components/navbar.tsx         → Navigation bar
components/footer.tsx         → Footer section
components/hero-section.tsx   → Homepage hero
components/sections.tsx       → Reusable sections
components/ui.tsx            → Button, Card, Badge components
components/dashboard.tsx     → Dashboard layouts
```

### Pages
```
app/page.tsx              → Homepage
app/about/page.tsx        → About page
app/courses/page.tsx      → Courses catalog
app/volunteer/page.tsx    → Volunteer program
app/donate/page.tsx       → Donation page
app/blogs/page.tsx        → Blog listing
app/gallery/page.tsx      → Image gallery
app/contact/page.tsx      → Contact form
app/dashboard/page.tsx    → User dashboard
```

---

## 🎯 Common Tasks

### Using Colors
```tsx
// Primary
className="bg-primary-900 text-primary-900"

// Accent
className="bg-accent-500 text-accent-600"

// Gradients
className="bg-gradient-primary"
className="bg-gradient-accent"
```

### Using Components
```tsx
import { Button, Card, Badge, Section } from "@/components/ui";

<Button variant="primary" size="lg">Click</Button>
<Card hover>Content</Card>
<Badge>Label</Badge>
<Section title="Title">Content</Section>
```

### Adding Animations
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Dark Mode Support
```tsx
// Automatically handled with next-themes
// Light mode defaults, dark mode overrides
className="bg-white dark:bg-slate-800"
className="text-gray-900 dark:text-white"
```

---

## 📱 Testing Responsive Design

### Mobile Breakpoints
- **xs:** 0px (Mobile)
- **sm:** 640px (Small Mobile)
- **md:** 768px (Tablet)
- **lg:** 1024px (Desktop)
- **xl:** 1280px (Large Desktop)

### Test Sizes
```tsx
// Mobile-first classes
className="px-4 sm:px-6 lg:px-8"        // Responsive padding
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="hidden md:block"              // Show on medium+
className="md:hidden"                    // Hide on medium+
```

---

## 🌓 Dark Mode Testing

### Enable Dark Mode
1. Click the theme toggle (Sun/Moon icon) in navbar
2. Or use browser DevTools → Elements → Toggle class "dark"

### Verify Dark Mode
- Test all pages in dark mode
- Check contrast ratios
- Verify shadows and gradients
- Test animations

---

## 🔍 Common Issues & Solutions

### Styling Not Working
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Restart dev server

### Animations Not Smooth
- Check browser DevTools → Performance
- Ensure GPU acceleration enabled
- Reduce animation count if needed

### Dark Mode Not Switching
- Check theme provider in layout
- Verify next-themes setup
- Check localStorage for theme value

### Responsive Issues
- Use mobile view in DevTools
- Test on real devices
- Check breakpoint classes
- Verify grid/flex layouts

---

## 📝 Code Style Guidelines

### File Naming
```
components/component-name.tsx    → Kebab-case
pages/page-name/page.tsx        → Kebab-case
lib/utility-name.ts             → Kebab-case
```

### Component Structure
```tsx
"use client";              // Mark client components

import React from "react";
import { MotionComponent } from "framer-motion";
import { Icon } from "lucide-react";

interface ComponentProps {
  // Props interface
}

export function Component({ ...props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Tailwind Classes Order
```
1. Layout (flex, grid, display)
2. Sizing (w, h)
3. Spacing (p, m, gap)
4. Colors (bg, text)
5. Borders (border, rounded)
6. Effects (shadow, opacity)
7. Responsive (md:, lg:)
8. Dark mode (dark:)
9. States (hover:, focus:)
```

---

## 🚀 Building for Production

### Build Command
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deployment
```bash
# Vercel (Recommended)
vercel deploy

# Docker
docker build -t devbhoomi .
docker run -p 3000:3000 devbhoomi

# Static Export (if needed)
npm run export
```

---

## 📊 Performance Tips

### Optimize Images
```tsx
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority
/>
```

### Dynamic Imports
```tsx
const Component = dynamic(() => import("./Component"), {
  loading: () => <p>Loading...</p>,
});
```

### Code Splitting
- Use lazy loading for routes
- Split large components
- Defer non-critical code

---

## 🔐 Security Checklist

- ✅ Validate form inputs
- ✅ Sanitize user content
- ✅ Use environment variables
- ✅ Enable CSP headers
- ✅ HTTPS enabled
- ✅ No sensitive data in client

---

## 📚 Learning Paths

### For Designers
1. Start with DESIGN_SYSTEM.md
2. Review UI_UX_DESIGN.md
3. Check component visuals
4. Test dark mode

### For Frontend Devs
1. Read README_COMPLETE.md
2. Review IMPLEMENTATION_GUIDE.md
3. Study component code
4. Check page implementations

### For Full Stack
1. Understand architecture in README
2. Review all pages
3. Plan backend integration
4. Setup database schema

---

## 🆘 Quick Help

### Find Component Usage
```tsx
// Search for component in codebase
grep -r "Card hover" app/
grep -r "Button variant=" components/
```

### Check Responsive Classes
```tsx
// Common patterns
md:grid-cols-2    // 2 columns on medium+
lg:flex           // Flex on large+
hidden sm:block   // Hide on mobile, show on small+
```

### Test Accessibility
```bash
# Lighthouse audit (Chrome DevTools)
1. Open DevTools
2. Go to Lighthouse
3. Run Accessibility audit
4. Fix issues found
```

---

## 📞 Support Resources

- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion/
- **Next.js:** https://nextjs.org
- **React:** https://react.dev
- **Lucide Icons:** https://lucide.dev

---

## ✅ Pre-Launch Checklist

- [ ] All pages built and tested
- [ ] Dark mode verified
- [ ] Mobile responsiveness checked
- [ ] Accessibility audit passed
- [ ] Performance optimized
- [ ] SEO configured
- [ ] Analytics setup
- [ ] Environment variables set
- [ ] Backend APIs integrated
- [ ] Payment gateway configured
- [ ] Email service connected
- [ ] Security headers added

---

## 🎯 Next Steps

1. **Customize Content**
   - Update copy and messaging
   - Add real images
   - Configure team info

2. **Integrate Backend**
   - Connect to APIs
   - Setup database
   - Implement authentication

3. **Deploy**
   - Choose hosting platform
   - Configure domain
   - Setup SSL certificate

4. **Monitor**
   - Enable analytics
   - Setup error tracking
   - Configure alerts

---

## 📞 Contact & Support

- **Email:** hello@devbhoomi.org
- **Website:** devbhoomi.org
- **Docs:** See project documentation files

---

**Version:** 1.0
**Last Updated:** May 2024
**Status:** Production Ready ✅

**Happy coding! 🚀**
