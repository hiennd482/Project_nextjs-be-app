import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import AuthUser from "@/middleware/AuthUser";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = Joi.object({
  refresh_token: Joi.string().required(),
});
export const dynamic = "force-dynamic";
export async function POST(req) {
  await connectToDB();
  const { refresh_token } = await req.json();
  const { error } = schema.validate({ refresh_token });
  const TokenUser = async () => {
    const token = refresh_token;

    if (!token) return false;

    try {
      const extractAuthUserInfo = jwt.verify(token, "default_secret_key");
      if (extractAuthUserInfo) return extractAuthUserInfo;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.details[0].message,
      },
      { status: 400 }
    );
  }

  try {
    const token = await TokenUser();
    const checkUser = await User.findOne({ _id: token.id });
    if (!checkUser) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid token!",
        },
        {
          status: 401,
        }
      );
    }
    const access_token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
        course: checkUser?.student_of,
        isAdmin: checkUser?.isAdmin,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );
    const refresh_token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
        course: checkUser?.student_of,
      },
      "default_secret_key",
      { expiresIn: "90d" }
    );
    const finalData = {
      access_token,
      refresh_token,

      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
        isAdmin: checkUser.isAdmin,
      },
    };
    return NextResponse.json({
      success: true,
      message: "refresh successfull!",
      finalData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
