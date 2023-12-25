import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import { NextResponse } from "next/server";
import Lesson from "@/models/lesson";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("id");
    if (!chapterId) {
      return NextResponse.json({
        success: false,
        message: "chapter id is required",
      });
    }
    const getData = await Filelessons.find({ lesson_id: chapterId });
    if (getData && getData.length) {
      return NextResponse.json({
        success: true,
        data: getData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "khong tim thay file ",
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
