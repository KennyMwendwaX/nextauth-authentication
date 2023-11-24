import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

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
      <body className={GeistSans.className}>
        <SessionProvider session={session}>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
