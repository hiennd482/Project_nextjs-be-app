import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import { NextResponse } from "next/server";
import Lesson from "@/models/lesson";
import Joi from "joi";
import Course from "@/models/course";

export const dynamic = "force-dynamic";
const schema = Joi.object({
  lesson_id: Joi.string().required(),
});
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const { lesson_id } = data;
    const { error } = schema.validate({ lesson_id });
    if (error) {
      console.log(error);
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    if (data.name !== "") {
      console.log(data);
      const newFile = await Filelessons.create(data);
      let dataCourse = "";
      const lessonId = await Lesson.find({ _id: data.lesson_id }).populate({
        path: "course_id",
        model: Course,
      });
      const pushFile = await Lesson.updateMany({
        $push: { child: newFile._id },
      });
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
          // console.log(i.child);
          arr.push(i.child.length);
        });
        total_lessons = arr.reduce((partialSum, a) => partialSum + a, 0);
        console.log(total_lessons);
        return total_lessons;
        // console.log("tét", i.lessons_id.child);
      });
      let numbertotal = 0;
      numbertotal = +getTotal + 1;
      console.log(numbertotal);
      await Course.updateMany({
        $set: { total_lessons: numbertotal },
      });
      // await lessonId.updateOne({ $push: { child: newFile._id } });
      // console.log("file", (dataCourse = lessonId));
      if (pushFile) {
        return NextResponse.json({
          success: true,
          message: "File created successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add new lesson",
        });
      }
      // return NextResponse.json({
      //   message: "thanh con",
      // });
    } else
      return NextResponse.json({
        success: false,
        message: "failed to add new lesson",
      });
    // if (newFile) {
    //   return NextResponse.json({
    //     success: true,
    //     message: "File created successfully",
    //   });
    // } else {
    //   return NextResponse.json({
    //     success: false,
    //     message: "failed to add new lesson",
    //   });
    // }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with API request",
    });
  }
}
