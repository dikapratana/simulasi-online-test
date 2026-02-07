import React from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
  containerClassName?: string;
}

export default function InputField({
  label,
  className,
  error,
  containerClassName = "w-full",
  ...props
}: InputFieldProps) {
  return (
    <div className={containerClassName}>
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium line-clamp-1">{label}</label>
        )}

        <input
          className={twMerge(
            "text-xs h-8 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors",
            className,
          )}
          {...props}
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}