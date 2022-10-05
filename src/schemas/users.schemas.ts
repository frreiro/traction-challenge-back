import joi, { string } from "joi";
import { UserInformation } from "../interfaces/users.interfaces.js";

export const createUserSchema = joi.object<UserInformation>({
	name: joi.string().required(),
	company_id: joi.string().required(),
	picture: joi.string().uri().required(),
})

