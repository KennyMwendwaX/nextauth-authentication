"use client";
import Navbar from "@/components/Navbar";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-800 min-h-screen">
      {/* {status === "authenticated" ? ( */}
      <div className="pt-16">
        {/* Welcome {session?.user?.name}, {session?.user?.email} */}
        <button
          onClick={() => signOut()}
          className="ml-2 rounded-lg bg-blue-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400">
          Sign Out
        </button>
      </div>
      {/* ) : ( */}
      <div className="pt-16">
        <div>
          You are not signed in{" "}
          <Link
            href="/signin"
            className="ml-2 rounded-lg bg-blue-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400">
            Sign In
          </Link>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
