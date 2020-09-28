import { AuthorsDao } from "./AuthorsDao";
import { AuthorsRouter } from "./AuthorsRouter";
import { AuthorsService } from "./AuthorsService";

import { elasticsearchService } from "../elasticsearch";

export const authorsService = new AuthorsService({
  dao: new AuthorsDao(),
  elasticsearchService: elasticsearchService,
});

export const authorsRouter = new AuthorsRouter({
  service: authorsService,
}).router;
