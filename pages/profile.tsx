import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
      <>
        <div>Signed in as {session?.user?.email}</div>;
      </>
    );
}
