import { Router } from "express";
import { Cadastro, Login } from "../controllers/account.js";
import validateSchema from "../middlewares/validateSchema.js";
import { postLoginSchema, postUserSchema } from "../schemas/userSchema.js";

const router = Router();

router.post("/signup", validateSchema(postUserSchema), Cadastro);
router.post("/signin", validateSchema(postLoginSchema), Login);

export default router;