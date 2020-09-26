import { model, Schema } from "mongoose";

const AuthorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    biography: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, autoIndex: true }
);

AuthorSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

AuthorSchema.pre("updateOne", function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

export const AuthorModel = model("AuthorModel", AuthorSchema);
