import { startSession } from "mongoose";

import { AuthorModel } from "./models/authors";
import { modelTransformer } from "../../utils";

export class AuthorsDao {
  async getAuthors() {
    return AuthorModel.find({});
  }

  async getAuthor(authorId) {
    return AuthorModel.findById(authorId).exec();
  }

  async deleteAuthors() {
    return AuthorModel.deleteMany({}).exec();
  }

  async createAuthor(author) {
    const newAuthor = new AuthorModel(author);
    await newAuthor.save();
    return newAuthor.toJSON(modelTransformer);
  }

  async createAuthors(authors) {
    const session = await startSession();
    session.startTransaction();
    const newAuthors = await AuthorModel.insertMany(authors, { session });
    return { newAuthors, session };
  }
}
