export default class {
  constructor(id = undefined, title, author, isbn, status, pageCount) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = status;
    this.pageCount = pageCount;
  }
}
