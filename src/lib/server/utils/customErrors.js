import { MODE } from '$env/static/private';

export function checkError(error) {
	let msg = 'Something went wrong please try again.';
	let statusCode = 500;
	if (error.code === 11000) {
		const [key, value] = Object.entries(error?.keyValue)[0];
		msg = `The ${key}: '${value}' already exist please try an other ${key}.`;
		statusCode = 400;
	}
	if (error.name === 'ValidationError') {
		const errors = Object.values(error.errors).map((el) => el.message);
		msg = 'Invalid input data: \n ' + errors.join('\n');
		statusCode = 400;
	}
	if (error.name === 'CastError') {
		msg = `Invalid ${error.path}: ${error.value}.`;
		statusCode = 400;
	}
	if (error.name === 'JsonWebTokenError') {
		msg = 'Invalid token please try again';
		statusCode = 401;
	}
	if (error.name === 'TokenExpiredError') {
		msg = 'Your token has expired please try again';
		statusCode = 401;
	}
	if (MODE === 'development') {
		console.log(error);
	}
	return {
		statusCode,
		msg
	};
}
