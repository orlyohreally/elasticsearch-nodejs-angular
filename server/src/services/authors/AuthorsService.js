export class AuthorsService {
  constructor({ dao }) {
    this.dao = dao;
  }

  async getAuthors() {
    return this.dao.getAuthors();
  }

  async createAuthor(author) {
    return this.dao.createAuthor(author);
  }
}
