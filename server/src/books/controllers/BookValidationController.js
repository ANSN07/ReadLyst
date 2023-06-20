import logger from "../../../logger";

export default (dependencies) => {
  const { bookSchema } = dependencies;

  const validateBook = async (request, response, next) => {
    try {
      const validated = await bookSchema["book"].validateAsync(request.body);
      request.body = validated;
      logger.info("Book schema validation successfull");
      next();
    } catch (err) {
      logger.error(`Error in request validation: ${err.message}`);
      next(new Error(`Invalid Data ${err.message}`));
    }
  };

  return {
    validateBook,
  };
};
