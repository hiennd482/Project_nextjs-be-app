import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(res, req) {
  try {
    await connectToDB();
    const extractAllusers = await User.find({});
    if (extractAllusers) {
      return NextResponse.json({
        success: true,
        data: extractAllusers,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "NO users found!",
      });
    }
  } catch (error) {
    console.log(">> api error: ", error);
    return NextResponse.json({
      success: false,
      message: "Error ! Please try again",
    });
  }
}
