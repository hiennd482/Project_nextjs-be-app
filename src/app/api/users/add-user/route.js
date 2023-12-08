// import connectToDB from "@/database";
// import User from "@/models/user";
// import Joi from "joi"
// import { NextResponse } from "next/server";

// const schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//     role: Joi.string().required(),
// });
// export const dynamic = "force-dynamic";
// export async function POST(req){
//     await connectToDB();
//   const { name, email, password, role } = await req.json();
//   const { error } = schema.validate({ name, email, password, role });
//   if (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: error.details[0].message,
//     });
//   }

// }
