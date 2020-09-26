import { model, Schema } from "mongoose";

export const BookTagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, autoIndex: true }
);

BookTagSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

BookTagSchema.pre("updateOne", function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

export const BookTagModel = model("BookTagModel", BookTagSchema);
