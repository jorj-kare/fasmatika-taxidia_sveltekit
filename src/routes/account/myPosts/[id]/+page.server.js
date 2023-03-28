import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
	const res = await fetch(`/api/account/myPosts/${params.id}`);
	const resJson = await res.json();
	if (!res.ok) throw error(res.status, resJson.message);

	return { posts: resJson };
};
