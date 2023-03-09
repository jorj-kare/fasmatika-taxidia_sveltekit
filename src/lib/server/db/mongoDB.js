import mongoose from 'mongoose';
import { DB_URL } from '$env/static/private';

export const startMongoDB = () => {
	console.log('connecting to mongoDB Atlas...');
	mongoose.connect(DB_URL);
};
