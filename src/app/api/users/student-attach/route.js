import connectToDB from "@/database";
import User from "@/models/user";
import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
import Course from "@/models/course";
export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");
    if (
      isAuthUser?.role === "admin" ||
      isAuthUser?.role === "teacher" ||
      isAuthUser?.isAdmin === true
    ) {
      if (!studentId) {
        return NextResponse.json({
          success: false,
          message: "Student's ID is required",
        });
      }
      const extracData = await req.json();
      const checkUser = await User.findById(studentId);
      await checkUser.updateOne({ $push: extracData });
      if (extracData.student_of) {
        const courseId = Course.findOne({ _id: extracData.student_of });
        await courseId.updateMany({
          $push: { student_id: checkUser._id },
        });
        // console.log("check loeng", courseId);
        return NextResponse.json({
          success: true,
          message: "attachments successfully",
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Course not found",
          },
          {
            status: 404,
          }
        );
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with api! Please try again",
    });
  }
}
