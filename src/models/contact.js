import mongoose from "mongoose";

const ContactInfoSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInfo ||
  mongoose.model("ContactInfo", ContactInfoSchema);
