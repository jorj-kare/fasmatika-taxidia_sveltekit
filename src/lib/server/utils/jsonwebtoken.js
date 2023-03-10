import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '$env/static/private';
import { checkError } from './customErrors';
import { error } from '@sveltejs/kit';
export const signToken = (id) =>
	jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const verifyToken = async (token) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};
