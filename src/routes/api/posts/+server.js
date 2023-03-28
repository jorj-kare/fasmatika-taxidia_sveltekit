import Post from '$lib/server/db/models/post';
import { error, json } from '@sveltejs/kit';
import { checkError } from '$lib/server/utils/customErrors';
import fs from 'fs';
import { nanoid } from 'nanoid';

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
		const formData = await request.formData();

		// Upload image
		let filename;
		const file = formData.get('img');
		if (file instanceof Object || file.name) {
			filename = `${nanoid()}.${file.type.split('/')[1]}`;
			const buffer = Buffer.from(await file.arrayBuffer());
			fs.writeFileSync(`static/images/posts/${filename}`, buffer, 'base64');
		}

		// Create new post
		const newPost = await Post.create({
			title: formData.get('title'),
			content: formData.get('content'),
			img: filename,
			author: formData.get('author')
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
