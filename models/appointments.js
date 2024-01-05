import mongoose, { Schema } from "mongoose";

const appointmentSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  book: { type: Schema.Types.ObjectId, ref: "books" },
});

const appointmentsModel = mongoose.model("appointments", appointmentSchema);

export default appointmentsModel;
