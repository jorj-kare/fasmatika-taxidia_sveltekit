import mongoose from 'mongoose';
import { DB_URL } from '$env/static/private';

export const startMongoDB = () => {
	console.log('connecting to mongoDB Atlas...');
	return mongoose.connect(DB_URL);
};
