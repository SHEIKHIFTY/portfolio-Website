import mongoose, { model, models } from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    projects: { type: Number, default: 0 }, // ✅ add this
    
  },
  { timestamps: true }
);

const Service = models.Service || model("Service", ServiceSchema);
export default Service;

