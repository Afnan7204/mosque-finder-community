
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = ({
  children,
  className,
  as: Component = "div",
  size = "lg",
  ...props
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "mx-auto px-4 sm:px-6",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "w-full": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Container };
