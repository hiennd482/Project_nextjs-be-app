import connectToDB from "@/database";
import User from "@/models/user";
import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    await connectToDB();
    const isAuhtUser = await AuthUser(req);
    // const { searchParams } = new URL(isAuhtUser.id);
    // const userID = searchParams.get("id");

    if (isAuhtUser) {
      const getData = await User.find({ _id: isAuhtUser?.id });
      if (getData && getData.length) {
        const { password, teacher_of, student_of, ...others } = getData[0]._doc;
        return NextResponse.json({
          succes: true,
          data: { ...others },
        });
      } else {
        return NextResponse.json(
          {
            message: "User not found",
          },
          { status: 204 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "you are not authenticated!" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
