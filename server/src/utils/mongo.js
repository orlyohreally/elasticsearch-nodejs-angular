export const modelTransformer = {
  versionKey: false,
  transform: (doc, ret) => ({
    ...ret,
    _id: ret._id ? ret._id.toString() : ret._id,
  }),
};
