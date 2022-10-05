import { Request, Response, NextFunction } from "express";
import { checkIfTokenExistsAndReturnDecoded } from "../utils/token.js";
import AppError from "../utils/appError.js";

export default async function adminHandler(req: Request, res: Response, next: NextFunction) {
	const userInfo = await checkIfTokenExistsAndReturnDecoded(req.headers);
	if (!userInfo.is_admin) throw new AppError("You are not an admin user", 405);
	res.locals.userLogged = userInfo;
	next();
}