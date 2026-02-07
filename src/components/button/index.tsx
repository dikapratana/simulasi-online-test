import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "py-2 px-4 border rounded-lg border-blue-500 text-blue-500 font-medium hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-300 cursor-pointer min-w-24 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-400 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
