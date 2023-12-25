import connectToDB from "@/database";
import Course from "@/models/course";
import User from "@/models/user";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");
    if (!studentId) {
      return NextResponse.json({
        success: false,
        message: "Missing student Id",
      });
    }
    const getData = await User.find({ _id: studentId }).populate({
      path: "student_of",
      model: Course,
    });
    if (getData.length) {
      const { password, teacher_of, isAdmin, ...others } = getData[0]._doc;
      return NextResponse.json({
        success: true,
        data: { ...others },
      });
    } else {
      return NextResponse.json({ success: false, message: "not found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with your request",
    });
  }
}
