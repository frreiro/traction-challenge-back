import joi from "joi";
import { CompanyInformation } from "../interfaces/company.interfaces.js";

export const createOrUpdateCompanySchema = joi.object<CompanyInformation>({
	name: joi.string().required(),
})
