import Post from '$lib/server/db/models/post';
import { error, json } from '@sveltejs/kit';
import { checkError } from '$lib/server/utils/customErrors';

export const GET = async () => {
	const posts = await Post.find().populate('author').sort({ createdAt: -1 });
	return json(
		{ data: posts },
		{
			status: 200,
			statusText: 'success'
		}
	);
};

export const POST = async ({ request }) => {
	try {
		const post = await request.json();

		const newPost = await Post.create({
			title: post.title,
			content: post.content,
			img: post.img,
			author: post.author
		});
		return json(
			{ data: { newPost } },
			{
				status: 201,
				statusText: 'success'
			}
		);
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};
