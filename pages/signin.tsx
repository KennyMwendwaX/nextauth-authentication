import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Img from "@/public/image.jpg";
import { useState } from "react";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useFormik } from "formik";
import { signinFormValidate } from "@/utils/validate";

type formValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: signinFormValidate,
    onSubmit,
  });

  console.log(formik.errors);

  async function onSubmit(values: formValues) {
    console.log(values);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign In page" />
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
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-4"
              onSubmit={formik.handleSubmit}>
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
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2.5`}
                  placeholder="name@company.com"
                  required
                  {...formik.getFieldProps("email")}
                />
                <span className="absolute bottom-3 right-0 pr-3 flex items-center cursor-pointer text-gray-600">
                  <HiAtSymbol size={20} />
                </span>
              </div>
              {formik.errors.email && (
                <span className="text-red-600 text-xs">
                  {formik.errors.email}
                </span>
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
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2.5`}
                  required
                  {...formik.getFieldProps("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${
                    !showPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-3 right-0 pr-3 flex items-center cursor-pointer`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {formik.errors.password && (
                <span className="text-red-600 text-xs">
                  {formik.errors.password}
                </span>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-50 rounded border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign In
              </button>
              <p className="text-sm font-light text-gray-500">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:underline">
                  &nbsp;Sign Up
                </Link>
              </p>
            </form>
            <div>
              <button className="w-full justify-center inline-flex items-center bg-transparent border border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2">
                <Image width={20} height={20} alt="google" src="/google.svg" />
                &nbsp;Sign in with Google
              </button>
              <button className="w-full justify-center inline-flex items-center bg-transparent border border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2">
                <Image width={20} height={20} alt="github" src="/github.svg" />
                &nbsp;Sign in with Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
