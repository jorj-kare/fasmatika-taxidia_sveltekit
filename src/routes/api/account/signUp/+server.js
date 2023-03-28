import { error, json } from '@sveltejs/kit';
import User from '$lib/server/db/models/user';
import { checkError } from '$lib/server/utils/customErrors';
import fs from 'fs';

export const POST = async ({ request }) => {
	try {
		const formData = await request.formData();

		const username = formData.get('username');

		// Upload image
		let filename;
		const file = formData.get('profileImg');

		if (file instanceof Object || file?.name) {
			filename = `${username}.${file.type.split('/')[1]}`;
			const buffer = Buffer.from(await file.arrayBuffer());
			fs.writeFileSync(`static/images/users/${filename}`, buffer, 'base64');
		}
		// create user
		const newUser = await User.create({
			username,
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
			profileImg: filename
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
