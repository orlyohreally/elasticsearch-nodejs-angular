require("dotenv").config();
import mongoose from "mongoose";
const express = require("express");
import * as bodyParser from "body-parser";

import { booksRouter } from "./services/books";
import { authorsRouter } from "./services/authors";

export const runServer = async (port, mongoUri) => {
  if (!port) {
    process.exit(1);
  }
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  const apiPath = "/api/v1";
  const app = express();

  const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });

  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  app.use(apiPath, booksRouter);
  app.use(apiPath, authorsRouter);

  app.use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
      status: error.status,
      message: error.message,
      ...(process.env.NODE_ENV === "dev" && { stack: error.stack }),
    });
  });

  //   app.use(express.static(path.join(__dirname, "/assets/frontend")));

  //   app.get("/*", (req, res) => {
  //     res.sendFile(path.join(__dirname, "/assets/frontend/index.html"));
  //   });
  return server;
};
