import connectToDB from "@/database";
import Filelessons from "@/models/fileLesson";
import { NextResponse } from "next/server";
import Lesson from "@/models/lesson";
import Joi from "joi";
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
    const newFile = await Filelessons.create(data);

    if (data.lesson_id) {
      const lessonId = Lesson.findOne({ _id: data.lesson_id });
      await lessonId.updateOne({ $push: { child: newFile._id } });
    }
    if (newFile) {
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
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong with API request",
    });
  }
}
