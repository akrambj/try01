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

//       "startDate": "2024-01-06T12:00:00Z",
// "endDate": "2024-01-06T12:20:00Z"
