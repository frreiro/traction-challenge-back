import { Router } from "express";
import adminHandler from "../middlewares/adminValidate.js";
import { schemaValidate } from "../middlewares/schemasValidate.js";
import { createOrUpdateCompanySchema } from "../schemas/company.schemas.js";
import { registerCompany, getAllOrOneCompany, getCompanyOverView, deleteCompany, updateCompany } from "../controllers/companies.controllers.js";
import tokenHandler from "../middlewares/tokenMiddleware.js";

const companiesRouter = Router();

companiesRouter.post('/company', adminHandler, schemaValidate(createOrUpdateCompanySchema), registerCompany);

companiesRouter.get('/company', getAllOrOneCompany);

companiesRouter.get('/company/:id', tokenHandler, getCompanyOverView);

companiesRouter.put('/company/:id', adminHandler, schemaValidate(createOrUpdateCompanySchema), updateCompany);

companiesRouter.delete('/company/:id', adminHandler, deleteCompany);


export default companiesRouter