import { BooksDao } from "./BooksDao";
import { BooksRouter } from "./BooksRouter";
import { BooksService } from "./BooksService";

export const booksService = new BooksService({
  dao: new BooksDao(),
});

export const booksRouter = new BooksRouter({
  service: booksService,
}).router;