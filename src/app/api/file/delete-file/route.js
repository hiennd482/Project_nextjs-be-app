import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";
import AuthUser from "@/middleware/AuthUser";
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
            message: "file  id is required",
          },
          { status: 404 }
        );
      }
      // const lesssonId = await Lesson.find({ child: id });
      await Lesson.updateOne(
        {
          child: id,
        },
        { $pull: { child: id } }
      );
      const deleteFile = await Filelessons.findByIdAndDelete(id);
      if (deleteFile) {
        return NextResponse.json({
          success: true,
          message: "Delete file successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to delete file",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not allowed to delete",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({});
  }
}
