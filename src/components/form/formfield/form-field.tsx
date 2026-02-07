import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type FormFieldProps<T extends FieldValues, C> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  component: React.ComponentType<C>;
  componentProps?: C;
  error?: string;
  type?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  containerClassName?: string;
};

export function FormField<T extends FieldValues, C extends object>({
  name,
  control,
  label,
  placeholder,
  className,
  component: Component,
  ...componentProps
}: FormFieldProps<T, C>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Component
          {...(componentProps as C)}
          {...field}
          value={field?.value}
          onChange={field.onChange}
          placeholder={placeholder}
          className={className}
          label={label}
        />
      )}
    />
  );
}
