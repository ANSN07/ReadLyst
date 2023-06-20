import dotenv from "dotenv";
import express from "express";
import buildDependencies from "./src/config/dependencies";
import readingListRouter from "./src/books/routes";
import db from "./src/config/db";
import errorHandler from "./src/utils/ErrorHandler";
import swaggerUi from "swagger-ui-express";
import logger from "./logger";
const YAML = require("yamljs");

dotenv.config();
db.init();
const app = express();
const dependencies = buildDependencies();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = process.env.PORT;
app.use(express.json());

app.use("/api/reading-list", readingListRouter(dependencies));
app.use(errorHandler);

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  logger.info(`Server running at ${port}`);
});
