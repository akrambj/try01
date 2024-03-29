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
  genres: [{ type: String }],
});

const booksModel = mongoose.model("books", booksSchema);

export default booksModel;
