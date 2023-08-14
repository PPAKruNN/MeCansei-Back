import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import productsSchema from "../schemas/productsSchema.js";
import { getProductById, getProducts, postProduct } from "../controllers/products.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/products", authenticate, getProducts);
router.get("/products/:id", authenticate, getProductById);
router.post("/products", authenticate, validateSchema(productsSchema), postProduct);

export default router;