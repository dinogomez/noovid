import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/commons/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        successive:
          "border-transparent bg-green-500 text-white shadow hover:bg-green/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        info: "border-blue-500 bg-transparent  text-blue-500 shadow hover:bg-blue-500 hover:text-white",
        warn: "border-orange-500 bg-transparent  text-orange-500 shadow hover:bg-orange-500 hover:text-white",
        success:
          "border-green-500 bg-transparent  text-green-500 shadow hover:bg-green-500 hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
