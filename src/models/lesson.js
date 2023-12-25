import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    name: String,
    complete: {
      type: Boolean,
      default: false,
    },
    course_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    child: [
      {
        // name: String,
        // complete: Boolean,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Filelesson",
        // lesson_info: {
        // },
        // document_info: [
        //   {
        //     document_url: String,
        //     name: String,
        //     type: String,
        //   },
        // ],
      },
    ],
  },
  { timestamps: true }
);
const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
export default Lesson;
