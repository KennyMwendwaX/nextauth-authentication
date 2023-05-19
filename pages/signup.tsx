import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Img from "@/public/image.jpg";
import { useState } from "react";
import { HiAtSymbol, HiFingerPrint, HiUser } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/utils/validate";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupFormSchema),
  });

  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/");
    return null;
  }

  async function onSubmit(values: FormValues) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const register = await fetch(
      "http://localhost:3000/api/auth/register",
      options
    );

    if (register.status === 409) {
      setServerErrors("Email is already registered");
    }

    if (register.status === 500) {
      setServerErrors("Server error, try again later");
    }

    if (register.status === 201) {
      router.replace("/signin");
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

      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
          <Image className="mr-2 h-8 w-8" src={Img} alt="logo" />
          Iconic
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-3 p-6 sm:p-8 md:space-y-5">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign up to have an account
            </h1>
            {serverErrors && (
              <div
                className="mb-4 rounded-lg border border-red-600 bg-red-50 p-4 text-sm text-red-800"
                role="alert">
                {serverErrors[0]}
              </div>
            )}
            <form
              className="space-y-3 md:space-y-4"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`${
                    errors.name?.message
                      ? `focus:border-red-600`
                      : `focus:border-gray-900`
                  } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:text-gray-900 focus:outline-none sm:text-sm`}
                  placeholder="John Doe"
                  required
                  {...register("name")}
                />
                <span className="absolute bottom-2 right-0 flex cursor-pointer items-center pr-3 text-gray-600">
                  <HiUser size={20} />
                </span>
              </div>
              {errors.name?.message && (
                <span className="text-xs text-red-600">
                  {errors.name?.message}
                </span>
              )}
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
                  } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:text-gray-900 focus:outline-none sm:text-sm`}
                  placeholder="johndoe@gmail.com"
                  required
                  {...register("email")}
                />
                <span className="absolute bottom-2 right-0 flex cursor-pointer items-center pr-3 text-gray-600">
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
                  } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:text-gray-900 focus:outline-none sm:text-sm`}
                  required
                  {...register("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${
                    !showPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-2 right-0 flex cursor-pointer items-center pr-3`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {errors.password?.message && (
                <span className="text-xs text-red-600">
                  {errors.password?.message}
                </span>
              )}
              <div className="relative">
                <label
                  htmlFor="confirm_password"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                  type={!showConfirmPassword ? `password` : `text`}
                  id="confirm_password"
                  placeholder="••••••••"
                  className={`${
                    errors.confirm_password?.message
                      ? `focus:border-red-600`
                      : `focus:border-gray-900`
                  } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:text-gray-900 focus:outline-none sm:text-sm`}
                  required
                  {...register("confirm_password")}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`${
                    !showConfirmPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-2 right-0 flex cursor-pointer items-center pr-3`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {errors.confirm_password?.message && (
                <span className="text-xs text-red-600">
                  {errors.confirm_password?.message}
                </span>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400">
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
