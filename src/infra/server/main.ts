import "reflect-metadata";

import express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import { errorHandler } from "./error/handler";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
