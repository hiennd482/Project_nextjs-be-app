import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynacmic = "force-dynamic";
export async function GET() {
  try {
    await connectToDB();
    const onlyStudent = await User.find({ role: "user" });
    if (onlyStudent) {
      return NextResponse.json({
        success: true,
        data: onlyStudent,
      });
    }
  } catch (error) {
    console.log(">>student error", error);
    return NextResponse.json({
      success: false,
      message: "loi roi ",
    });
  }
}
