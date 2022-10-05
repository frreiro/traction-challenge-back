import { Request, Response } from "express";
import { AssetsInformation } from "../interfaces/assets.interfaces.js";
import * as assetsServices from "../services/assets.services.js";

export async function registerAssets(req: Request, res: Response) {
	const assetsDetails: AssetsInformation = req.body;
	await assetsServices.createAsset(assetsDetails);
	res.sendStatus(201)
}

export async function getAsset(req: Request, res: Response) {
	const { id } = req.params;
	const { userLogged } = res.locals;
	const asset = await assetsServices.getAssetInfo(id, userLogged);
	res.send(asset)
}

export async function updateAsset(req: Request, res: Response) {
	const { id } = req.params;
	const updatedInfo: AssetsInformation = req.body;
	await assetsServices.updateAsset(id, updatedInfo);
	res.sendStatus(201)
}

export async function deleteAsset(req: Request, res: Response) {
	const { id } = req.params;
	await assetsServices.deleteAsset(id);
	res.sendStatus(201)
}