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
    if (
      isAuthUser?.role === "admin" ||
      isAuthUser?.role === "teacher" ||
      isAuthUser?.isAdmin === true
    ) {
      if (studentID) {
        const courseId = await Course.findOne({ student_id: studentID });
        const totalCourse = courseId._doc.student_id?.length;
        await Course.updateMany(
          { student_id: studentID },
          {
            $pull: { student_id: studentID },
            $set: { total_student: totalCourse - 1 },
          }
        );
        const userID = await User.findById(studentID);
        await userID.updateOne({ $set: { student_of: [] } });
        return NextResponse.json({
          success: true,
          message: "Removed all successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Missing id student",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized ",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with API ! please try again",
    });
  }
}
