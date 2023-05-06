import Head from "next/head";
import Image from "next/image";
import Img from "@/public/image.jpg";
import { HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";

export default function ResetPassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit,
  });

  async function onSubmit() {}

  return (
    <>
      <Head>
        <title>Reset Password</title>
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
              Reset Password
            </h1>
            <form
              className="space-y-3 md:space-y-4"
              onSubmit={formik.handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="old password"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Old Password
                </label>
                <input
                  type={!showOldPassword ? `password` : `text`}
                  id="old_password"
                  placeholder="••••••••"
                  className={`${
                    formik.errors.old_password
                      ? `focus:border-red-600`
                      : `focus:border-blue-600`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  required
                  {...formik.getFieldProps("old_password")}
                />
                <span
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className={`${
                    !showOldPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {formik.errors.old_password && (
                <span className="text-red-600 text-xs">
                  {formik.errors.old_password}
                </span>
              )}
              <div className="relative">
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  New Password
                </label>
                <input
                  type={!showNewPassword ? `password` : `text`}
                  id="new_password"
                  placeholder="••••••••"
                  className={`${
                    formik.errors.new_password
                      ? `focus:border-red-600`
                      : `focus:border-blue-600`
                  } bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:text-gray-900 focus:outline-none block w-full p-2`}
                  required
                  {...formik.getFieldProps("new_password")}
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={`${
                    !showNewPassword ? `text-gray-600` : `text-blue-600`
                  } absolute bottom-2 right-0 pr-3 flex items-center cursor-pointer`}>
                  <HiFingerPrint size={20} />
                </span>
              </div>
              {formik.errors.new_password && (
                <span className="text-red-600 text-xs">
                  {formik.errors.new_password}
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

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <a
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
