import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import productsSchema from "../schemas/productsSchema.js";
import { deleteProduct, getMineProducts, getProductById, getProducts, patchAvailabilty, postProduct } from "../controllers/products.js";
import authenticate from "../middlewares/authenticate.js";
import availabiltySchema from "../schemas/availabiltySchema.js";

const router = Router();

router.get("/products", authenticate, getProducts);
router.get("/products/:id", authenticate, getProductById);
router.post("/products", authenticate, validateSchema(productsSchema), postProduct);

router.get("/myproducts/", authenticate, getMineProducts);
router.patch("/products/:id/availabilty", validateSchema(availabiltySchema), authenticate, patchAvailabilty);
router.delete("/products/:id", authenticate, deleteProduct);

export default router;