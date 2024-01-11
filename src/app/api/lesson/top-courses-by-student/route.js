import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Course from "@/models/course";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    //     {
    //       name: String,
    //       about_course: String,
    //       about_intro: String,
    //       thumbnail_url: {
    //         type: String,
    //         default: "",
    //       },
    //       lessons_id: [
    //         {
    //           type: mongoose.Schema.Types.ObjectId,
    //           ref: "Lessons",
    //         },
    //       ],
    //       total_complete_lessons: {
    //         type: Number,
    //         default: 0,
    //       },
    //       total_lessons: {
    //         type: Number,
    //         default: 0,
    //       },
    //       percent_complete: {
    //         type: Number,
    //         default: 100,
    //       },
    //       teacher_id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Users",
    //       },
    //       student_id: [
    //         {
    //           type: mongoose.Schema.Types.ObjectId,
    //           ref: "Users",
    //         },
    //       ],
    //       total_student: {
    //         type: Number,
    //         default: 0,
    //       },
    //       can_learn: {
    //         type: Boolean,
    //         default: true,
    //       },
    //       complete_lessons: {
    //         type: Array,
    //         default: [],
    //       },
    //     },
    //     { timestamps: true }
    //   );
    //This is Course Schema
    //Get top courses with the most students and count students
    //Sort ascending by total_student

    //order by  asc total_student
    const courses = await Course.find({})

    return NextResponse.json({
      success: true,
      message: "success",
      data: { courses },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with your request",
    });
  }
}
