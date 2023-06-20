import ReadingListRepositoryMongo from "../books/repositories/MongoReadingListRepository";
import BookSchema from "../books/validators/bookValidator";

const buildDependencies = () => {
  const dependencies = {};
  dependencies.bookSchema = BookSchema;
  dependencies.booksRepository = new ReadingListRepositoryMongo();
  return dependencies;
};

export default buildDependencies;
