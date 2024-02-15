"use server";
import { dbConnection } from "@/database";
import User from "@/models/User";

dbConnection();

export const getUsers = async () => {
  return await User.find({}).select("id firstName lastName email");
};

export const getUser = async (id: string | undefined | null) => {
  return await User.findOne({ _id: id }).select("id firstName lastName email");
};
