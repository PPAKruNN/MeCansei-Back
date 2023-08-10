import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import photoSchema from "../schemas/photoSchema.js";
import authenticate from "../middlewares/authenticate.js";
import { deletePhoto, getGallery, getPhotoById, postPhoto, putPhoto } from "../controllers/gallery.js";

const router = Router();

router.get("/gallery", authenticate, getGallery);
router.get("/gallery/:id", authenticate, getPhotoById);
router.post("/gallery", authenticate, validateSchema(photoSchema), postPhoto); 
router.delete("/gallery/:id", authenticate, deletePhoto);
router.put("/gallery/:id", authenticate, validateSchema(photoSchema), putPhoto);

export default router;