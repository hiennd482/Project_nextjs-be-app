import connectToDB from "@/database";
import Course from "@/models/course";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const user = await User.find({});

    if (user) {
      return NextResponse.json({
        success: true,
        data: user,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No course",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again after 10 years",
    });
  }
}
