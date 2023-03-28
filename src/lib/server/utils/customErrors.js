import { MODE } from '$env/static/private';

export function checkError(error) {
	let msg = 'Κάτι πήγε στραβά, παρακαλώ προσπαθήστε ξανά.';
	let statusCode = 500;
	if (error.code === 11000) {
		const [key, value] = Object.entries(error?.keyValue)[0];
		msg = `The ${key}: '${value}' already exist please try an other ${key}.`;
		statusCode = 400;
	}
	if (error.name === 'ValidationError') {
		const errors = Object.values(error.errors).map((el) => el.message);
		msg = 'Mη έγκυρη εισαγωγή δεδομένων: \n ' + errors.join('\n');
		statusCode = 400;
	}
	if (error.name === 'CastError') {
		msg = `Μη ´έγκυρο ${error.path}: ${error.value}.`;
		statusCode = 400;
	}

	if (
		error.name === 'TokenExpiredError' ||
		error.name === 'JsonWebTokenError'
	) {
		msg = 'Κάτι πήγε στραβά, παρακαλώ συνδεθείτε ξανά';
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
