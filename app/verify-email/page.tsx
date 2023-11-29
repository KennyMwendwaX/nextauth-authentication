"use client";

import React, { useState, useRef, ChangeEvent } from "react";

export default function VerifyEmail() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;

    setCodes(newCodes);

    if (
      value !== "" &&
      index < codes.length - 1 &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1]?.focus();
    }
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
                  <p>We have sent a code to your email ba**@dipainhouse.com</p>
                </div>
              </div>

              <div>
                <form>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md space-x-4">
                      {codes.map((code, index) => (
                        <div key={index} className="w-16 h-16">
                          <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            value={code}
                            maxLength={1}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleChange(index, e.target.value)
                            }
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
