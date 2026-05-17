import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "glow";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const variants: Record<string, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300",
  outline: "border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground",
  ghost: "hover:bg-accent/10 hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  glow: "bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-all duration-300",
};

const sizes: Record<string, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8 text-base",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            variants[variant] ?? variants.default,
            sizes[size] ?? sizes.default,
            className
          )}
          {...props}
        />
      );
    }
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant] ?? variants.default,
          sizes[size] ?? sizes.default,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
