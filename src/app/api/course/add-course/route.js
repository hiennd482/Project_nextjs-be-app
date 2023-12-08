import connectToDB from "@/database";
import Course from "@/models/course";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  teacher_id: Joi.string().required(),
  about_course: Joi.string().required(),
});
export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const { name, teacher_id, about_course } = data;
    const { error } = schema.validate({ name, teacher_id, about_course });
    if (error) {
      console.log(error);
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
    // const isCourseAlreadyExists = await Course.find({ name: data.name });
    // if (isCourseAlreadyExists) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Course already exists, please try with different course name",
    //     },
    //     {
    //       status: 201,
    //     }
    //   );
    // } else {

    // }
    const newCourse = await Course.create(data);
    if (data.teacher_id) {
      const teacherId = User.findOne({ _id: data.teacher_id });
      await teacherId.updateOne({ $push: { teacher_of: newCourse._id } });
    }
    if (data.student_id) {
      const studentId = User.findOne({ _id: data.student_id });
      await studentId.updateOne({ $push: { student_of: newCourse._id } });
    }
    if (newCourse) {
      return NextResponse.json({
        success: true,
        message: "Course is added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed add new course !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Somethign went wrong about api ! please try again",
    });
  }
}
