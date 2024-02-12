import { getWorkspaces, getProducts } from "@/libs/actions/workspaces";
import { use } from "react";
import Workspace from "./page.workspaceItem";
import LoadMore from "./page.loadMore";
import { WorkspaceProps } from "@/types/workspace";

const Workspaces = () => {
  const data = use(getWorkspaces(1));
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.map((workspace: WorkspaceProps) => (
          <Workspace data={workspace} key={`${workspace.id}`} />
        ))}
      </div>
      <LoadMore />
    </>
  );
};

export default Workspaces;
