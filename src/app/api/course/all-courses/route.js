import connectToDB from "@/database";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const getCourse = await Course.find({});
    if (getCourse.length) {
      return NextResponse.json({
        success: true,
        data: getCourse,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "API error",
    });
  }
}
