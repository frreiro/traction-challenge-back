import joi from "joi";
import { UnitInformation } from "../interfaces/unit.interfaces.js";

export const createUnitSchema = joi.object<UnitInformation>({
	name: joi.string().required(),
	company_id: joi.string().required(),
})

export const updateUnitSchema = joi.object<UnitInformation>({
	name: joi.string().required(),
})