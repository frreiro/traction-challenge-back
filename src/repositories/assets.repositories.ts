import { ObjectId } from "mongodb";
import db from "../config/db.js";
import { AssetsInformation } from "../interfaces/assets.interfaces.js";

export async function insertAsset(assetInformation: AssetsInformation) {
	await db.collection("assets").insertOne({ ...assetInformation, company_unit_id: new ObjectId(assetInformation.company_unit_id) })
}
findAssetByNameAndUnit

export async function findAssetByNameAndUnit(name: string, unit_id: string) {
	return await db.collection("assets").findOne({ name: name, company_unit_id: new ObjectId(unit_id) });
}


export async function findAssetsByUnit(unit_id: ObjectId) {
	return await db.collection("assets").find({ company_unit_id: unit_id }).toArray();
}

export async function findAssetById(id: string) {
	return await db.collection("assets").findOne({ _id: new ObjectId(id) });
}

export async function deleteAssetsByUnit(unit_id: ObjectId) {
	return await db.collection("assets").deleteMany({ company_unit_id: unit_id })
}

export async function deleteAssetById(id: string) {
	return await db.collection("assets").deleteOne({ _id: new ObjectId(id) })
}

export async function updateAssetById(id: string, updatedInfo: AssetsInformation) {
	return await db.collection("assets").updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: updatedInfo
		}
	)

}