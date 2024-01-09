import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";
import AuthUser from "@/middleware/AuthUser";
import Course from "@/models/course";
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

      const deleteFile = await Filelessons.findByIdAndDelete(id);
      if (deleteFile) {
        let dataCourse = "";
        const lessonId = await Lesson.find({ child: id }).populate({
          path: "course_id",
          model: Course,
        });
        // await lessonId.updateOne({ $push: { child: newFile._id } });

        lessonId.map((i) => {
          // console.log(i.course_id._doc[0]);
          i.course_id.map((c) => {
            dataCourse = JSON.stringify(c._id);
          });
        });
        // console.log(dataCourse.toString());
        console.log(dataCourse.replace(/["]/g, ""));

        const courseId = await Course.find({
          _id: dataCourse.replace(/["]/g, ""),
        }).populate({
          path: "lessons_id",
          model: Lesson,
        });

        // console.log("test data", totalLesson);
        const getTotal = courseId.map((i) => {
          let total_lessons = 0;
          // console.log("total", i);
          let arr = [];
          i.lessons_id.map((i) => {
            // const childData=await Lesson.find({_id:i.})
            console.log(i.child.length);
            arr.push(i.child.length);
          });
          total_lessons = arr.reduce((partialSum, a) => partialSum + a, 0);
          console.log(total_lessons);
          return total_lessons;
          // console.log("tét", i.lessons_id.child);
        });
        // let numbertotal = 0;
        // numbertotal = +getTotal + 1;
        // console.log(numbertotal);
        // const getCuour
        await Course.findByIdAndUpdate(
          { _id: dataCourse.replace(/["]/g, "") },
          {
            $set: { total_lessons: +getTotal - 1 },
          }
        );
        await Lesson.updateOne(
          {
            child: id,
          },
          { $pull: { child: id } }
        );
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
