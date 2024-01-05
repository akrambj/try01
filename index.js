import express from "express";
import mongoose from "mongoose";
import { boocksModel } from "./models/Books.js";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGODB_CONNECT_URL);

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

app.get("/books", async (req, res) => {
  boocksModel
    .find()
    .then(function (books) {
      res.json(books);
    })
    .catch(function (err) {
      console.log(err);
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is Listening on port", PORT);
});
