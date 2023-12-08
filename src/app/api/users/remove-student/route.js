import connectToDB from "@/database";
import User from "@/models/user";
import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
import Course from "@/models/course";

export const dynamic = "force-dynamic";
export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    const { searchParams } = new URL(req.url);
    const studentID = searchParams.get("id");
    const courseID = searchParams.get("course_id");
    if (
      isAuthUser?.role === "admin" ||
      isAuthUser?.role === "teacher" ||
      isAuthUser?.isAdmin === true
    ) {
      if (studentID) {
        await Course.findOne({ _id: courseID });
        await Course.updateOne(
          { student_id: studentID },
          { $pull: { student_id: studentID } }
        );
      } else {
        return NextResponse.json({
          success: false,
          message: "Student not found",
        });
      }
      if (courseID) {
        await User.findOne({ student_of: courseID });
        await User.updateOne(
          { student_of: courseID },
          { $pull: { student_of: courseID } }
        );
      } else {
        return NextResponse.json({
          success: false,
          message: "Course not found",
        });
      }
      return NextResponse.json({
        succes: true,
        message: "remove successfully!",
      });
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
      message: "something went wrong with API! please try again",
    });
  }
}