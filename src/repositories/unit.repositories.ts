import { ObjectId } from "mongodb";
import db from "../config/db.js";
import { UnitInformation } from "../interfaces/unit.interfaces.js";

export async function insertUnit(unitInfo: UnitInformation) {
	return await db.collection("units").insertOne({ ...unitInfo, company_id: new ObjectId(unitInfo.company_id) });
}

export async function findUnitByName(name: string) {
	return await db.collection("units").findOne({ name: name });
}


export async function findUnitById(id: string) {
	return await db.collection("units").findOne({ _id: new ObjectId(id) });
}


export async function findUnitsByCompany(companyId: string) {
	return await db.collection("units").find({ company_id: new ObjectId(companyId) }).toArray();
}

export async function updateUnitNameById(unitId: string, newName: string) {
	return await db.collection("units").updateOne(
		{ _id: new ObjectId(unitId) },
		{
			$set: {
				name: newName
			}
		}
	);
}


export async function deleteUnitsByCompanyId(companyId: string) {
	return await db.collection("units").deleteMany({ company_id: new ObjectId(companyId) });
}


export async function deleteUnit(unitId: string) {
	return await db.collection("units").deleteOne({ _id: new ObjectId(unitId) });
}

