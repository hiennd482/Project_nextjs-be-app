import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const onlyTeacher = await User.find({ role: "teacher" });
    if (onlyTeacher && onlyTeacher.length) {
      //   console.log(onlyTeacher);

      //   const { password, photo, student_of, ...others } = onlyTeacher._doc;
      return NextResponse.json({
        success: true,
        data: onlyTeacher,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with your request",
    });
  }
}
