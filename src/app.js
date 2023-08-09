import Express from "express";
import { json } from "express";
import cors from "cors";

const app = Express();

app.use(json());
app.use(cors());


app.listen(5000);