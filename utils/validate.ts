type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

import { z } from "zod";

const signupformSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .min(5, { message: "Username must be greater than 5 characters long" })
      .max(20, { message: "Username must be less than 20 characters long" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email address")
      .min(1, { message: "Required" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "Password must be greater than 8 characters long" })
      .max(20, { message: "Password must be less than 20 characters long" })
      .refine((value) => !/\s/.test(value), "Invalid Password"), // whitespace or tab check
    confirm_password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const signinformSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address")
    .min(1, { message: "Required" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be greater than 8 characters long" })
    .max(20, { message: "Password must be less than 20 characters long" })
    .refine((value) => !/\s/.test(value), "Invalid Password"), // whitespace or tab check
});

export function signupFormValidate(values: {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}) {
  // Validate the form values against the schema
  const result = signupformSchema.safeParse(values);

  if (!result.success) {
    const formErrors = result.error.format();

    const errors: FormErrors = {
      username: formErrors.username?._errors[0],
      email: formErrors.email?._errors[0],
      password: formErrors.password?._errors[0],
      confirm_password: formErrors.confirm_password?._errors[0],
    };

    return errors;
  }
}

export function signinFormValidate(values: {
  email: string;
  password: string;
}) {
  // Validate the form values against the schema
  const result = signinformSchema.safeParse(values);

  if (!result.success) {
    const formErrors = result.error.format();

    const errors: FormErrors = {
      email: formErrors.email?._errors[0],
      password: formErrors.password?._errors[0],
    };

    return errors;
  }
}
