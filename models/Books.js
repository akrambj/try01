import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  genres: {
    type: Object,
  },
});

export const boocksModel = mongoose.model("books", booksSchema);
