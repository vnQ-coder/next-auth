import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getUser } from "@/libs/actions/users";
import { getServerSession } from "next-auth";
import Main from "./main";

export default async function Workspaces() {
  const session: any = await getServerSession(authOptions);
  let data = null;
  if (session) {
    data = await getUser(session?.user?.id);
  }
  return <Main />;
}
