import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Img from "@/public/image.jpg";
import { HiOutlineUser, HiFingerPrint } from "react-icons/hi";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, redirect to the signin route.
      router.replace("/signin");
    },
  });

  if (status === "authenticated")
    return (
      <div className="mt-5 max-w-md mx-auto">
        <div className="text-2xl font-semibold text-gray-900 tracking-wide">
          User Profile
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Image
            width={80}
            height={80}
            src={Img}
            className="rounded-full"
            alt="Cammy Lin Ux Designer - Circle Picture Profile Girl Png@nicepng.com"
          />
          <div>
            <div className="text-sm font-medium mb-1">Upload Profile Image</div>
            <input
              type="file"
              className="pr-20 w-full text-sm text-grey-500 border-2 border-gray-900 rounded-lg bg-gray-100 cursor-pointer file:mr-5 file:py-2 file:px-6
             file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:cursor-pointer"
            />
            <p className="mt-1 text-xs text-gray-500">
              SVG, PNG, JPG or JPEG (MAX. 800x800px).
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>
            <div
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-blue-600 focus:outline-none block w-full p-2.5">
              {session.user?.name}
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <div
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-blue-600 focus:outline-none block w-full p-2.5">
              {session.user?.email}
            </div>
          </div>
          <div className="flex space-x-6 mt-6">
            <button className="bg-transparent hover:bg-gray-900 text-gray-900 hover:text-white rounded-lg border border-gray-900 focus:ring-4 focus:ring-gray-400 w-full py-2 inline-flex items-center justify-center">
              <HiOutlineUser /> &nbsp; Change Username
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg focus:ring-4 focus:ring-gray-400 w-full py-2 inline-flex items-center justify-center">
              <HiFingerPrint /> &nbsp; Change Password
            </button>
          </div>
        </div>
      </div>
    );
}
