import connectToDB from "@/database";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const data = await req.json();
    const courseId = searchParams.get("id");
    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: "course id is required",
      });
    }
    const getData = await Course.findOne({ _id: courseId, can_learn: true });
    if (getData) {
      //   console.log(data);
      await getData.updateOne(
        { $push: { ...data } },
        { $set: { can_learn: false } }
      );
      return NextResponse.json({
        success: true,
        message: "setting complete!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "course not found",
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
