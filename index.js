import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/books.routes.js";
import { userRouter } from "./routes/users.router.js";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECT_URL)
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/books", router);
app.use("/users", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is Listening on port", PORT);
});
