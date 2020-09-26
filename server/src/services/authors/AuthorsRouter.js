import { Router } from "express";

export class AuthorsRouter {
  constructor({ service }) {
    this.router = Router();
    this.service = service;

    this.router.get("/authors/", this.getAuthors.bind(this));
    this.router.post("/authors/", this.createAuthor.bind(this));
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
}
