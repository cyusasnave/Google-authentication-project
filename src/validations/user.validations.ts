import Joi from "joi";

const userValidation = Joi.object({
  image: Joi.any().required().messages({
    "any.required": "User image is required!",
    "binary.base": "Invalid image format",
  }),
  firstName: Joi.string()
    .required()
    .min(2)
    .regex(/^[A-Za-z\s]+$/)
    .messages({
      "string.empty": "Name field can't be empty!",
      "string.min": "Name must be a least 2 character long!",
      "string.pattern.base":
        "Name can't include numbers and special characters!",
    }),
  lastName: Joi.string()
    .required()
    .min(2)
    .regex(/^[A-Za-z\s]+$/)
    .messages({
      "string.empty": "Name field can't be empty!",
      "string.min": "Name must be a least 2 character long!",
      "string.pattern.base":
        "Name can't include numbers and special characters!",
    }),
  // email: Joi.string().required().email().messages({
  //     "string.empty": "Email field can't be empty!",
  //     "string.email": "Invalid email"
  // }),
  role: Joi.string()
    .optional()
    .valid("User")
    .error(new Error('User role should be "User" by default')),
  isVerified: Joi.boolean()
    .optional()
    .valid(false)
    .error(new Error("IsVerified should be false by default")),
});

const validateUser = <T>(data: T) => {
  return userValidation.validate(data);
};
export default validateUser;
