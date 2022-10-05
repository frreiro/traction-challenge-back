import { ObjectId } from "mongodb";
import { UnitInformation, UnitUpdatedInfo } from "../interfaces/unit.interfaces.js";
import AppError from "../utils/appError.js";

import * as unitRepository from "../repositories/unit.repositories.js";
import * as companyRepository from "../repositories/companies.repositories.js";
import * as assetsRepository from "../repositories/assets.repositories.js";
import * as usersRepository from "../repositories/users.repositories.js";

import { UserPayload } from "../interfaces/utils.interfaces.js";


export async function createUnit(unitInfo: UnitInformation) {
	if (!ObjectId.isValid(unitInfo.company_id)) throw new AppError("Invalid company", 404);

	const company = await companyRepository.findCompanyById(unitInfo.company_id);
	if (!company) throw new AppError("Company not found", 404);

	const unit = await unitRepository.findUnitByName(unitInfo.name);
	if (unit) throw new AppError("Unit already exists", 409);

	await unitRepository.insertUnit(unitInfo);
}

export async function getUnitData(unitId: string, userInformation: UserPayload) {
	const userInfoFound = await usersRepository.findUserById(userInformation.id);
	const unitInfoFound = await unitRepository.findUnitById(unitId);

	if (!userInfoFound.company_id.equals(unitInfoFound.company_id) && !userInfoFound.is_admin) throw new AppError("User are not allowed to view this unit", 401);

	return await assetsRepository.findAssetsByUnit(new ObjectId(unitId));
}


export async function updateUnitData(unitId: string, updatedInfo: UnitUpdatedInfo) {
	if (!ObjectId.isValid(unitId)) throw new AppError("Invalid unit", 404);

	await unitRepository.updateUnitNameById(unitId, updatedInfo.name);
}

export async function deleteUnitData(unitId: string) {
	if (!ObjectId.isValid(unitId)) throw new AppError("Invalid unit", 404);

	await assetsRepository.deleteAssetsByUnit(new ObjectId(unitId));
	await unitRepository.deleteUnit(unitId);
}

