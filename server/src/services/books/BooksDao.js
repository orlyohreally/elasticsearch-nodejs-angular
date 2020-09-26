import { BookModel } from "./models/books";
import { modelTransformer } from "../../utils";

export class BooksDao {
  async getBooks() {
    return BookModel.find({});
  }

  async createBook(book) {
    const newBook = new BookModel(book);
    await newBook.save();
    return newBook.toJSON(modelTransformer);
  }

  async updateBook(bookId, book) {
    return BookModel.findByIdAndUpdate(new ObjectId(bookId), book, {
      new: true,
    })
      .lean()
      .exec();
  }
}
