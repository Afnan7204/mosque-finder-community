
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = "default", 
  size = "md", 
  className 
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full transition-colors",
        {
          "bg-muted text-muted-foreground": variant === "default",
          "bg-primary text-primary-foreground": variant === "primary",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "bg-transparent border border-border text-foreground": variant === "outline",
          "bg-green-100 text-green-800": variant === "success",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-red-100 text-red-800": variant === "danger",
          "text-xs px-2 py-0.5": size === "sm",
          "text-sm px-2.5 py-0.5": size === "md",
          "text-base px-3 py-1": size === "lg",
        },
        className
      )}
    >
      {children}
    </span>
  );
};
