import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    technology: {
      type: [String], // array of tech names
      required: [true, "Technology is required"],
    },
    url: {
      type: String,
      required: [true, "Project URL is required"],
      trim: true,
    },
    status: {
      type: Boolean, // ✅ true = active, false = inactive
      default: true,
    },
    feature: {
      type: Boolean, // ✅ simple flag, not array
      default: false,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
