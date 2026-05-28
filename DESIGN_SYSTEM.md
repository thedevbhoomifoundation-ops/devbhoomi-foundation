# The Dev Bhoomi Foundation - Design System & Architecture

## 🎨 Brand Identity

**Foundation Name:** The Dev Bhoomi Foundation

**Mission:** To provide accessible, world-class technical education and create a thriving community of empowered developers, social innovators, and volunteers.

**Vision:** A world where every aspiring individual has access to quality technical education and opportunity to make a positive impact.

---

## 🎭 Visual Design System

### Color Palette

#### Primary Colors
- **Deep Himalayan Blue** (#0B3C5D) - Primary brand color, trust & professionalism
- Lighter shade: #1A5A7D
- Lighter shade: #2A7A9D
- Dark shade: #051E30

#### Accent Colors
- **Sacred Orange** (#E58A1F) - Energy, spirituality, impact
- Light: #F0A33A
- Dark: #C97015

#### Secondary
- **Green** (#3F7D3A) - Growth, harmony, nature

#### Backgrounds
- **Light Mode:** #F8F5EF (warm, natural, premium)
- **Dark Mode:** #071826 (deep navy, cinematic)
- **Card Light:** #FFFFFF
- **Card Dark:** #122B3D

#### Text Colors
- Light Mode: #0B3C5D (dark blue)
- Dark Mode: #EAF2F8 (light blue)
- Muted: #8BA5B8 / #A8BDD1

### Gradients

```css
/* Primary Gradient */
linear-gradient(135deg, #0B3C5D 0%, #1A5A7D 100%)

/* Accent Gradient */
linear-gradient(135deg, #E58A1F 0%, #F0A33A 100%)

/* Hero Gradient */
linear-gradient(135deg, #0B3C5D 0%, #1A5A7D 50%, #3F7D3A 100%)

/* Soft Background Gradient */
linear-gradient(135deg, rgba(11, 60, 93, 0.05) 0%, rgba(229, 138, 31, 0.05) 100%)

/* Dark Gradient */
linear-gradient(135deg, #071826 0%, #122B3D 100%)
```

---

## 📝 Typography

### Font Families
- **Headings:** Poppins (Modern, clean, premium)
- **Body:** Inter (Highly readable, professional)
- **Accent:** Cormorant Garamond (Optional, elegant, luxury)

### Type Scale

| Size | Pixels | Usage |
|------|--------|-------|
| xs | 12px | Labels, small text |
| sm | 14px | Captions, secondary text |
| base | 16px | Body text, paragraphs |
| lg | 18px | Large body text |
| xl | 20px | Subheadings |
| 2xl | 24px | Medium headings |
| 3xl | 30px | Section headings |
| 4xl | 36px | Page titles |
| 5xl | 48px | Hero headings |
| 6xl | 60px | Mega headings |

### Font Weights
- **Light:** 300
- **Normal:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700

---

## 📏 Spacing System

Consistent 8px base unit for better alignment and rhythm.

| Size | Value | Usage |
|------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Small gaps |
| md | 16px | Standard spacing |
| lg | 24px | Component spacing |
| xl | 32px | Section spacing |
| 2xl | 40px | Large sections |
| 3xl | 48px | Extra large |
| 4xl | 64px | Hero spacing |
| 5xl | 80px | Massive spacing |

---

## 🎯 Border & Corners

### Border Radius
- **sm:** 6px (small elements)
- **md:** 8px (default buttons)
- **lg:** 12px (cards)
- **xl:** 16px (large cards)
- **2xl:** 24px (extra large)
- **full:** 9999px (pills, circles)

### Shadows

```css
/* Small Shadow */
0 1px 2px 0 rgba(11, 60, 93, 0.05)

/* Medium Shadow */
0 4px 6px -1px rgba(11, 60, 93, 0.1), 0 2px 4px -1px rgba(11, 60, 93, 0.06)

/* Large Shadow */
0 10px 15px -3px rgba(11, 60, 93, 0.1), 0 4px 6px -2px rgba(11, 60, 93, 0.05)

/* XL Shadow */
0 20px 25px -5px rgba(11, 60, 93, 0.1), 0 10px 10px -5px rgba(11, 60, 93, 0.04)

/* Premium Shadow */
0 20px 40px -10px rgba(11, 60, 93, 0.15)
```

---

## ✨ Animation & Motion

### Animation Durations
- **Fast:** 150ms (micro interactions)
- **Base:** 300ms (standard transitions)
- **Slow:** 500ms (emphasis animations)
- **Slower:** 700ms (entrance animations)

### Animation Types
- **Fade Up:** Subtle entrance from below
- **Fade In:** Simple opacity change
- **Slide Down:** Top entrance animation
- **Slide Up:** Bottom exit animation
- **Float:** Continuous gentle vertical motion
- **Bounce Light:** Subtle bounce effect
- **Shimmer:** Skeleton loading effect
- **Pulse:** Soft pulsing effect

### Easing
- **Standard:** cubic-bezier(0.4, 0, 0.2, 1)
- **Ease In:** cubic-bezier(0.4, 0, 1, 1)
- **Ease Out:** cubic-bezier(0, 0, 0.2, 1)

---

## 🌓 Dark Mode

Complete dark mode support with `next-themes` class-based approach.

### Dark Mode Colors
- Background: #071826 (deep navy)
- Card: #122B3D (slightly lighter)
- Text: #EAF2F8 (light blue)
- Muted: #A8BDD1

**Philosophy:** Cinematic, premium, not pure black. Maintains accessibility and visual hierarchy.

---

## 🧩 Component Library

### Button Variants
1. **Primary:** Gradient background, white text
2. **Accent:** Gradient accent background
3. **Secondary:** Light background
4. **Outline:** Border with transparent bg
5. **Ghost:** Minimal, text only

### Button Sizes
- **sm:** Small buttons (small forms)
- **md:** Default size (standard)
- **lg:** Large buttons (CTAs)
- **xl:** Extra large (hero sections)

### Card Component
- Rounded corners (12-24px)
- Subtle shadow
- Hover elevation
- Border support

### Badge Variants
- Default, Success, Warning, Error, Info
- Inline display, pill shaped

### Icon Box
- Varied sizes (sm, md, lg)
- Color variants
- Rounded square design

---

## 📄 Page Structure

### Navbar
- Fixed positioning
- Scroll-based transparency transition
- Logo + navigation links
- CTA buttons (Volunteer, Donate)
- Mobile hamburger menu
- Theme toggle (Sun/Moon)

### Footer
- Dark premium background
- Multiple column layout
- Quick links, support links
- Newsletter subscription
- Social links
- Contact info
- Copyright

### Hero Section
- Full viewport height
- Gradient background
- Animated floating elements
- Impact stats showcase
- Dual CTA buttons

### Sections
- Consistent max-width (7xl)
- Title + subtitle pattern
- Responsive grid layouts
- Card-based content display

---

## 📱 Responsive Design

### Breakpoints
- **xs:** 0px (mobile)
- **sm:** 640px (small mobile)
- **md:** 768px (tablet)
- **lg:** 1024px (small desktop)
- **xl:** 1280px (desktop)
- **2xl:** 1536px (large desktop)

### Mobile-First Approach
- Design for mobile first
- Enhance with media queries
- Test on real devices
- Maintain touch targets (44px minimum)

---

## 🎯 UI Components

### Input Elements
- Smooth focus states
- Clear placeholder text
- Error states
- Loading states
- Success indicators

### Forms
- Clear labeling
- Logical grouping
- Inline validation
- Helper text
- Error messages

### Cards
- Consistent spacing
- Hover effects
- Shadow elevation
- Border accents
- Badge support

### Modals
- Backdrop blur
- Smooth entrance
- Focus trap
- Keyboard support

---

## 🔄 Interactions

### Hover States
- Color change
- Shadow elevation
- Scale transform (slight)
- Icon animation

### Focus States
- Ring highlight (2px)
- Accessible color contrast
- Clear visual feedback

### Active/Click States
- Scale down slightly
- Slightly darker color
- Immediate feedback

### Loading States
- Skeleton screens
- Shimmer effect
- Disabled appearance
- Spinner animations

---

## 🚀 Performance

### Optimization
- Image lazy loading
- Code splitting
- CSS-in-JS optimization
- Animation GPU acceleration
- Minimal JavaScript

### Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast ratios

---

## 📱 Pages & Features

### Public Pages
1. **Home** - Hero, features, impact, testimonials
2. **About** - Mission, vision, team, timeline
3. **Programs** - Education, volunteer, scholarship programs
4. **Courses** - Course catalog, filters, instructor info
5. **Volunteer** - Application, roles, benefits
6. **Donate** - Campaign info, donation tiers, impact
7. **Blog** - Articles, categories, featured
8. **Gallery** - Masonry grid, image preview
9. **Contact** - Form, map, contact info

### Dashboard Pages
1. **Student Dashboard** - Courses, progress, certificates
2. **Volunteer Dashboard** - Projects, hours, recognition
3. **Donor Dashboard** - Donations, impact reports
4. **Instructor Dashboard** - Course management, students
5. **Admin Dashboard** - Analytics, user management, content

---

## 🎨 Design Principles

1. **Premium Quality:** Every detail refined and polished
2. **Authentic:** Genuine connection to mission and community
3. **Trustworthy:** Clear, honest, transparent communication
4. **Himalayan-Inspired:** Nature, spirituality, modernity blend
5. **Calm & Elegant:** Peaceful, sophisticated aesthetic
6. **Modern Startup:** Contemporary, innovative feel
7. **Excellent UX:** Intuitive, frictionless experience
8. **Responsive:** Perfect on all devices

---

## 📚 Tech Stack

- **Framework:** Next.js 16 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Library:** ShadCN UI components
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes (light/dark)
- **Architecture:** App Router, SSR

---

## 🔗 File Structure

```
devbhoomi-foundation/
├── app/
│   ├── page.tsx (homepage)
│   ├── about/page.tsx
│   ├── programs/page.tsx
│   ├── courses/page.tsx
│   ├── volunteer/page.tsx
│   ├── donate/page.tsx
│   ├── contact/page.tsx
│   ├── dashboard/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   ├── hero-section.tsx
│   ├── sections.tsx
│   ├── ui.tsx
│   └── dashboard.tsx
├── lib/
│   └── constants.ts
├── providers/
│   └── theme-provider.tsx
├── tailwind.config.ts
└── package.json
```

---

## 🎬 Getting Started

1. Install dependencies: `npm install`
2. Add required fonts in `next.config.ts`
3. Set up environment variables
4. Run dev server: `npm run dev`
5. Build for production: `npm run build`

---

## 💡 Design Tips

1. **Spacing:** Use the spacing system consistently
2. **Colors:** Stick to the palette for cohesion
3. **Fonts:** Mix Poppins (headings) + Inter (body)
4. **Shadows:** Use premium shadow for emphasis
5. **Animation:** Keep it smooth and purposeful
6. **Dark Mode:** Always test in both modes
7. **Accessibility:** Maintain color contrast ratios
8. **Mobile:** Always design mobile-first

---

**Last Updated:** May 2024
**Version:** 1.0
**Status:** Production-Ready
