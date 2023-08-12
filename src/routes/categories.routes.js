import { Router } from "express";
import categorySchema from "../schemas/categorySchema";
import { postCategories } from "../controllers/categories";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", validateSchema(categorySchema), postCategory);
router.delete("/categories/:id", deleteCategory);

export default router;