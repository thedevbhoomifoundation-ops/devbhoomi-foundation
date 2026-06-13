"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-primary text-white hover:shadow-lg hover:scale-105 active:scale-95",
        accent:
          "bg-gradient-accent text-white hover:shadow-lg hover:scale-105 active:scale-95",
        secondary:
          "bg-slate-800 text-white hover:bg-slate-700",
        outline:
          "border-2 border-slate-700 text-white hover:bg-slate-800",
        ghost:
          "text-white hover:bg-slate-800",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  animated?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, animated = false, ...props }, ref) => {
    const classes = buttonVariants({ variant, size, fullWidth, className });

    if (animated) {
      const { onDrag, onDragStart, onDragEnd, ...motionSafeProps } = props as Record<string, unknown>;
      return (
        <motion.button
          ref={ref}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...(motionSafeProps as React.ComponentProps<typeof motion.button>)}
        />
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hover = false, ...props }, ref) => {
    const { onDrag, onDragStart, onDragEnd, ...motionSafeProps } = props as Record<string, unknown>;
    return (
      <motion.div
        ref={ref}
        className={`rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 p-6 ${
          hover ? "hover:shadow-xl transition-all duration-300 hover:border-accent-500" : ""
        } ${className}`}
        whileHover={hover ? { translateY: -4 } : {}}
        transition={{ duration: 0.3 }}
        {...(motionSafeProps as React.ComponentProps<typeof motion.div>)}
      />
    );
  }
);

Card.displayName = "Card";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-slate-700 text-white",
      success: "bg-green-900/20 text-green-300",
      warning: "bg-yellow-900/20 text-yellow-300",
      error: "bg-red-900/20 text-red-300",
      info: "bg-blue-900/20 text-blue-300",
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "secondary";
}

export const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className = "", size = "md", variant = "primary", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    };

    const variantClasses = {
      primary: "bg-primary-900/20 text-primary-300",
      accent: "bg-accent-900/20 text-accent-300",
      secondary: "bg-secondary-green/20 text-secondary-green",
    };

    return (
      <div
        ref={ref}
        className={`rounded-xl flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconBox.displayName = "IconBox";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className = "", title, subtitle, fullWidth = false, children, ...props }, ref) => (
    <section
      ref={ref}
      className={`py-20 ${fullWidth ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"} ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              className="text-lg text-primary-300 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      {children}
    </section>
  )
);

Section.displayName = "Section";
