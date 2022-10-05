import { Request, Response, NextFunction } from "express";
import { checkIfTokenExistsAndReturnDecoded } from "../utils/token.js";

export default async function tokenHandler(req: Request, res: Response, next: NextFunction) {
	const userInfo = await checkIfTokenExistsAndReturnDecoded(req.headers);
	res.locals.userLogged = userInfo;
	next();
}