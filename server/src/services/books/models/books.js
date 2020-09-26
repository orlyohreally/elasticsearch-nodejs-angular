import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

import { BookTagSchema } from "./book-tags";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: ObjectId, ref: "AuthorModel", index: true, required: true },
    genre: String,
    description: String,
    publishedAt: Date,
    tags: [BookTagSchema],
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, autoIndex: true }
);

BookSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

BookSchema.pre("updateOne", function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

export const BookModel = model("BookModel", BookSchema);
