import connectToDB from "@/database";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");
    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: "course id is required",
      });
    }
    const getData = await Course.find({ _id: courseId }).populate({
      path: "lessons_id",
      model: Lesson,
    });
    if (getData && getData.length) {
      const { student_id, teacher_id, total_student, ...others } =
        getData[0]._doc;
      return NextResponse.json({
        success: true,
        data: { ...others },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "no course found",
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
