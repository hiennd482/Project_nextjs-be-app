import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("id");
    if (!lessonId) {
      return NextResponse.json({
        success: false,
        message: "lesson id is required",
      });
    }
    const getData = await Lesson.find({ _id: lessonId }).populate({
      path: "child",
      model: Filelessons,
    });
    if (getData && getData.length) {
      return NextResponse.json({
        success: true,
        data: getData[0],
      });
    } else {
      return NextResponse.json({
        sucess: false,
        message: "khong ttim thay chapter",
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
