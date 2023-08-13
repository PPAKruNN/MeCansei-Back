import Joi from "joi";

export default Joi.object({
  name: Joi.string().min(5).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().integer().required(),
  isAvailable: Joi.boolean().required(),
  ownerid: Joi.number().integer().required(),
  categoriesId: Joi.array().items(Joi.number().integer()),
  photosId: Joi.array().items(Joi.number().integer())
});
