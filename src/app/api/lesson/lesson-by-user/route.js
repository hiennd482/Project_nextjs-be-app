import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import Lesson from "@/models/lesson";
import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");
    const isAuthUser = await AuthUser(req);
    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: "course id is required",
      });
    }
    if (isAuthUser) {
      const getData = await Lesson.find({
        course_id: courseId,
      }).populate({
        path: "child",
        model: Filelessons,
      });
      if (getData && getData.length) {
        return NextResponse.json({
          success: true,
          data: getData,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Khong tim thay data",
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
      message: "something went wrong with your request",
    });
  }
}
