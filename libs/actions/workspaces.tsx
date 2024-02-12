"use server";

export const getWorkspaces = async (page: number) => {
  const resp = await fetch(
    `http://localhost:4010/api/main-server/workspaces/all?page=${page}&limit=16`
  );
  const data = await resp.json();
  if (data.code === 200) {
    return data.data;
  } else {
    return [];
  }
};

export const getProducts = async () => {
  const resp = await fetch(`http://localhost:3000/en/api?id=2323`);
  const data = await resp.json();
  return data;
};
