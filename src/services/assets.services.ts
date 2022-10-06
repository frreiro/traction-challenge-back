import { ObjectId } from "mongodb";
import { AssetsInformation } from "../interfaces/assets.interfaces.js";
import AppError from "../utils/appError.js";

import * as assetsRepository from "../repositories/assets.repositories.js"
import * as unitRepository from "../repositories/unit.repositories.js"
import * as usersRepository from "../repositories/users.repositories.js"

import { UserPayload } from "../interfaces/utils.interfaces.js";
import { uploadToRemoteBucket, getImagePublicUrl } from "../utils/uploadSupabase.js";

export async function createAsset(assetInformation: AssetsInformation) {
	if (assetInformation.health_level < 0 || assetInformation.health_level > 100) throw new AppError("Health Level must be a value between 0 a 100", 400);

	if (!ObjectId.isValid(assetInformation.company_unit_id)) throw new AppError("Invalid unit", 404);

	const unit = await unitRepository.findUnitById(assetInformation.company_unit_id);
	if (!unit) throw new AppError("Unit not found", 404);

	const asset = await assetsRepository.findAssetByNameAndUnit(assetInformation.name, assetInformation.company_unit_id);

	if (asset) throw new AppError("Asset already exists", 409);
	await assetsRepository.insertAsset(assetInformation);
}

export async function uploadImageInSupabaseAndGetUrl(file: Express.Multer.File) {
	const newFileName = await uploadToRemoteBucket(file);
	return await getImagePublicUrl(newFileName);
}


export async function getAssetInfo(id: string, userInformation: UserPayload) {
	const assetInfoFound = await assetsRepository.findAssetById(id);
	const unitInfoFound = await unitRepository.findUnitById(assetInfoFound.company_unit_id);
	const userInfoFound = await usersRepository.findUserById(userInformation.id);
	if (!userInfoFound.company_id.equals(unitInfoFound.company_id) && !userInfoFound.is_admin) throw new AppError("User are not allowed to view this unit", 401);
	return assetInfoFound;
}


export async function updateAsset(id: string, updatedInfo: AssetsInformation) {
	if (!ObjectId.isValid(id)) throw new AppError("Invalid asset", 404);
	return await assetsRepository.updateAssetById(id, updatedInfo);
}

export async function deleteAsset(id: string) {
	if (!ObjectId.isValid(id)) throw new AppError("Invalid asset", 404);
	return await assetsRepository.deleteAssetById(id);
}