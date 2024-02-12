"use client";

import LoadingSpinner from "../../../components/shared/Spinner";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { WorkspaceProps } from "@/types/workspace";
import { getWorkspaces } from "@/libs/actions/workspaces";
import Workspace from "./page.workspaceItem";

let page = 2;

export default function LoadMore() {
  const [ref, inView] = useInView();
  const [data, setData] = useState<WorkspaceProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      getWorkspaces(page).then((resp) => {
        if (resp.length > 0 && loading) {
          setData((prev) => [...prev, ...resp]);
          page++;
        } else {
          setLoading(false);
        }
      });
    }
  }, [inView, loading]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.map((workspace: WorkspaceProps) => (
          <Workspace data={workspace} key={`${workspace.id}`} />
        ))}
      </div>
      {loading && (
        <div
          className="h-full w-full flex items-center justify-center"
          ref={ref}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mb-1 text-fontSecondary">Please Wait...</div>
            <LoadingSpinner wrapperClass="text-fontSecondary" />
          </div>
        </div>
      )}
    </>
  );
}
