import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    session: {
      type: String,
      required: [true, "Session is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Education ||
  mongoose.model("Education", EducationSchema);
