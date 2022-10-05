import { Router } from "express";
import adminHandler from "../middlewares/adminValidate.js";
import { schemaValidate } from "../middlewares/schemasValidate.js";
import tokenHandler from "../middlewares/tokenMiddleware.js";
import { createAssetsSchema, updateAssetsSchema } from "../schemas/assets.schemas.js";
import { registerAssets, getAsset, updateAsset, deleteAsset } from "../controllers/assets.controllers.js";

const assetsRouter = Router();

assetsRouter.post('/assets', adminHandler, schemaValidate(createAssetsSchema), registerAssets)

assetsRouter.get('/assets/:id', tokenHandler, getAsset);

assetsRouter.put('/assets/:id', adminHandler, schemaValidate(updateAssetsSchema), updateAsset);
assetsRouter.delete('/assets/:id', adminHandler, deleteAsset);



export default assetsRouter