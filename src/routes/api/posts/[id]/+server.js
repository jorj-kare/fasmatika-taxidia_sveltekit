import { json, error } from '@sveltejs/kit';
import Post from '$lib/server/db/models/post';
import { checkError } from '$lib/server/utils/customErrors';

export const GET = async ({ params }) => {
	const post = await Post.findById(params.id).populate('author');
	if (!post) throw error(404, 'No post found with this id.');
	return json({ data: { post } }, { status: 200, statusText: 'success' });
};
export const PATCH = async ({ params, request }) => {
	try {
		const data = await request.json();

		const post = await Post.findByIdAndUpdate(params.id, data, {
			new: true,
			runValidators: true
		});

		if (!post) throw error(404, 'No post found with this id. ');
		return json({ data: { post } }, { status: 200, statusText: 'success' });
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};

export const DELETE = async ({ params }) => {
	const post = await Post.findByIdAndDelete(params.id);
	if (!post) throw error(404, 'No post found with this id.');

	return json(
		{
			data: null
		},
		{ status: 204, statusText: 'success' }
	);
};
