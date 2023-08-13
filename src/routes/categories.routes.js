import { Router } from "express";
import categorySchema from "../schemas/categorySchema.js";
import { deleteCategory, getCategories, postCategory } from "../controllers/categories.js";
import validateSchema from "../middlewares/validateSchema.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", validateSchema(categorySchema), postCategory);
router.delete("/categories/:id", deleteCategory);

export default router;