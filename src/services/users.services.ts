
import { ObjectId } from "mongodb";
import { encodeToken } from "../utils/token.js";
import { UserInformation } from "../interfaces/users.interfaces.js";
import AppError from "../utils/appError.js";

import * as usersRepository from "../repositories/users.repositories.js";
import * as sessionRepository from "../repositories/sessions.repositories.js";
import * as companyRepository from "../repositories/companies.repositories.js";
import { getImagePublicUrl, uploadToRemoteBucket } from "../utils/uploadSupabase.js";


export async function createUser(userInformation: UserInformation) {
	if (!ObjectId.isValid(userInformation.company_id)) throw new AppError("Invalid company", 404);

	const company = await companyRepository.findCompanyById(userInformation.company_id);
	if (!company) throw new AppError("Company not found", 404);

	const user = await usersRepository.findUserByNameAndCompany(userInformation.name, userInformation.company_id);
	if (user) throw new AppError("User already exists", 409);

	return await usersRepository.insertUser(userInformation);
}

export async function uploadImageInSupabaseAndGetUrl(file: Express.Multer.File) {
	const newFileName = await uploadToRemoteBucket(file);
	return await getImagePublicUrl(newFileName);
}

export async function getUsers() {
	return await usersRepository.findAllUsers();
}

export async function logUser(id: string) {
	if (!ObjectId.isValid(id)) throw new AppError("Invalid user", 404);

	const user = await usersRepository.findUserById(id);
	if (!user) throw new AppError("Invalid user", 404);

	const token = encodeToken(id, user.is_admin);

	await sessionRepository.createSession(token, new ObjectId(id));
	return token;
}