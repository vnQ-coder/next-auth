import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getUser } from "@/libs/actions/users";
import { getServerSession } from "next-auth";
import CreateAdmin from "./button";

export default async function Workspaces() {
  const session: any = await getServerSession(authOptions);
  let data = null;
  if (session) {
    data = await getUser(session?.user?.id);
  }

  return (
    <div className="">
      Workspaces
      {data && <div>Name: {data.firstName + " " + data.lastName}</div>}
      <CreateAdmin />
    </div>
  );
}
