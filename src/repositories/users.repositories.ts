import { ObjectId } from "mongodb";
import db from "../config/db.js";
import { UserInformation } from "../interfaces/users.interfaces.js";

export async function insertUser(userInformation: UserInformation) {
	const users = await db.collection("users").insertOne({ ...userInformation, company_id: new ObjectId(userInformation.company_id), is_admin: false });
	return users
}

export async function findAllUsers() {
	return await db.collection("users").find().toArray();
}

export async function findUserById(id: string) {
	return await db.collection("users").findOne({ _id: new ObjectId(id) });
}


export async function findUserByNameAndCompany(name: string, companyId: string) {
	return await db.collection("users").findOne({ name: name, company_id: new ObjectId(companyId) });
}

export async function deleteUsersByCompany(companyId: string) {
	return await db.collection("users").deleteMany({ company_id: new ObjectId(companyId) });
}