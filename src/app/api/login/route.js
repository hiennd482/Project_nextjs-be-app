import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });

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
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found with this email",
        },
        { status: 400 }
      );
    }

    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password. Please try again !",
        },
        { status: 400 }
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
      message: "Login successfull!",
      finalData,
    });
  } catch (e) {
    console.log("Error while logging In. Please try again");

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong ! Please try again later",
      },
      {
        status: 404,
      }
    );
  }
}
