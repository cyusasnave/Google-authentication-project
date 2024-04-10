import Joi from "joi";

const userValidation = Joi.object({
  image: Joi.any().messages({
    "binary.base": "Invalid image format",
  }),
  firstName: Joi.string()
    .min(2)
    .regex(/^[A-Za-z\s]+$/)
    .messages({
      "string.empty": "Name field can't be empty!",
      "string.min": "Name must be a least 2 character long!",
      "string.pattern.base":
        "Name can't include numbers and special characters!",
    }),
  lastName: Joi.string()
    .min(2)
    .regex(/^[A-Za-z\s]+$/)
    .messages({
      "string.empty": "Name field can't be empty!",
      "string.min": "Name must be a least 2 character long!",
      "string.pattern.base":
        "Name can't include numbers and special characters!",
    })
});

const validateUser = <T>(data: T) => {
  return userValidation.validate(data);
};
export default validateUser;
