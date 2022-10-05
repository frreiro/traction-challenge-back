import { ObjectId } from "mongodb";
import db from "../config/db.js";

export async function getSessionByToken(token: string) {
	return await db.collection("session").findOne({ token: token })
}

export async function createSession(userToken: string, userId: ObjectId) {
	return await db.collection("session").insertOne({ token: userToken, userId: userId });
}

