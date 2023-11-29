"use client";

import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
};

const fieldNames = [
  "code0",
  "code1",
  "code2",
  "code3",
  "code4",
  "code5",
] as const;

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const { control, handleSubmit } = useForm<FormData>();

  const email = searchParams.get("email");

  if (!email) {
    redirect("/");
  }

  const onSubmit = (data: FormData) => {
    const code = Object.values(data).join("");
    console.log(code);
  };

  return (
    <>
      <div>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <div>
                    We have sent a code to your email{" "}
                    <span className="font-bold">{email}</span>
                  </div>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md space-x-4">
                      {fieldNames.map((fieldName, index) => (
                        <div key={index} className="w-16 h-16">
                          <Controller
                            control={control}
                            name={fieldName}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                type="text"
                                maxLength={1}
                                placeholder="0"
                                // Additional input props as needed
                              />
                            )}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                          Verify Account
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn&apos;t recieve code?</p>{" "}
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer">
                          Resend
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
