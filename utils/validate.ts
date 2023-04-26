type FormErrors = {
  email?: string;
  password?: string;
};

// export default function formValidate(values: {
//   email: string;
//   password: string;
// }) {
//   const errors: FormErrors = {};

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   if (!values.password) {
//     errors.password = "Required";
//   } else if (values.password.length < 8 || values.password.length > 20) {
//     errors.password = "Must be greater than 8 and less than 20 characters long";
//   } else if (values.password.includes(" ")) {
//     errors.password = "Invalid Password";
//   }

//   return errors;
// }

import { z, ZodError } from "zod";

const signupformSchema = z
  .object({
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
  email: string;
  password: string;
  confirm_password: string;
}) {}

export function signinFormValidate(values: {
  email: string;
  password: string;
}) {
  // Validate the input values against the schema
  const result = signinformSchema.safeParse(values);

  if (!result.success) {
    const formErrors = result.error.format();
    const emailError = formErrors.email?._errors[0];
    const passwordError = formErrors.password?._errors[0];

    const errors: FormErrors = {
      email: emailError,
      password: passwordError,
    };

    return errors;
  }
}
