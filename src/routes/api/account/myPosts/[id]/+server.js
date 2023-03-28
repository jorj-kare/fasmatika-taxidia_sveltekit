import Post from '$lib/server/db/models/post';
import { json, error } from '@sveltejs/kit';
import { checkError } from '$lib/server/utils/customErrors';
export const GET = async ({ params }) => {
	try {
		const posts = await Post.find({ author: params.id }).sort({
			createdAt: -1
		});

		return json(
			{ data: posts },
			{
				status: 200,
				statusText: 'success'
			}
		);
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};
