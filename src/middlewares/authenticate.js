import Joi from "joi";
import { db } from "../database.js";
import { GetUserByToken } from "../repositories/user.repository.js";

export default async function authenticate(req, res, next) {
    
    const { authorization } = req.headers;
    if(!authorization) return res.sendStatus(401);

    const token = authorization.replace("Bearer", "").trim();

    const user = await GetUserByToken(token)
    if(user === null) return res.sendStatus(401);
    
    res.locals.id = user.userid;

    next();
}
