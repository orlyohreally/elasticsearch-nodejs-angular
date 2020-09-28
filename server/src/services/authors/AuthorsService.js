export class AuthorsService {
  constructor({ dao, elasticsearchService }) {
    this.dao = dao;
    this.elasticsearchService = elasticsearchService;
  }

  async getAuthors() {
    return this.dao.getAuthors();
  }

  async deleteAuthors() {
    return this.dao.deleteAuthors();
  }

  async createAuthor(author) {
    const createdAuthor = await this.dao.createAuthor(author);
    await this.elasticsearchService.add("authors", createdAuthor);
    return createdAuthor;
  }

  async createAuthors(authors) {
    const { newAuthors, session } = await this.dao.createAuthors(authors);
    console.log({ newAuthors });
    try {
      const erroredAuthors = await this.elasticsearchService.bulkAdd(
        "authors",
        newAuthors
      );
      if (erroredAuthors.length) {
        throw new Error("Could not save some authors");
      }
      await session.commitTransaction();
      return newAuthors;
    } catch (e) {
      console.log("error indexing", e);
      // abort adding authors if they didn't get indexed
      await session.abortTransaction();
      throw e;
    }
  }
}
