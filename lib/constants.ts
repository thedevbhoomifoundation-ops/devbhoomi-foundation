/**
 * Design System Constants
 * The Nextgen Devbhoomi Foundation - Premium NGO + EdTech Platform
 */

// Color Palette
export const colors = {
  primary: {
    main: "#0B3C5D",        // Deep Himalayan Blue
    light: "#1A5A7D",
    lighter: "#2A7A9D",
    dark: "#051E30",
  },
  accent: {
    main: "#E58A1F",        // Sacred Orange
    light: "#F0A33A",
    dark: "#C97015",
  },
  secondary: {
    green: "#3F7D3A",
    light: "#5A9D55",
  },
  background: {
    light: "#F8F5EF",
    dark: "#071826",
    card: {
      light: "#FFFFFF",
      dark: "#122B3D",
    },
  },
  text: {
    light: "#EAF2F8",
    dark: "#0B3C5D",
    muted: {
      light: "#8BA5B8",
      dark: "#A8BDD1",
    },
  },
  border: {
    light: "#E0E8F0",
    dark: "#1A3A4D",
  },
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
};

// Typography
export const typography = {
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    accent: "'Cormorant Garamond', serif",
  },
  sizes: {
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    base: "1rem",       // 16px
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "3.75rem",   // 60px
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Spacing System
export const spacing = {
  xs: "0.25rem",      // 4px
  sm: "0.5rem",       // 8px
  md: "1rem",         // 16px
  lg: "1.5rem",       // 24px
  xl: "2rem",         // 32px
  "2xl": "2.5rem",    // 40px
  "3xl": "3rem",      // 48px
  "4xl": "4rem",      // 64px
  "5xl": "5rem",      // 80px
};

// Border Radius
export const borderRadius = {
  sm: "0.375rem",     // 6px
  md: "0.5rem",       // 8px
  lg: "0.75rem",      // 12px
  xl: "1rem",         // 16px
  "2xl": "1.5rem",    // 24px
  full: "9999px",
};

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(11, 60, 93, 0.05)",
  md: "0 4px 6px -1px rgba(11, 60, 93, 0.1), 0 2px 4px -1px rgba(11, 60, 93, 0.06)",
  lg: "0 10px 15px -3px rgba(11, 60, 93, 0.1), 0 4px 6px -2px rgba(11, 60, 93, 0.05)",
  xl: "0 20px 25px -5px rgba(11, 60, 93, 0.1), 0 10px 10px -5px rgba(11, 60, 93, 0.04)",
  "2xl": "0 25px 50px -12px rgba(11, 60, 93, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(11, 60, 93, 0.05)",
  premium: "0 20px 40px -10px rgba(11, 60, 93, 0.15)",
};

// Gradients
export const gradients = {
  primary: "linear-gradient(135deg, #0B3C5D 0%, #1A5A7D 100%)",
  accent: "linear-gradient(135deg, #E58A1F 0%, #F0A33A 100%)",
  hero: "linear-gradient(135deg, #0B3C5D 0%, #1A5A7D 50%, #3F7D3A 100%)",
  "hero-accent": "linear-gradient(135deg, #E58A1F 0%, #F0A33A 100%)",
  soft: "linear-gradient(135deg, rgba(11, 60, 93, 0.05) 0%, rgba(229, 138, 31, 0.05) 100%)",
  dark: "linear-gradient(135deg, #071826 0%, #122B3D 100%)",
};

// Animation Durations
export const animations = {
  fast: "150ms",
  base: "300ms",
  slow: "500ms",
  slower: "700ms",
};

// Breakpoints (mobile-first)
export const breakpoints = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Navigation Links
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Courses", href: "/courses" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Donate", href: "/donate" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

// Social Links
export const socialLinks = [
  { icon: "facebook", url: "https://facebook.com/devbhoomi", label: "Facebook" },
  { icon: "twitter", url: "https://twitter.com/devbhoomi", label: "Twitter" },
  { icon: "linkedin", url: "https://www.linkedin.com/company/nextgen-devbhoomi-foundation/", label: "LinkedIn" },
  { icon: "instagram", url: "https://www.instagram.com/nextgendevbhoomi/", label: "Instagram" },
  { icon: "youtube", url: "https://youtube.com/@devbhoomi", label: "YouTube" },
];

// Foundation Info
export const foundationInfo = {
  name: "The Nextgen Devbhoomi Foundation",
  tagline: "Empowering through Education, Community, and Technology",
  mission: "To provide accessible, world-class technical education and create a community of empowered developers and social innovators.",
  vision: "A world where every aspiring individual has access to quality education and opportunity to make a positive impact.",
  email: "nextgendevbhoomi@gmail.com",
  phone: "+91 (XXX) XX",
  address: "Bihar, India",
  founded: 2022,
};

// Impact Stats
export const impactStats = [
  { label: "Students Trained", value: "15000+", icon: "users" },
  { label: "Courses Available", value: "50+", icon: "book" },
  { label: "Active Volunteers", value: "2000+", icon: "heart" },
  { label: "Amount Donated", value: "₹50L+", icon: "trending-up" },
];
