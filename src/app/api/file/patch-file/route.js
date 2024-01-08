import connectToDB from "@/database";
import Course from "@/models/course";
import Filelessons from "@/models/fileLesson";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function PATCH(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    // const extracData = await req.json();
    const fileId = searchParams.get("id");
    if (!fileId) {
      return NextResponse.json({
        success: false,
        message: "file id is required",
      });
    } else {
      const findFile = await Filelessons.findOne({
        _id: fileId,
        complete: true,
      });
      if (findFile) {
        let arr = [];
        const checkTrue = await Filelessons.find({ complete: true });
        console.log("first", checkTrue.length);
        // arr.push(checkTrue);
        return NextResponse.json({
          success: false,
          message: "da cap nhat truoc do roi",
        });
      } else {
        let dataCourse = "";
        const pathFile = await Filelessons.findById(fileId);
        await pathFile.updateOne({ $set: { complete: true } });
        const checkTrue = await Filelessons.find({
          complete: true,
        });
        console.log("first", checkTrue.length);
        const getLesson = await Lesson.find({ child: fileId }).populate({
          path: "course_id",
          model: Course,
        });
        //   console.log("daay ", getLesson);
        getLesson.map((i) => {
          console.log("first", i);
          i.course_id.map((c) => {
            dataCourse = JSON.stringify(c._id);
          });
        });
        console.log(dataCourse.replace(/["]/g, ""));
        const courseId = await Course.findByIdAndUpdate(
          {
            _id: dataCourse.replace(/["]/g, ""),
          },
          { total_complete_lessons: checkTrue.length }
        );
        return NextResponse.json({
          success: true,
          message: "update progress successfully ",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with your request!!",
    });
  }
}
