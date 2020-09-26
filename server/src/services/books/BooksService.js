const Joi = require("joi");

export class BooksService {
  constructor({ dao }) {
    this.dao = dao;
  }

  async getBooks() {
    return this.dao.getBooks();
  }

  async createBook(book) {
    return this.dao.createBook(book);
  }

  async updateBook(bookId, book) {
    return this.dao.updateBook(bookId, book);
  }

  async validateBook(book) {
    const schema = Joi.object({
      title: Joi.string().max(50).required(),
      authorId: Joi.string().required(),
      genre: Joi.string().max(50).required(),
      description: Joi.string().max(200),
      publishedAt: Joi.date(),
    }).required();
    return schema.validateAsync(book);
  }
}
