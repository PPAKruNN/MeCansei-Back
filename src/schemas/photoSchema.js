import Joi from "joi";

export default Joi.object({
    url: Joi.string().uri().required()
})