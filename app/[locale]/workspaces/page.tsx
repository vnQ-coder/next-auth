"use client";

// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
function Workspaces() {
  //   const session = await getServerSession(authOptions);
  //   console.log(session, "session");
  const { data ,status} = useSession();
  console.log(data, "data",status);
  if(!data)
  {
    return <div>Access Denied</div>
  }
  return <div>Workspaces

    {data && <button onClick={()=>signOut({callbackUrl:"http://localhost:3000/en/login"})}>Logout</button> }
  </div>;
}

export default Workspaces;
