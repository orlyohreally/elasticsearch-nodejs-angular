import { Router } from "express";

const asyncHandler = require("express-async-handler");

export class AuthorsRouter {
  constructor({ service, elasticsearchService }) {
    this.router = Router();
    this.service = service;

    this.router.get("/authors/", asyncHandler(this.getAuthors.bind(this)));
    this.router.get(
      "/authors/search",
      asyncHandler(this.searchAuthors.bind(this))
    );
    this.router.post("/authors/", asyncHandler(this.createAuthor.bind(this)));
    this.router.post(
      "/authors/bulk",
      asyncHandler(this.createAuthors.bind(this))
    );
    this.router.delete(
      "/authors/",
      asyncHandler(this.deleteAllAuthors.bind(this))
    );
  }

  async getAuthors(req, res, next) {
    const authors = await this.service.getAuthors();
    return res.status(200).json({ authors });
  }

  async createAuthor(req, res, next) {
    const { author } = req.body;
    const newAuthor = await this.service.createAuthor(author);
    return res.status(200).json({ author: newAuthor });
  }

  async createAuthors(req, res, next) {
    const { authors } = req.body;
    const newAuthors = await this.service.createAuthors(authors);
    return res.status(200).json({ authors: newAuthors });
  }

  async searchAuthors(req, res) {
    const authors = await this.elasticsearchService.search("authors");
    return res.status(200).json({ authors });
  }

  async deleteAllAuthors(req, res) {
    await this.service.deleteAuthors();
    return res.status(200).json({ message: "All authors have been deleted" });
  }
}
