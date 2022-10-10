import { Request } from "express"
import jwt from "jsonwebtoken"
import AppError from "./appError.js";
import { UserPayload } from "../interfaces/utils.interfaces.js";

import * as sessionRepository from "../repositories/sessions.repositories.js";


export async function tokenValidate(headers: Request["headers"]) {
	const { authorization } = headers;
	if (!authorization) throw new AppError("No headers found", 401);
	const token = authorization?.replace('Bearer ', '').trim();
	if (token === "undefined" || null || undefined) throw new AppError("No token found", 401);
	return token
}

export function encodeToken(id: string, isAdmin: boolean) {
	return jwt.sign({ id: id, is_admin: isAdmin }, process.env.JWT_KEY);
}

export function decodeToken(token: string) {
	try {
		const userId = <UserPayload>jwt.verify(token, process.env.JWT_KEY)
		return userId
	} catch (e) {
		throw new AppError("Invalid Token", 401);
	}
}

export async function checkIfTokenExistsAndReturnDecoded(headers: Request["headers"]) {
	const token = await tokenValidate(headers);
	const sessionFound = await sessionRepository.getSessionByToken(token);
	if (!sessionFound) throw new AppError("Invalid Token", 401);
	return decodeToken(token);
}