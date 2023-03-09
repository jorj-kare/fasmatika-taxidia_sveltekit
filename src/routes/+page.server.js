import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const res = await fetch('/api/posts');
	const resJson = await res.json();
	if (!res.ok) throw error(res.status, resJson.message);
	return {
		posts: resJson
	};
};
