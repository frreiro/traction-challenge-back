import joi from "joi";
import { AssetsBody } from "../interfaces/assets.interfaces.js";


export const createAssetsSchema = joi.object<AssetsBody>({
	name: joi.string().required(),
	description: joi.string().required(),
	model: joi.string().required(),
	owner: joi.string().required(),
	status: joi.string().valid("Running", "Alerting", "Stopped").required(),
	health_level: joi.number().min(0).max(100).required(),
	company_unit_id: joi.string().required()
});


export const updateAssetsSchema = joi.object<AssetsBody>({
	name: joi.string(),
	description: joi.string(),
	model: joi.string(),
	owner: joi.string(),
	status: joi.string().valid("Running", "Alerting", "Stopped"),
	health_level: joi.number().min(0).max(100),
	company_unit_id: joi.string()
}).required();
