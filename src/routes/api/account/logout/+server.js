export const POST = ({ cookies }) => {
	cookies.delete('jwt', { path: '/' });
	return new Response('', { status: 200, statusText: 'success' });
};
