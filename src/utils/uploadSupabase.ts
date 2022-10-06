
import { v4 as uuidv4 } from 'uuid';
import supabase from "../config/supabase.js"
import AppError from './appError.js';


export async function uploadToRemoteBucket(file: Express.Multer.File) {
	const getFileExtension = file.originalname.split('.').at(1)
	const newFileName = `${uuidv4()}.${getFileExtension}`

	const { data, error } = await supabase
		.storage
		.from('tractian-images')
		.upload(`tractian-uploads/${newFileName}`, file.buffer, {
			cacheControl: '3600',
			upsert: false,
			contentType: file.mimetype,
		})

	if (error) throw new AppError("Fail to upload the image", 400);
	return newFileName;
}


export async function getImagePublicUrl(fileName: string) {
	const { data, error } = await supabase.storage
		.from('tractian-images')
		.getPublicUrl(`tractian-uploads/${fileName}`);

	if (error) throw new AppError("Fail to get the image", 400);
	return data.publicURL;
}