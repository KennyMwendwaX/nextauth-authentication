import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Authentication using next-auth",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider session={session}>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
