import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get("id");

    if (!teacherId) {
      return NextResponse.json({
        success: false,
        message: "Teacher id is required!",
      });
    }
    const teacherData = await User.find({ _id: teacherId });
    const checkTeacher = teacherData[0]._doc.role === "teacher";
    if (checkTeacher && teacherData.length) {
      //   console.log();
      const { password, ...others } = teacherData[0]._doc;
      return NextResponse.json({
        success: true,
        // message: "teacherData",
        data: { ...others },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No teacher found !",
        },
        {
          status: 204,
        }
      );
    }
  } catch (error) {
    console.log(">>>get teacher error: ", error);
    return NextResponse.json(
      {
        message: "loix roi",
      },
      { status: 404 }
    );
  }
}
