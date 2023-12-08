import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    name: String,
    complete: Boolean,
    course_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    child: [
      {
        name: String,
        complete: Boolean,
        lesson_info: {
          lesson_url: String,
          type: String,
          name: String,
        },
        document_info: {
          document_url: String,
          name: String,
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
export default Lesson;
