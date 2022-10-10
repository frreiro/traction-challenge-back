import { Db, MongoClient } from "mongodb";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
dotenv.config();

const admins = [
	{
		name: "Emerson",
		picture: "https://st4.depositphotos.com/5011263/20918/v/450/depositphotos_209180262-stock-illustration-avatar-people-internet-character-male.jpg",
		is_admin: true,

	},
	{
		name: "Roberta",
		picture: "https://media.istockphoto.com/vectors/avatar-woman-design-vector-id699132466?b=1&k=20&m=699132466&s=170667a&w=0&h=Oy9WCSpICvnbm-T6wJoF5F5ltkv4iuvQCwB3cO4cvOc=",
		is_admin: true,

	}
]

let db: Db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);

try {
	await mongoClient.connect();
	db = mongoClient.db("traction_database");
	await createDefaultCompany();
	await createDefaultUsers();
	await createDefaultUnit()
	await mongoClient.close();
} catch (e) {
	throw new AppError("Error connecting to database", 400);
}


async function createDefaultCompany() {
	const companyFound = await db.collection("company").findOne({ name: "Industria Freios Supremos" })
	if (!companyFound) {
		await db.collection("company").insertOne({ name: "Industria Freios Supremos" })
	}
}

async function createDefaultUsers() {
	const companyFound = await db.collection("company").findOne({ name: "Industria Freios Supremos" })
	for (const user of admins) {
		const userFound = await db.collection("users").findOne({ ...user, company_id: companyFound._id })
		if (!userFound) {
			await db.collection("users").insertOne({ ...user, company_id: companyFound._id, is_admin: true })
		}
	}
}


async function createDefaultUnit() {
	const companyFound = await db.collection("company").findOne({ name: "Industria Freios Supremos" })
	await db.collection("units").insertOne({ name: "Discos", company_id: companyFound._id });

	const unitFound = await db.collection("units").findOne({ name: "Discos" })
	await db.collection("assets").insertOne({
		model: "DL8700",
		owner: "Celmar S.A",
		name: "Retificador",
		health_level: "50",
		status: "Stopped",
		description: "Retificadora/Faceadora de Discos de Freio de altíssima precisão",
		company_unit_id: unitFound._id,
		image: "https://hfjwilebkbsilqopcgdy.supabase.co/storage/v1/object/public/tractian-images/tractian-uploads/Retificadora-de-Discos-de-Freio-Portatil-mad-2.jpg",

	});
}





