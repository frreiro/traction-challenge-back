import { Router } from "express";
import { registerUser, getUsersInfo, signInUser } from "../controllers/users.controllers.js";
import adminHandler from "../middlewares/adminValidate.js";
import { schemaValidate } from "../middlewares/schemasValidate.js";
import { createUserSchema } from "../schemas/users.schemas.js";
import upload from "../middlewares/multerMiddleware.js";


const usersRouter = Router();

usersRouter.get('/users', getUsersInfo);
usersRouter.get('/users/:id', signInUser);
usersRouter.post('/users', upload.single("picture"), schemaValidate(createUserSchema), registerUser);


export default usersRouter;
