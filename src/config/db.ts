import { Db, MongoClient } from "mongodb";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";
dotenv.config();


const mongoClient = new MongoClient(process.env.MONGO_URL);

let db: Db = null;

try {
	await mongoClient.connect();
	db = mongoClient.db("traction_database");
} catch (e) {
	throw new AppError("Error connecting to database", 400);
}

export default db;
