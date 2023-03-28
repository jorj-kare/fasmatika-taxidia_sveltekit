import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
	const res = await fetch(`/api/posts/${params.id}`);
	const resJson = await res.json();
	if (!res.ok) throw error(res.status, resJson.message);
	return resJson;
};
