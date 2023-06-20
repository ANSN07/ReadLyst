import Joi from "joi";

const statusValidation = (value, helpers) => {
  if (!["In Progress", "Unread", "Finished"].includes(value)) {
    return helpers.message("Status validation failed");
  }
  return value;
};
const bookSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  pageCount: Joi.string()
    .pattern(/^[1-9][0-9]*$/)
    .required(),
  author: Joi.array().required(),
  isbn: Joi.string().optional(),
  status: Joi.string().required().custom(statusValidation),
});

export default { book: bookSchema };
