import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

type NavbarProps = {
  session: Session | null;
};

export default function Navbar({ session }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="bg-gray-900 px-2 sm:px-4 py-3 w-full z-20 top-0 left-0">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <span className="self-center text-gray-200 text-xl tracking-tight font-mono font-semibold whitespace-nowrap ">
              Iconic
            </span>
          </Link>
          {!session ? (
            <></>
          ) : (
            <div className="flex items-center md:order-2">
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                id="user-menu-button"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src="/profile-picture-3.jpg"
                  alt="user photo"
                />
              </button>
              {/* Dropdown menu */}
              <div
                className={`z-50 ${
                  isMenuOpen ? "" : "hidden"
                } fixed top-8 right-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
                id="user-dropdown">
                <div className="px-4 py-3">
                  <span className="block text-md font-semibold  text-gray-900">
                    {session.user?.name}
                  </span>
                  <span className="block text-sm font-light text-gray-500 truncate">
                    {session.user?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="/profile"
                      className="inline-flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaUserCog size={18} />
                      &nbsp; Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="inline-flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <HiOutlineLogout size={18} />
                      &nbsp; Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
