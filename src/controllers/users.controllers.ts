import { Request, Response } from "express";
import { UserInformation } from "../interfaces/users.interfaces.js";
import * as usersServices from "../services/users.services.js";


export async function registerUser(req: Request, res: Response) {
	const userInfo: UserInformation = req.body;
	const file = req.file;
	const imageUrl = await usersServices.uploadImageInSupabaseAndGetUrl(file)
	await usersServices.createUser({ ...userInfo, picture: imageUrl });
	res.sendStatus(201)
}

export async function getUsersInfo(req: Request, res: Response) {
	const users = await usersServices.getUsers();
	res.send(users);
}

export async function signInUser(req: Request, res: Response) {
	const { id } = req.params;
	const users = await usersServices.logUser(id);
	res.send(users);
}