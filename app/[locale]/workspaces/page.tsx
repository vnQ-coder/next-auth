"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

function Workspaces() {
  const { data, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!data) {
    redirect("/en/login");
  }
  return (
    <div>
      Workspaces
      {data && (
        <button
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/en/login" })
          }
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Workspaces;
