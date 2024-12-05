import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover : bg-secondary-hover"],
      ghost: ["hover:bg-gray-100", "text-black", "bg-white"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-white",
      ],
    },
    size: {
      default: ["rounded", "p-2"],
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
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;
const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(className, buttonStyles({ variant, size }))}
    />
  );
};

export default Button;
// VariantProps میاد مقادیر پراپس رو میفرسته اونور
// ComponentProps اجازه میده نوع پراپ ها رو استخراج کنی
// twMerge می توانیم استرینگ های متفاوت را که شامل کلاس های تلویند است همزمان داشته باشیم
