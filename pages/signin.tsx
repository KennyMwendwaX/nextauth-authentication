import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Img from "@/public/image.jpg";
import { useState } from "react";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinFormSchema } from "@/utils/validate";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type FormValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signinFormSchema),
  });

  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/");
    return null;
  }

  async function onSubmit(values: FormValues) {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Do not redirect, so we can handle the result ourselves
      });

      if (result?.error) {
        // If there was an error, display the error message to the user
        setServerErrors(result.error);
      } else {
        // If there was no error, redirect the user to the home page
        router.push("/");
      }
    } catch (error) {
      // If there was an unexpected error, display a generic error message to the user
      setServerErrors("An unexpected error occurred. Please try again later.");
    }
  }

  // Handle Google Signin
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  }

  // Handle Github Signin
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000/" });
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign In page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
          <Image className="mr-2 h-8 w-8" src={Img} alt="logo" />
          Iconic
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>

            {serverErrors && (
              <div
                className="mb-4 rounded-lg border border-red-600 bg-red-50 p-4 text-sm text-red-800"
                role="alert">
                {serverErrors}
              </div>
            )}

            <form
              className="space-y-4 md:space-y-1"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`${
                    errors.email?.message
                      ? `focus:border-red-600`
                      : `focus:border-gray-900`
                  } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus:text-gray-900 focus:outline-none sm:text-sm`}
                  placeholder="johndoe@gmail.com"
                  required
                  {...register("email")}
                />
                <span className="absolute bottom-3 right-0 flex cursor-pointer items-center pr-3 text-gray-600">
                  <HiAtSymbol size={20} />
                </span>
              </div>
              {errors.email?.message && (
                <span className="text-xs text-red-600">
                  {errors.email?.message}
                </span>
              )}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type={!showPassword ? `password` : `text`}
                  id="password"
                  placeholder="••••••••"
                  className={`${
                    errors.password?.message
                      ? `focus:border-red-600`
                      : `focus:border-gray-900`
                  } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus:text-gray-900 focus:outline-none sm:text-sm`}
                  required
                  {...register("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${
                    !showPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-3 right-0 flex cursor-pointer items-center pr-3`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {errors.password?.message && (
                <span className="text-xs text-red-600">
                  {errors.password?.message}
                </span>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-50"
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
                className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400">
                Sign In
              </button>
            </form>
            <div>
              <button
                onClick={handleGoogleSignin}
                className="mb-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2 hover:bg-gray-100">
                <Image width={20} height={20} alt="google" src="/google.svg" />
                &nbsp;Sign in with Google
              </button>
              <button
                onClick={handleGithubSignin}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2 hover:bg-gray-100">
                <Image width={20} height={20} alt="github" src="/github.svg" />
                &nbsp;Sign in with Github
              </button>
            </div>
            <p className="text-sm font-light text-gray-500">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:underline">
                &nbsp;Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
