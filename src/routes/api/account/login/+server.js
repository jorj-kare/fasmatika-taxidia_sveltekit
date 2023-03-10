import User from '$lib/server/db/models/user';
import { error, json } from '@sveltejs/kit';
import { signToken } from '$lib/server/utils/jsonwebtoken';

export const POST = async ({ cookies, request }) => {
	const formData = await request.formData();
	const username = formData.get('username');
	const password = formData.get('password')?.toString();

	if (!username || !password) {
		throw error(404, 'Please provide username and password');
	}

	const user = await User.findOne({ username }).select('+password');

	if (!user || !(await user?.isPasswordCorrect(password, user.password))) {
		throw error(404, 'Incorrect username or password');
	}
	user.password = '';

	const token = signToken(user._id.toHexString());

	cookies.set('jwt', token, {
		path: '/'
	});
	return json({
		token,
		data: {
			user
		}
	});
};
