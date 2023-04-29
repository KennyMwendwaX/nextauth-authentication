import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Img from "@/public/image.jpg";
import { useState } from "react";
import { HiAtSymbol, HiFingerPrint, HiUser } from "react-icons/hi";
import { useFormik } from "formik";
import { signupFormValidate } from "@/utils/validate";
import { useRouter } from "next/router";

type formValues = {
  email: string;
  password: string;
  confirm_password: string;
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validate: signupFormValidate,
    onSubmit,
  });

  async function onSubmit(values: formValues) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const register = await fetch(
      "http://localhost:3000/api/auth/register",
      options
    );

    console.log(register);
    if (register.status === 422) {
      setErrors(["Email is already registered"]);
    }

    console.log(errors[0]);

    if (register.status === 201) {
      router.push("http://localhost:3000/signin");
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <Image className="w-8 h-8 mr-2" src={Img} alt="logo" />
          Iconic
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign up to have an account
            </h1>
            <form
              className="space-y-3 md:space-y-4"
              onSubmit={formik.handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className={`${
                    formik.errors.username
                      ? `focus:border-red-600`
                      : `focus:border-blue-600`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  placeholder="John Doe"
                  required
                  {...formik.getFieldProps("username")}
                />
                <span className="absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer text-gray-600">
                  <HiUser size={20} />
                </span>
              </div>
              {formik.errors.username && (
                <span className="text-red-600 text-xs">
                  {formik.errors.username}
                </span>
              )}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`${
                    formik.errors.email
                      ? `focus:border-red-600`
                      : `focus:border-blue-600`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  placeholder="johndoe@gmail.com"
                  required
                  {...formik.getFieldProps("email")}
                />
                <span className="absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer text-gray-600">
                  <HiAtSymbol size={20} />
                </span>
              </div>
              {formik.errors.email && (
                <span className="text-red-600 text-xs">
                  {formik.errors.email} {errors[0]}
                </span>
              )}
              {errors.length > 0 && (
                <span className="text-red-600 text-xs">{errors[0]}</span>
              )}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type={!showPassword ? `password` : `text`}
                  id="password"
                  placeholder="••••••••"
                  className={`${
                    formik.errors.password
                      ? `focus:border-red-600`
                      : `focus:border-blue-600`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  required
                  {...formik.getFieldProps("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${
                    !showPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {formik.errors.password && (
                <span className="text-red-600 text-xs">
                  {formik.errors.password}
                </span>
              )}
              <div className="relative">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                  type={!showConfirmPassword ? `password` : `text`}
                  id="confirm_password"
                  placeholder="••••••••"
                  className={`${
                    formik.errors.confirm_password
                      ? `focus:border-red-600`
                      : `focus:border-blue-600`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  required
                  {...formik.getFieldProps("confirm_password")}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`${
                    !showConfirmPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {formik.errors.confirm_password && (
                <span className="text-red-600 text-xs">
                  {formik.errors.confirm_password}
                </span>
              )}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500">
                Have an account?
                <Link
                  href="/signin"
                  className="font-medium text-blue-600 hover:underline">
                  &nbsp;Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
