import mongoose from "mongoose";
import { eventSchema } from "./events";

const registrationSchema = new mongoose.Schema(
  {
    email: String,
    contact: String,
    order_id: String,
    razorpay_event_id: { type: String, index: true },
    college: String,
    name: String,
    groupName: String,
    events: [eventSchema],
  },
  { timestamps: true }
);

export default mongoose.models.registration ||
  mongoose.model("registration", registrationSchema);
