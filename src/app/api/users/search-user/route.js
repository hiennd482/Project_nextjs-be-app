import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const nameUser = searchParams.get("name");
    if (!nameUser) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "use id is required",
      });
    }
    const searchUser = await User.find({ name: nameUser });
    // console.log("data ser", searchUser);
    if (searchUser.length && searchUser) {
      return NextResponse.json({
        success: true,
        message: searchUser,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Khong thay ket qua",
      });
    }
  } catch (error) {
    console.log(">api error: " + error);
    return NextResponse.json(
      {
        success: false,
        message: "Error ! plese try again",
      },
      {
        status: 500,
      }
    );
  }
}
