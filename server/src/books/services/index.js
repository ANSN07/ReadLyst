import Book from "../entities/Book";

export default {
  addBook: async (
    title,
    author,
    isbn,
    status,
    pageCount,
    { booksRepository }
  ) => {
    const book = new Book(undefined, title, author, isbn, status, pageCount);
    return booksRepository.persist(book);
  },
  getBookById: (bookId, { booksRepository }) => {
    return booksRepository.get(bookId);
  },
  find: ({ booksRepository }) => {
    return booksRepository.find();
  },
  updateBook: async (
    id,
    title,
    author,
    isbn,
    status,
    pageCount,
    { booksRepository }
  ) => {
    const book = new Book(id, title, author, isbn, status, pageCount);
    return booksRepository.merge(book);
  },
  deleteBook: async (id, { booksRepository }) => {
    return booksRepository.remove(id);
  },
};
