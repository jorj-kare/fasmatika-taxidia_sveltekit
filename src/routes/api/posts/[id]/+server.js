import { json, error } from '@sveltejs/kit';
import Post from '$lib/server/db/models/post';
import { checkError } from '$lib/server/utils/customErrors';
import fs from 'fs';
export const GET = async ({ params }) => {
	try {
		const post = await Post.findById(params.id).populate('author');
		if (!post) throw error(404, 'Δεν βρέθηκε καταχώρηση με αυτο το id');
		return json({ data: { post } }, { status: 200, statusText: 'success' });
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};
export const PATCH = async ({ params, request }) => {
	try {
		let data = await request.json();

		if (data.stars) {
			if (data.action === 'push') {
				data = { $push: { stars: data.stars } };
			}
			if (data.action === 'remove') {
				{
					data = { $pull: { stars: data.stars } };
				}
			}
		}
		const post = await Post.findByIdAndUpdate(params.id, data, {
			new: true,
			runValidators: true
		});

		if (!post) throw error(404, 'Δεν βρέθηκε καταχώρηση με αυτο το id');
		return json({ data: { post } }, { status: 200, statusText: 'success' });
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};

export const DELETE = async ({ params }) => {
	try {
		const post = await Post.findById(params.id);
		if (!post) throw error(404, 'No post found with this id.');
		await post.deleteOne();
		if (!fs.existsSync(`static/images/posts/${post.img}`))
			throw error(400, 'Filed not found');
		fs.unlinkSync(`static/images/posts/${post.img}`);
		return json(
			{
				data: null
			},
			{ status: 200, statusText: 'success' }
		);
	} catch (err) {
		const { msg, statusCode } = checkError(err);
		throw error(statusCode, msg);
	}
};
