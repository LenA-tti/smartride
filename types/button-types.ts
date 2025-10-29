// This file defines shared types and classes for button components.

import { cva, type VariantProps as CVAVariantProps } from "class-variance-authority";

// Define shared variant classes for buttons — aligned with ui/button.tsx
export const variantClasses = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent hover:bg-muted hover:text-foreground",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Re-export a compatible VariantProps type that other UI components expect
export type VariantProps<T> = CVAVariantProps<T>;