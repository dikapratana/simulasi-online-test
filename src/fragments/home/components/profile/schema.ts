import { z } from "zod";

export const studentProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Student name is required")
    .min(3, "Student name must be at least 3 characters")
    .max(100, "Student name must not exceed 100 characters"),

  email: z
    .string()
    .min(1, "Email address is required")
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Please enter a valid email address",
    ),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[0-9+\-\s()]*$/,
      "Phone number can only contain numbers, +, -, spaces, and parentheses",
    )
    .min(10, "Phone number must be at least 10 digits"),

  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^[0-9]*$/, "Age can only contain numbers")
    .max(100, "Age must not exceed 100"),
});

export type StudentProfileSchema = z.infer<typeof studentProfileSchema>;