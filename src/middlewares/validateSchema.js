import Joi from "joi";

export default function validateSchema(schema) {
   
    return function (req, res, next) {
        const result = schema.validate(req.body, {abortEarly: false});
        
        if(result.error) return res.status(422).send(result.error.details.map( c => c.message));
        next();
    }
}
