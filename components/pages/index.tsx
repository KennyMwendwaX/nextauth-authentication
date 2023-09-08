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
              className="ml-2 rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="pt-16">
            <div>
              You are not signed in{" "}
              <Link
                href="/signin"
                className="ml-2 rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
