import connectToDB from "@/database";
import Course from "@/models/course";
import Filelessons from "@/models/fileLesson";
import Lesson from "@/models/lesson";
import { NextResponse } from "next/server";
import { FaArrowAltCircleUp } from "react-icons/fa";
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
        // const checkTrue = await Filelessons.find(
        //   { _id: fileId },
        //   { complete: true }
        // );
        // console.log("first", checkTrue.length + 1);
        // arr.push(checkTrue);
        return NextResponse.json({
          success: false,
          message: "da cap nhat truoc do roi",
        });
      } else {
        let dataCourse = "";
        let idLesson = "";
        let lengthTrue = 0;
        const pathFile = await Filelessons.findById(fileId);
        await pathFile.updateOne({ $set: { complete: true } });
        // const checkTrue = await Filelessons.find(
        //   { _id: fileId },
        //   {
        //     complete: true,
        //   }
        // );
        // let check = checkTrue.length;
        // console.log("first", check + 1);
        const getLesson = await Lesson.find({ child: fileId }).populate({
          // path: "course_id",
          // model: Course,
          path: "child",
          model: Filelessons,
        });
        let arr = [];
        //   console.log("daay ", getLesson);
        getLesson.map((i) => {
          idLesson = i._id;
          // console.log("first", i);
          i.course_id.map((c) => {
            dataCourse = JSON.stringify(c._id);
          });
          i.child.map((t) => {
            if (t.complete === true) {
              arr.push(t.length);
              console.log(t);
            }
          });
          console.log(arr.length);
        });
        await Lesson.findByIdAndUpdate(
          { _id: idLesson },
          {
            $set: {
              complete: arr.length,
            },
          }
        );
        console.log(dataCourse.replace(/["]/g, ""));
        // const courseId = await Course.findByIdAndUpdate(
        //   {
        //     _id: dataCourse.replace(/["]/g, ""),
        //   },
        //   { total_complete_lessons: arr.length }
        // );
        const test = await Course.find(
          // {
          //   _id: dataCourse.replace(/["]/g, ""),
          // },
          {
            lessons_id: idLesson,
          }
        ).populate({
          path: "lessons_id",
          model: Lesson,
          // path: "child",
          // model: Filelessons,
        });
        let arrTrue = [];
        test.map((i) => {
          i.lessons_id.map((lesson) => {
            // lesson.child.map((file) => {
            // });
            arrTrue.push(lesson.complete);
          });
        });
        lengthTrue = arrTrue.reduce((partialSum, a) => partialSum + a, 0);
        console.log(lengthTrue);
        await Course.findByIdAndUpdate(
          { _id: dataCourse.replace(/["]/g, "") },
          {
            $set: {
              total_complete_lessons: lengthTrue,
            },
          }
        );
        return NextResponse.json({
          success: true,
          message: "patch successfully",
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
