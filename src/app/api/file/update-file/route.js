import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const extracData = await req.json();

    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "id is required",
      });
    }
    const updateFile = await Filelessons.findByIdAndUpdate(id, extracData, {
      new: true,
    });
    if (updateFile) {
      return NextResponse.json({
        success: true,
        message: "File updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "File not found",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "somethimg went wrong with your request",
    });
  }
}
