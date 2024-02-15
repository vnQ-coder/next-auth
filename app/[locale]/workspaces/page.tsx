import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Header from "@/components/shared/Header";
import { getUser } from "@/libs/actions/workspaces";
import { getServerSession } from "next-auth";

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
      <Header />
    </div>
  );
}
