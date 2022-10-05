
import { Request, Response } from "express";
import { UnitInformation, UnitUpdatedInfo } from "../interfaces/unit.interfaces.js";
import * as unitServices from "../services/units.services.js";


export async function registerUnit(req: Request, res: Response) {
	const unitInfo: UnitInformation = req.body;
	await unitServices.createUnit(unitInfo);
	res.sendStatus(201)
}


export async function getUnitData(req: Request, res: Response) {
	const { id } = req.params;
	const { userLogged } = res.locals
	const unitData = await unitServices.getUnitData(id, userLogged);
	res.send(unitData)
}

export async function updateUnitData(req: Request, res: Response) {
	const { id } = req.params;
	const updatedInfo: UnitUpdatedInfo = req.body;
	await unitServices.updateUnitData(id, updatedInfo);
	res.sendStatus(201);
}


export async function deleteUnit(req: Request, res: Response) {
	const { id } = req.params;
	await unitServices.deleteUnitData(id);
	res.sendStatus(201);
}

