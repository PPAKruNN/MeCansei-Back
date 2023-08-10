import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import productsSchema from "../schemas/productsSchema.js";
import { getProductById, getProducts, postProduct } from "../controllers/products.js";

const router = Router();

router.get("/products", validateSchema(productsSchema), getProducts);
router.get("/products/:id", validateSchema(productsSchema), getProductById);
router.post("/products", validateSchema(productsSchema), postProduct);

export default router;