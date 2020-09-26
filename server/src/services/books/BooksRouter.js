import { Router } from "express";
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");

export class BooksRouter {
  constructor({ service }) {
    this.router = Router();
    this.service = service;

    this.router.get("/books/", asyncHandler(this.getBooks.bind(this)));
    this.router.post("/books/", asyncHandler(this.createBook.bind(this)));
  }

  async getBooks(req, res) {
    const books = await this.service.getBooks();
    return res.status(200).json({ books });
  }

  async createBook(req, res, next) {
    const { book } = req.body;
    try {
      const error = await this.service.validateBook(book);
      console.log("eeeeee", error);
    } catch (error) {
      console.log("validation error");
      throw createError(400, error);
    }
    const newBook = await this.service.createBook(book);
    return res.status(200).json({ book: newBook });
  }

  async editBook(req, res) {
    const { book } = req.body;
    const { bookId } = req.params;
    const { error } = this.service.validateBook(book);
    if (error) {
      throw createError(400, error);
    }
    const updatedBook = await this.service.updateBook(bookId, book);
    return res.status(200).json({ book: updatedBook });
  }
}
