import Joi from "joi";

export default Joi.object({
    isavailable: Joi.boolean().required()
}).required();