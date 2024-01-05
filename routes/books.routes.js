import express from "express";
import boocksModel from "../models/Books.js";

export const router = express.Router();

router.post("/register", async (req, res) => {
  const data = new boocksModel({
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    genres: req.body.genres,
  });

  try {
    const value = await data.save();
    res.json(value);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  boocksModel
    .find()
    .then(function (books) {
      res.json(books);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get("/search", async (req, res) => {
  const { title } = req.query;

  try {
    const filteredBooks = await boocksModel.find({
      title: { $regex: title, $options: "i" },
    });

    if (filteredBooks.length === 0) {
      return res
        .status(404)
        .json({ error: "There are no books with such name" });
    } else {
      return res.json(filteredBooks);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await boocksModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    } else {
      res.json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, author, pages, genres } = req.body;
  try {
    const book = await boocksModel.findByIdAndUpdate(
      bookId,
      { title, author, pages, genres },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: "book not found" });
    } else {
      res.json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedBook = await boocksModel.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    } else {
      return res.status(201).json({ message: "Book deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
