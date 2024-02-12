import { dbConnection } from "@/database";
import { NextRequest, NextResponse } from "next/server";

// * Connect to the DB
dbConnection();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body, "body");
    return NextResponse.json({ code: 200, message: "OK" });
  } catch (error) {
    return NextResponse.json({ code: 500, message: "Internal Server Error" });
  }
}
