import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (
      isAuthUser?.role === "admin" ||
      isAuthUser?.role == "teacher" ||
      isAuthUser?.isAdmin === true
    ) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json(
          {
            success: false,
            message: "User id is required",
          },
          {
            status: 500,
          }
        );

      const deleteUser = await User.findByIdAndDelete(id);

      if (deleteUser) {
        return NextResponse.json({
          success: true,
          message: "User deleted successfully",
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to delete user",
          },
          {
            status: 201,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Your are not authenticated",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, please try again",
      },
      {
        status: 400,
      }
    );
  }
}
