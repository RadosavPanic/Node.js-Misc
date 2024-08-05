import { Router } from "express";
import Book from "../models/book.js";

const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

booksRouter.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

booksRouter.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear)
      res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });

    const result = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!result) res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

booksRouter.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear)
      res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });

    const book = new Book(req.body);
    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

booksRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default booksRouter;
