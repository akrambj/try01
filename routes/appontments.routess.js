import express from "express";
import appointmentsModel from "../models/appointments.js";
import Joi from "joi";

export const appointmentsRouter = express.Router();

const joiAppointmentSchema = Joi.object({
  user: Joi.string().required(),
  book: Joi.string().required(),
  startDate: Joi.date().min(new Date()).required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});

appointmentsRouter.get("/", async (req, res) => {
  try {
    const appointments = await appointmentsModel.find();
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).send("Internal Server Error");
  }
});

appointmentsRouter.post("/", async (req, res) => {
  try {
    // Validate the request payload using Joi
    const { error, value } = joiAppointmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Destructure validated values
    const { user, book, startDate, endDate } = value;

    // Create a new appointment
    const newAppointment = new appointmentsModel({
      user,
      book,
      startDate,
      endDate,
    });

    // Save the new appointment to the database
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    if (error.code === 11000 || error.code === 11001) {
      // MongoDB duplicate key error
      return res.status(400).json({
        error:
          "Duplicate appointment. Please choose a different combination of users, books, and start date.",
      });
    }
    res.status(500).send("Internal Server Error");
  }
});

appointmentsRouter.get("/:id", async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await appointmentsModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "appointment not found" });
    } else {
      res.json(appointment);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

appointmentsRouter.put("/:id", async (req, res) => {
  const appointmentId = req.params.id;
  const { startDate, endDate } = req.body;
  try {
    const appointment = await appointmentsModel.findByIdAndUpdate(
      appointmentId,
      { startDate, endDate },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: " appointment not found" });
    } else {
      res.json(appointment);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

appointmentsRouter.delete("/:id", async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const deletedAppointment = await appointmentsModel.findByIdAndDelete({
      _id: appointmentId,
    });

    if (!deletedAppointment) {
      return res.status(404).json({ error: "appointment not found" });
    } else {
      return res
        .status(201)
        .json({ message: "appointment deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
