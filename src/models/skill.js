import mongoose, { Schema, models } from "mongoose";

const skillSchema = new Schema(
  {
    skill: { type: String, required: true }, // e.g., Frontend
    name: { type: String, required: true },  // e.g., React.js
    percentage: { type: Number, required: true },
    category: {
      type: String,
      enum: ["design", "development"],
      required: true,
    },
  },
  { timestamps: true }
);

const Skill = models.Skill || mongoose.model("Skill", skillSchema);
export default Skill;
