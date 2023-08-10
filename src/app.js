import Express from "express";
import { json } from "express";
import cors from "cors";
import accountRouter from "./routes/account.routes.js";

const app = Express();

app.use(json());
app.use(cors());
app.use(accountRouter);

app.listen(5000);