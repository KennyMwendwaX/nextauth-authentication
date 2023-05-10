import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Next Auth</title>
        <meta name="description" content="Authentication using next-auth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {status === "authenticated" ? (
          <div className="pt-16">
            Welcome {session?.user?.name}, {session?.user?.email}
            <button
              onClick={() => signOut()}
              className="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="pt-16">
            <div>
              You are not signed in{" "}
              <Link
                href="/signin"
                className="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
