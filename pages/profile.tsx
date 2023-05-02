import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/signin");
    },
  });

  if (status === "authenticated") {
    return <p>Signed in as {session?.user?.email}</p>;
  }

  return (
    <>
      <div>Not authenticated</div>
    </>
  );
}
