import Joi from "joi";

export default Joi.object({
    productid: Joi.number().integer().required(),
    url: Joi.string().uri().required()
})