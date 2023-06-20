import Book from "../entities/Book";
import mongoose from "mongoose";
import ReadingListRepository from "./Repository";
import logger from "../../../logger";

export default class extends ReadingListRepository {
  constructor() {
    super();
    const booksSchema = new mongoose.Schema({
      title: String,
      author: Array,
      isbn: String,
      status: String,
      pageCount: String,
    });
    this.model = mongoose.model("Book", booksSchema);
  }

  async persist(bookEntity) {
    const { title, author, isbn, status, pageCount } = bookEntity;
    const result = new this.model({
      title,
      author,
      isbn,
      status,
      pageCount,
    });
    await result.save();
    bookEntity.id = result.id;
    return bookEntity;
  }

  async merge(bookEntity) {
    const { id, title, author, isbn, status, pageCount } = bookEntity;
    await this.model.findByIdAndUpdate(id, {
      title,
      author,
      isbn,
      status,
      pageCount,
    });
    logger.info({
      title,
      author,
      isbn,
      status,
      pageCount,
    });
    return bookEntity;
  }

  async remove(bookId) {
    return this.model.findOneAndDelete(bookId);
  }

  async get(bookId) {
    const result = await this.model.findById(bookId);
    const { id, title, author, isbn, status, pageCount } = result;
    return new Book(id, title, author, isbn, status, pageCount);
  }

  async find() {
    const books = await this.model.find();
    if (books.length === 0) {
      return [];
    }

    return books.map((result) => {
      return new Book(
        result.id,
        result.title,
        result.author,
        result.isbn,
        result.status,
        result.pageCount
      );
    });
  }
}
