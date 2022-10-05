import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generalRouter from "./routers/router.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import "express-async-errors"
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(generalRouter);

app.use(errorHandlerMiddleware);
export default app;