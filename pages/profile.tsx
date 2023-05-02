import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.replace("/signin");
    return null;
  }
  return (
    <>
      <div>profile</div>
    </>
  );
}
