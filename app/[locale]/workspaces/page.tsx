"use client";

// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

function Workspaces() {
  //   const session = await getServerSession(authOptions);
  //   console.log(session, "session");
  const { data } = useSession();
  console.log(data, "data");
  return <div>Workspaces</div>;
}

export default Workspaces;
