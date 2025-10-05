import mongoose, { model, models, Schema } from "mongoose";

// Define the Banner schema
const bannerSchema = new Schema(
  {
    header: {
      type: String,
      required: [true, "Header is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    button: {
      type: String,
      default: null, // optional field
      trim: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Use existing model if it exists (prevents recompilation errors in Next.js)
const Banner = models.Banner || model("Banner", bannerSchema);

export default Banner;
