import { ObjectId } from "mongodb";
import db from "../config/db.js";

export async function insertCompany(companyName: string) {
	await db.collection("company").insertOne({ name: companyName })
}

export async function findCompanyByName(companyName: string) {
	return await db.collection("company").findOne({ name: companyName })
}

export async function findCompanyById(companyId: string) {
	return await db.collection("company").findOne({ _id: new ObjectId(companyId) })
}

export async function findAllCompanies() {
	return await db.collection("company").find().toArray();
}

export async function updateCompanyNameById(companyId: string, newName: string) {
	return await db.collection("company").updateOne(
		{ _id: new ObjectId(companyId) },
		{
			$set: {
				name: newName
			}
		}
	);
}


export async function deleteCompanyById(companyId: string) {
	return await db.collection("company").deleteOne({ _id: new ObjectId(companyId) })
}
