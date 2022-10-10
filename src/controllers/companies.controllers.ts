import { Request, Response } from "express";
import { CompanyInformation } from "../interfaces/company.interfaces.js";
import * as companyServices from "../services/companies.services.js";

export async function registerCompany(req: Request, res: Response) {
	const companyDetails: CompanyInformation = req.body;
	await companyServices.createCompany(companyDetails.name);

	res.sendStatus(201)
}

export async function getAllOrOneCompany(req: Request, res: Response) {
	const companies = await companyServices.getAllCompanies();

	res.send(companies)
}

export async function getCompanyOverView(req: Request, res: Response) {
	const { id } = req.params
	const companyOverView = await companyServices.getCompanyOverView(id);
	res.send(companyOverView)
}

export async function updateCompany(req: Request, res: Response) {
	const { id } = req.params
	const updatedInfo: CompanyInformation = req.body;
	await companyServices.updateCompanyData(id, updatedInfo);
	res.sendStatus(201)
}

export async function deleteCompany(req: Request, res: Response) {
	const { id } = req.params
	await companyServices.deleteCompanyData(id);
	res.send(201)
}