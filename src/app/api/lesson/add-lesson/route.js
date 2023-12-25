import connectToDB from "@/database";
import Lesson from "@/models/lesson";
import Course from "@/models/course";
import Joi from "joi";
import { NextResponse } from "next/server";
const schema = Joi.object({
  name: Joi.string().required(),
  course_id: Joi.string().required(),
});
export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const { name, course_id } = data;
    const { error } = schema.validate({ name, course_id });
    if (error) {
      console.log(error);
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newLesson = await Lesson.create(data);
    if (data.course_id) {
      // console.log("data length", newLesson._id.length);
      // const countLesson=await Lesson.findById
      const courseId = await Course.findById(data.course_id);
      console.log("test data", courseId._doc.lessons_id.length);
      const totalLesson = courseId._doc.lessons_id.length;
      // return NextResponse.json({
      //   message: courseId,
      // });
      await courseId.updateOne({
        $push: { lessons_id: newLesson._id },
        $set: { total_lessons: totalLesson + 1 },
      });
      // const testCourse = await Course.findById(data.course_id);
      // await courseId.updateOne({
      //   $set: { total_lessons: testCourse.lessons_id.length },
      // });
    }
    // return NextResponse.json({
    //   message: "xin chao",
    // });
    if (newLesson) {
      return NextResponse.json({
        success: true,
        message: "Lesson created successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to add new lesson",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong with your API! Please try again",
    });
  }
}
