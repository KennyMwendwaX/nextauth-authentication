import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Img from "@/public/image.jpg";

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
      <div className="mx-28 mt-10">
        <div className="text-lg font-semibold text-gray-900">Profile</div>
        <div className="flex items-center space-x-6">
          <Image
            width={80}
            height={80}
            src={Img}
            className="rounded-full"
            alt="Cammy Lin Ux Designer - Circle Picture Profile Girl Png@nicepng.com"
          />
          <div>
            <input
              type="file"
              className="pr-20 text-sm text-grey-500 border-2 border-gray-900 rounded-lg bg-gray-100 cursor-pointer file:mr-5 file:py-2 file:px-6
             file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:cursor-pointer"
            />
            <p className="mt-1 text-sm text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div>
        </div>
        <div>Signed in as {session?.user?.email}</div>
      </div>
    );
}
