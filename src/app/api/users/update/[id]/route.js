import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PUT(req, res, { params }) {
  try {
    const { id } = params;
    const { newName: name, newRole: role } = await req.json();
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (
      isAuthUser?.role === "admin" ||
      isAuthUser?.role === "teacher" ||
      isAuthUser?.isAdmin === true
    ) {
      // const extracData = await req.json();
      // const { _id, name, role } = extracData;

      const updateUser = await User.findByIdAndUpdate(
        { _id: id },
        { name, role },
        {
          new: true,
        }
      );
      if (updateUser) {
        return NextResponse.json({
          success: true,
          message: "User updated!",
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "failed to update user!",
          },
          {
            status: 201,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          status: 401,
          success: false,
          message: "You are not authenticated",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log(">>> api error: " + error);
    return NextResponse.json(
      {
        status: 400,
        success: false,
        message: "Something went wrong! " + error,
      },
      {
        status: 400,
      }
    );
  }
}
