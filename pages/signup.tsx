import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Img from "@/public/image.jpg";
import { useState } from "react";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-fit xl:p-0">
          <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign up to have an account
            </h1>
            <div className="flex justify-between space-x-2">
              <button className="inline-flex items-center bg-transparent border border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2">
                <Image width={20} height={20} alt="google" src="/google.svg" />
                &nbsp;Sign up with Google
              </button>
              <button className="inline-flex items-center bg-transparent border border-gray-300 rounded-lg hover:bg-gray-100 px-4 py-2">
                <Image width={20} height={20} alt="github" src="/github.svg" />
                &nbsp;Sign up with Github
              </button>
            </div>
            <div className="flex items-center">
              <div className="border border-gray-400 w-1/2"></div>
              <div className="px-3 text-gray-400">or</div>
              <div className="border border-gray-400 w-1/2"></div>
            </div>
            <form className="space-y-3 md:space-y-4" action="#">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
                <span className="absolute bottom-3 right-0 pr-3 flex items-center cursor-pointer text-gray-600">
                  <HiAtSymbol size={20} />
                </span>
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type={!showPassword ? `password` : `text`}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${
                    !showPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-3 right-0 pr-3 flex items-center cursor-pointer`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              <div className="relative">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                  type={!showConfirmPassword ? `password` : `text`}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`${
                    !showConfirmPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-3 right-0 pr-3 flex items-center cursor-pointer`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
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
