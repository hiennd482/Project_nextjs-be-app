import connectToDB from "@/database";
import Course from "@/models/course";
import { NextResponse } from "next/server";
import AuthUser from "@/middleware/AuthUser";
import User from "@/models/user";
export const dynamic = "force-dynamic";
export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (
      isAuthUser?.role === "admin" ||
      isAuthUser?.role === "teacher" ||
      isAuthUser?.isAdmin === true
    ) {
      const extracData = await req.json();
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Course id is required",
        });
      }
      const course = await Course.findById(id);
      const formData = {
        $set: extracData,
        // total_student: course.student_id.length,
      };
      console.log("first", course.student_id.length);
      await course.updateOne(formData, { new: true });
      if (extracData.teacher_id) {
        const teacherId = User.findOne({ _id: extracData.teacher_id });
        await teacherId.updateOne({ $set: { teacher_of: extracData._id } });
      }
      if (extracData.student_id) {
        const teacherId = User.findOne({ _id: extracData.student_id });
        await teacherId.updateOne({ $push: { student_of: extracData._id } });
      }
      return NextResponse.json({
        success: true,
        message: "Course updated successfully",
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
      message: "Error api! Please try again ",
    });
  }
}
