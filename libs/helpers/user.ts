import User from "@/models/User";
import { generatePassword } from "@/utils";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

exports.createAdmin = async (body: User, createdBy: string) => {
  try {
    const user = await User.create({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.role,
      createdBy,
      isAdmin: true,
    });
    const newPassword = generatePassword(10);
    user.setPassword(newPassword);
    await user.save();
    // send email here with new password
    return {
      code: 200,
      message: "OK",
      data: user,
    };
  } catch (error) {
    console.log("error>", error);
    return {
      code: 500,
      message: "Internal Server Error",
    };
  }
};
