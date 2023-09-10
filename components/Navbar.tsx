"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const userImage = session?.user?.image as string;
      setProfileImage(userImage);
    }
  }, [session, status]);

  return (
    <>
      <nav className="fixed bg-gray-900 px-2 sm:px-4 py-3 w-full z-20 top-0 left-0">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <span className="self-center text-gray-200 text-xl tracking-tight font-mono font-semibold whitespace-nowrap">
              Iconic
            </span>
          </Link>
          {status === "authenticated" ? (
            <div className="ml-5 mr-3 text-sm cursor-pointer md:mr-0">
              <span className="sr-only">Profile image</span>
              {profileImage !== null ? (
                <Image
                  className="rounded-full"
                  src={profileImage}
                  width={32}
                  height={32}
                  alt="profile-image"
                />
              ) : (
                <FaUserCircle className="text-gray-400" size={32} />
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="ml-5 mr-3 rounded-lg bg-blue-800 hover:bg-blue-700 px-5 py-2 text-white">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
