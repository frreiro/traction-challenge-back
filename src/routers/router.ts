import { Router } from "express";
import usersRouter from "./users.routers.js";
import companiesRouter from "./companies.routers.js";
import assetsRouter from "./assets.routers.js";
import unitRouter from "./units.routers.js";


const generalRouter = Router();

generalRouter.get('/health', (req, res) => {
	res.send("OK");
})
generalRouter.use(usersRouter);
generalRouter.use(companiesRouter);
generalRouter.use(assetsRouter);
generalRouter.use(unitRouter);

export default generalRouter;