import User from '$lib/server/db/models/user';
import { startMongoDB } from '$lib/server/db/mongoDB';
import { verifyToken } from '$lib/server/utils/jsonwebtoken';

import { MODE } from '$env/static/private';

startMongoDB().then(async () => {
	console.log('You have successfully connected to the database!');
});

export const handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');

	if (jwt) {
		const decoded = await verifyToken(jwt);
		const user = await User.findById(decoded?.id);
		if (user) {
			const { username, id, profileImg } = user;
			event.locals.user = {
				user: {
					username,
					id,
					profileImg
				}
			};
		}
	}

	return await resolve(event);
};

export const handleError = ({ error }) => {
	if (MODE === 'development') console.log(error);
	return {
		message: 'Ουπς κάτι πήγε στραβά'
	};
};
