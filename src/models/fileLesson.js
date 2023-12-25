import mongoose from "mongoose";
const fileSchema = new mongoose.Schema(
  {
    name: String,
    complete: {
      type: Boolean,
      default: false,
    },
    lesson_url: {
      type: String,
      default: "",
    },
    lesson_file: {
      type: String,
      default: "",
    },
    lesson_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  },
  { timestamps: true }
);
const Filelessons =
  mongoose.models.Filelesson || mongoose.model("Filelesson", fileSchema);
export default Filelessons;
