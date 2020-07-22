const Joi = require("@hapi/joi");

const resgisterValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(6).max(30).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.resgisterValidation = resgisterValidation;
module.exports.loginValidation = loginValidation;
