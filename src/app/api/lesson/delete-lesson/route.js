import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Lesson from "@/models/lesson";
import Course from "@/models/course";
import { NextResponse } from "next/server";

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
        return NextResponse.json(
          {
            success: false,
            message: "Lesson id is required",
          },
          { status: 404 }
        );
      }
      const courseId = await Course.find({ lessons_id: id });
      const getTotal = courseId.map((i) => {
        let total_lessons = 0;
        // console.log(i.lessons_id.length);
        total_lessons = i.lessons_id.length;
        // console.log(total_lessons);
        return total_lessons;
      });
      //   console.log(getTotal - 1);
      await Course.updateMany(
        {
          lessons_id: id,
        },
        {
          $pull: { lessons_id: id },
        }
      );
      const deleteLesson = await Lesson.findByIdAndDelete(id);
      if (deleteLesson) {
        return NextResponse.json({
          success: true,
          message: "Lesson deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to delete",
        });
      }
      //   return NextResponse.json({
      //     message: "xin chao",
      //   });
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
