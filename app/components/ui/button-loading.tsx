import { forwardRef } from "react";

import { buttonVariants } from "~/components";
import { Loader2 } from "~/icons";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isSubmitting: boolean;
  loadingText: React.ReactNode;
}

export const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      variant = "default",
      accent = "default",
      size = "default",
      weight = "default",
      radius = "default",
      align = "default",
      className,
      children,
      isSubmitting,
      loadingText,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            accent,
            size,
            weight,
            radius,
            align,
            isIcon: false,
            className,
          })
        )}
        disabled={isSubmitting}
        ref={ref}
        {...props}
      >
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? loadingText : children}
      </button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";
