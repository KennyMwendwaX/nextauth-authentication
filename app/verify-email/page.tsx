"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState("");

  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    redirect("/");
  }

  const email = searchParams.get("email");

  if (!email) {
    redirect("/");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (otp: z.infer<typeof FormSchema>) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(otp),
    };

    const register = await fetch("/api/auth/verify-email", options);

    if (register.status === 404) {
      setServerErrors("User not found");
    }

    if (register.status === 400) {
      setServerErrors("Invalid or expired verification code");
    }

    if (register.status === 500) {
      setServerErrors("Server error, try again later");
    }

    if (register.ok) {
      router.push("/");
    }
  };

  return (
    <>
      <div>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-6 px-4">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="text-3xl font-bold tracking-tight">
                  Email Verification
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-500">
                  <div>
                    We have sent a code to your email{" "}
                    <span className="text-gray-700 font-semibold">{email}</span>
                  </div>
                </div>
              </div>

              {serverErrors && (
                <div
                  className="mb-4 rounded-lg border border-red-600 bg-red-50 p-4 text-sm text-red-800"
                  role="alert">
                  {serverErrors}
                </div>
              )}
              <Form {...form}>
                <div className="flex justify-center">
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot
                                  index={0}
                                  className="w-16 h-16 text-2xl"
                                />
                                <InputOTPSlot
                                  index={1}
                                  className="w-16 h-16 text-2xl"
                                />
                                <InputOTPSlot
                                  index={2}
                                  className="w-16 h-16 text-2xl"
                                />
                                <InputOTPSlot
                                  index={3}
                                  className="w-16 h-16 text-2xl"
                                />
                                <InputOTPSlot
                                  index={4}
                                  className="w-16 h-16 text-2xl"
                                />
                                <InputOTPSlot
                                  index={5}
                                  className="w-16 h-16 text-2xl"
                                />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      size="lg"
                      className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium w-full">
                      Verify Account
                    </Button>

                    <div className="mt-1 flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn&apos;t recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="/">
                        Resend
                      </a>
                    </div>
                  </form>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
