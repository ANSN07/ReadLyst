import express from "express";
import ReadingListController from "../controllers";
import BookValidationController from "../controllers/BookValidationController";

const readingListRouter = (dependencies) => {
  const router = express.Router();
  const readingListController = ReadingListController(dependencies);
  const bookValidationController = BookValidationController(dependencies);

  router.route("/").get(readingListController.getBooks);
  router.route("/:id").get(readingListController.getBookById);
  router
    .route("/")
    .post(bookValidationController.validateBook, readingListController.addBook);
  router.route("/").put(readingListController.updateBook);
  router.route("/").delete(readingListController.deleteBook);
  return router;
};
export default readingListRouter;
