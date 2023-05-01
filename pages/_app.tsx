import "@/styles/global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Roboto } from "next/font/google";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();
  const excludePaths = ["/signup", "/signin"];

  if (excludePaths.includes(router.pathname)) {
    return (
      <>
        <main className={roboto.className}>
          <div className="bg-gray-100 min-h-screen">
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className={roboto.className}>
      <div className="bg-gray-100 min-h-screen">
        <SessionProvider session={session}>
          <Layout session={session}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </div>
    </main>
  );
}
