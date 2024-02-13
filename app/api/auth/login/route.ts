import { dbConnection } from "@/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    let user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        code: 400,
        message: "Invalid email or password.",
      });
    }
    if (user.suspended) {
      return NextResponse.json({
        code: 400,
        message: "You are suspended, please try again.",
      });
    }
    if (user.validatePassword(password)) {
      return NextResponse.json({ code: 200, message: "OK" });
    } else {
      return NextResponse.json({
        code: 400,
        message: "Invalid email or password.",
      });
    }
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ code: 500, message: "Internal Server Error" });
  }
}
