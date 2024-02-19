"use server";
import { dbConnection } from "@/database";
import User from "@/models/User";
import { UserBody } from "../types/user";

dbConnection();

export const getUsers = async () => {
  const data = await User.find({
    role: { $nin: ["super"] },
  }).select("id firstName lastName email picture");
  return data.map((d) => {
    return {
      id: d.id,
      picture: d.picture,
      firstName: d.firstName ? d.firstName : "User",
      lastName: d.lastName ? d.lastName : "User",
      email: d.email,
    };
  });
};

export const getUser = async (id: string | undefined | null) => {
  return await User.findOne({ _id: id })
    .select("id firstName lastName email")
    .lean();
};

export const createUser = async (body: UserBody) => {
  // create user here...
};
