import { ObjectId } from "mongodb";

import AppError from "../utils/appError.js";

import * as companyRepository from "../repositories/companies.repositories.js";
import * as usersRepository from "../repositories/users.repositories.js";
import * as unitsRepository from "../repositories/unit.repositories.js";
import * as assetsRepository from "../repositories/assets.repositories.js";
import { UserPayload } from "../interfaces/utils.interfaces.js";
import { CompanyInformation } from "../interfaces/company.interfaces.js";

export async function createCompany(name: string) {
	const companyFound = await companyRepository.findCompanyByName(name);
	if (companyFound) throw new AppError("Company already exists", 409)
	await companyRepository.insertCompany(name);
}


export async function getAllCompanies() {
	return await companyRepository.findAllCompanies();
}

export async function getUserCompany(userId: string) {
	const user = await usersRepository.findUserById(userId);
	return await companyRepository.findCompanyById(user.company_id);
}

export async function getCompanyOverView(companyId: string) {
	if (!ObjectId.isValid(companyId)) throw new AppError("Invalid company", 404);


	const company = await companyRepository.findCompanyById(companyId);
	if (!company) throw new AppError("Company do not exist", 404);

	const companyUnits = await unitsRepository.findUnitsByCompany(companyId);

	for (const unit of companyUnits) {
		const assets = await assetsRepository.findAssetsByUnit(unit._id);
		unit.assets = assets
		delete unit.company_id
	}
	return { ...company, ...companyUnits };
}

export async function updateCompanyData(companyId: string, updatedInfo: CompanyInformation) {
	if (!ObjectId.isValid(companyId)) throw new AppError("Invalid company", 404);
	await companyRepository.updateCompanyNameById(companyId, updatedInfo.name);
}

export async function deleteCompanyData(companyId: string) {
	if (!ObjectId.isValid(companyId)) throw new AppError("Invalid company", 404);

	const unitsOfThisCompany = await unitsRepository.findUnitsByCompany(companyId)
	for (const unit of unitsOfThisCompany) {
		await assetsRepository.deleteAssetsByUnit(unit._id);
	}
	await unitsRepository.deleteUnitsByCompanyId(companyId);
	await companyRepository.deleteCompanyById(companyId);
}