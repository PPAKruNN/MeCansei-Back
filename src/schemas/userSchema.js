import Joi from "joi";

export const postUserSchema = Joi.object({
    name: Joi.string().max(256).required(),
    cpf: Joi.string().length(11).required(),
    contact_number: Joi.string().length(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(72).required(),
}).required();

const postLoginEmail = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(72).required(),
}).required();

const postLoginCPF = Joi.object({
    cpf: Joi.string().length(11).required(),
    password: Joi.string().min(6).max(72).required(),
}).required();

export const postLoginSchema = Joi.alternatives(postLoginEmail, postLoginCPF).required();
