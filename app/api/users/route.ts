import { dbConnection } from "@/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnection();
    const users = await User.find({}).select("email");
    return NextResponse.json({ code: 200, data: users, message: "OK" });
  } catch (error) {
    console.log("Error retrieving users:", error);
    return NextResponse.json({ code: 500, message: "Internal Server Error" });
  }
}
