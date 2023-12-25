import connectToDB from "@/database";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PUT(req) {
  try {
    await connectToDB();
    const extracData = await req.json();
    const { _id, name } = extracData;
    const updateLesson = await Lesson.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        name,
      },
      {
        new: true,
      }
    );
    if (updateLesson) {
      return NextResponse.json({
        success: true,
        message: "Lesson updated successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with your request!",
    });
  }
}
