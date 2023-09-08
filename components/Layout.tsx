import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
