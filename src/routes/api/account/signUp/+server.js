import { error, json } from '@sveltejs/kit';
import User from '$lib/server/db/models/user';
import { checkError } from '$lib/server/utils/customErrors';

export const POST = async ({ request }) => {
	try {
		const data = await request.json();
		const newUser = await User.create({
			username: data.username,
			password: data.password,
			confirmPassword: data.confirmPassword,
			profileImg: data.profileImg
		});
		if (!newUser) throw error(400, 'Κάτι πήγε στραβά, προσπαθήστε αργότερα.');

		return json(
			{
				data: { newUser }
			},
			{ status: 201, statusText: 'success' }
		);
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};
