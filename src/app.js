import Express from "express";
import { json } from "express";
import cors from "cors";
import accountRouter from "./routes/account.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
import productsRouter from "./routes/products.routes.js";

const app = Express();

app.use(json());
app.use(cors());
app.use(accountRouter);
app.use(galleryRouter);
app.use(productsRouter);

app.listen(5000);