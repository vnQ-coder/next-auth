"use server";
import { dbConnection } from "@/database";
import User from "@/models/User";

dbConnection();

export const login = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;
    let user = await User.findOne({ email: email });
    if (!user) {
      return {
        code: 400,
        message: "Invalid email or password.",
      };
    }
    if (user.suspended) {
      return {
        code: 400,
        message: "You are suspended, please try again.",
      };
    }
    if (user.validatePassword(password)) {
      return { code: 200, message: "OK" };
    } else {
      return {
        code: 400,
        message: "Invalid email or password.",
      };
    }
  } catch (err) {
    console.log(err, "err");
    return {
      code: 400,
      message: "Invalid email or password.",
    };
  }
};
