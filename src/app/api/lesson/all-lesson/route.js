import connectToDB from "@/database";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const getLesson = await Lesson.find();
    if (getLesson) {
      return NextResponse.json({
        success: true,
        data: getLesson,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Couldn't find",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with your request!",
    });
  }
}
