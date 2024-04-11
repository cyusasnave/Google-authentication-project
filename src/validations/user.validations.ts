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
        "First name can't include numbers and special characters!",
    }),
  lastName: Joi.string()
    .min(2)
    .regex(/^[A-Za-z\s]+$/)
    .messages({
      "string.empty": "Name field can't be empty!",
      "string.min": "Name must be a least 2 character long!",
      "string.pattern.base":
        "Last name can't include numbers and special characters!",
    }),
}).options({ allowUnknown: false });

const validateUser = <T>(data: T) => {
  return userValidation.validate(data);
};
export default validateUser;
