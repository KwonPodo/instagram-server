import expressor from "./config/express.js";
import { logger } from "./config/winston.js";

const port = 3000;
expressor().listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
