"use server";
import { dbConnection } from "@/database";
import User from "@/models/User";
import { insertAdmin } from "../helpers/user";
import { UserBody } from "../types/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

dbConnection();

export const getAdmins = async () => {
  return await User.find({ isAdmin: true, isDeleted: false }).select(
    "id firstName lastName email"
  );
};

export const getAdmin = async (id: string | undefined | null) => {
  return await User.findOne({ _id: id }).select("id firstName lastName email");
};

export const createAdmin = async (body: UserBody) => {
  const session = await getServerSession(authOptions);
  console.log(session, "session");
  return null;
};
