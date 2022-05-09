import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
  name: String,
  seats: Number,
  seq: {
    type: Number,
    index: true,
  },
});

export default mongoose.models.events || mongoose.model("events", eventSchema);
