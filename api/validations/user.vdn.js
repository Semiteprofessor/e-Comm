const Joi = require("joi");

const registerUserValidation = (data) => {
  const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean(),
  });
  return registerSchema.validate(data);
};

const loginUserValidation = (data) => {
  const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return loginSchema.validate(data);
};

module.exports = { registerUserValidation, loginUserValidation };
