import { getUsers } from "@/libs/actions/users";
import Main from "./main";

export default async function Users() {
  let data = await getUsers();
  return <Main data={data} />;
}
