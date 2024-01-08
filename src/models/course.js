import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: String,
    about_course: String,
    about_intro: String,
    thumbnail_url: {
      type: String,
      default: "",
    },
    lessons_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lessons",
      },
    ],
    total_complete_lessons: {
      type: Number,
      default: 0,
    },
    total_lessons: {
      type: Number,
      default: 0,
    },
    percent_complete: {
      type: Number,
      default: 100,
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    student_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    total_student: {
      type: Number,
      default: 0,
    },
    can_learn: {
      type: Boolean,
      default: true,
    },
    complete_lessons: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
let Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
