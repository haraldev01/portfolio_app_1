import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LinkProps } from "next/link";
import Link from "next/link";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs text-nowrap font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground md:hover:bg-primary/80",
        secondary:
          "border-accent bg-card/70 text-secondary-foreground md:hover:bg-secondary/50",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground md:hover:bg-destructive/80",
        warning:
          "border-destructive bg-card/70 text-destructive md:hover:bg-card/50",
        outline: "text-foreground",
        loading:
          "border-transparent bg-muted-foreground/50 text-transparent animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
}

interface LinkBadgeProps extends LinkProps, VariantProps<typeof badgeVariants> {
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

const LinkBadge: React.FC<LinkBadgeProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <Link className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge, LinkBadge, badgeVariants };
