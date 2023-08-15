import Express from "express";
import { json } from "express";
import cors from "cors";
import accountRouter from "./routes/account.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
import productsRouter from "./routes/products.routes.js";
import categoriesRouter from "./routes/categories.routes.js";

const app = Express();

app.use(cors());
app.use(json());

app.use(galleryRouter);
app.use(productsRouter);
app.use(categoriesRouter);
app.use(accountRouter);

app.listen(5000);
