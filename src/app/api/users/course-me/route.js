import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import User from "@/models/user";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    // const { searchParams } = new URL(req.url);
    // const courseMeId = searchParams.get("id");
    // const courseMe = await User.find({ student_id: courseMeId });
    if (isAuthUser) {
      const getData = await User.find({ _id: isAuthUser?.id }).populate({
        path: "student_of",
        model: Course,
      });
      if (getData.length) {
        const { student_of, ...others } = getData[0]._doc;
        return NextResponse.json({
          success: true,
          data: { student_of },
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "User not found",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not logged in",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong with API! please try again",
    });
  }
}
