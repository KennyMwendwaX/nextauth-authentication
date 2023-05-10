import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Img from "@/public/image.jpg";
import { useState } from "react";
import { HiUser } from "react-icons/hi";

type FormValues = {
  old_username: string;
  new_username: string;
};

export default function ChangeUsername() {
  const [errors, setErrors] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      old_username: "",
      new_username: "",
    },
    // validate:
    onSubmit,
  });

  async function onSubmit(values: FormValues) {}

  return (
    <>
      <Head>
        <title>Change Username</title>
        <meta name="description" content="Reset Password page" />
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
              Change Username
            </h1>
            {/* {errorMessage && (
      <div
        className="p-4 mb-4 text-sm border border-red-600 text-red-800 rounded-lg bg-red-50"
        role="alert">
        {errorMessage}
      </div>
    )} */}

            <form
              className="space-y-3 md:space-y-4"
              onSubmit={formik.handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="old_username"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Old Username
                </label>
                <input
                  type="text"
                  id="old_username"
                  className={`${
                    formik.errors.old_username
                      ? `focus:border-red-600`
                      : `focus:border-gray-900`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  placeholder="John Doe"
                  required
                  {...formik.getFieldProps("old_username")}
                />
                <span className="absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer text-gray-600">
                  <HiUser size={20} />
                </span>
              </div>
              {formik.errors.old_username && (
                <span className="text-red-600 text-xs">
                  {formik.errors.old_username}
                </span>
              )}
              <div className="relative">
                <label
                  htmlFor="new_username"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  New Username
                </label>
                <input
                  type="text"
                  id="new_username"
                  className={`${
                    formik.errors.new_username
                      ? `focus:border-red-600`
                      : `focus:border-gray-900`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  placeholder="John Damian"
                  required
                  {...formik.getFieldProps("new_username")}
                />
                <span className="absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer text-gray-600">
                  <HiUser size={20} />
                </span>
              </div>
              {formik.errors.new_username && (
                <span className="text-red-600 text-xs">
                  {formik.errors.new_username}
                </span>
              )}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <a
                      className="font-medium text-blue-600 hover:underline"
                      href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Change Username
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
