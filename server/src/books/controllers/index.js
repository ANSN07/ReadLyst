import readingListService from "./../services";
import logger from "../../../logger";
const createError = require("http-errors");

export default (dependencies) => {
  const getBooks = async (request, response, next) => {
    const readingList = await readingListService.find(dependencies);
    response.status(200).json(readingList);
  };
  const addBook = async (request, response, next) => {
    try {
      logger.info("Request received for addBook");
      const { title, author, isbn, status, pageCount } = request.body;
      const book = await readingListService.addBook(
        title,
        author,
        isbn,
        status,
        pageCount,
        dependencies
      );
      response.status(201).json(book);
    } catch (e) {
      logger.error(`Error in addBook request`);
      next(createError(500, `Server error: ${e.message}`));
    }
  };
  const updateBook = async (request, response, next) => {
    try {
      logger.info("Request received for updateBook");
      const { id, title, author, isbn, status, pageCount } = request.body;
      const book = await readingListService.updateBook(
        id,
        title,
        author,
        isbn,
        status,
        pageCount,
        dependencies
      );
      response.status(200).json(book);
    } catch (e) {
      logger.error(`Error in updateBook request`);
      next(createError(400, `Invalid Data: ${e.message}`));
    }
  };
  const deleteBook = async (request, response, next) => {
    const id = request.body.id;
    const books = await readingListService.deleteBook(id, dependencies);
    response.status(200).json(books);
  };
  const getBookById = async (request, response, next) => {
    const bookId = request.params.id;
    const book = await readingListService.getBookById(bookId, dependencies);
    response.status(200).json(book);
  };

  return {
    getBookById,
    getBooks,
    addBook,
    updateBook,
    deleteBook,
  };
};
