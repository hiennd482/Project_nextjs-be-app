import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
import User from "@/models/user";
import Course from "@/models/course";
export const dynamic = "force-dynamic";
export async function DELETE(req) {
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
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Course id is required",
        });
      }
      await User.updateMany({ student_of: id }, { $pull: { student_of: id } });
      const deleteCourse = await Course.findByIdAndDelete(id);
      if (deleteCourse) {
        return NextResponse.json({
          success: true,
          message: "Course deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Course not found",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authorized to delete",
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
