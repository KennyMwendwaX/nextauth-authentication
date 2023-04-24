import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Auth</title>
        <meta name="description" content="Authentication using next-auth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar />
        <h1 className="text-center text-xl">Welcome to the site NAME</h1>
      </div>
    </>
  );
}
