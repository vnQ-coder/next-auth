import User from "@/models/User";
import { generatePassword } from "@/utils";
import {
  AlreadyExistsResponse,
  InternalServerErrorResponse,
  OKResponse,
} from "../helper";
import { UserBody } from "../types/user";

const getUserBody = (user: UserBody, isAdmin = false) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    isAdmin: isAdmin,
    isMember: !isAdmin,
  };
};

const saveUserWithPassword = async (body: UserBody, isAdmin: boolean) => {
  try {
    let user = await User.create(getUserBody(body, isAdmin));
    const newPassword = generatePassword(10);
    user.setPassword(newPassword);
    user = await user.save();
    return user.toObject() || null;
  } catch (err) {
    console.log(err, "err");
    return null;
  }
};

export const insertAdmin = async (body: UserBody) => {
  try {
    const userExists = await User.findOne({ email: body.email });
    if (!userExists) {
      const user = await saveUserWithPassword(body, true);
      if (user) {
        // send email here with new password
        return OKResponse(user);
      } else {
        return InternalServerErrorResponse();
      }
    } else {
      return AlreadyExistsResponse();
    }
  } catch (error) {
    console.log("error>", error);
    return InternalServerErrorResponse();
  }
};

export const insertUser = async (body: UserBody) => {
  try {
    const user = await saveUserWithPassword(body, false);
    if (user) {
      // send email here with new password
      return OKResponse(user);
    } else {
      return InternalServerErrorResponse();
    }
  } catch (error) {
    console.log("error>", error);
    return InternalServerErrorResponse();
  }
};
