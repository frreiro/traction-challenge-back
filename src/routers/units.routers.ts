import { Router } from "express";
import adminHandler from "../middlewares/adminValidate.js";
import { schemaValidate } from "../middlewares/schemasValidate.js";
import tokenHandler from "../middlewares/tokenMiddleware.js";
import { createUnitSchema, updateUnitSchema } from "../schemas/unit.schemas.js";
import { registerUnit, getUnitData, updateUnitData, deleteUnit } from "../controllers/unit.controllers.js";

const unitRouter = Router();

unitRouter.post('/unit', adminHandler, schemaValidate(createUnitSchema), registerUnit)

unitRouter.get('/unit/:id', tokenHandler, getUnitData)
unitRouter.put('/unit/:id', adminHandler, schemaValidate(updateUnitSchema), updateUnitData)
unitRouter.delete('/unit/:id', adminHandler, deleteUnit)




export default unitRouter