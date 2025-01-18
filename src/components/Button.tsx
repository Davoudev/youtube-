import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      ghost: ["hover:bg-gray-100"],
      defualt: ["bg-secondary", "hover:bg-secondary-hover"],
      dark: ["bg-dark-300", "hover:bg-dark-400", "text-secondary"],
      lightDark: ["bg-dark-50", "hover:bg-dark-200"],
    },
    size: {
      default: ["   rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },

  defaultVariants: {
    variant: "defualt",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}

// flex-grow در صورتی فعال می‌شود که فضای اضافی در ظرف موجود باشد و عناصر به این فضا رشد می‌کنند.

// flex-shrink در صورتی فعال می‌شود که فضای کم باشد و عناصر اندازه‌شان را کاهش می‌دهند تا در ظرف جا شوند.
