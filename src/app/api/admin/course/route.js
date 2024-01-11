import connectToDB from "@/database";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    //get top 5 user completed course
    const course = await Course.find();

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again after 10 years",
    });
  }
}
