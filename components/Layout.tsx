import { ReactNode } from "react";
import Navbar from "./Navbar";
import type { Session } from "next-auth";

type LayoutProps = {
  children: ReactNode;
  session: Session | null;
};

export default function Layout({ children, session }: LayoutProps) {
  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
