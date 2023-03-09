import adapter from '@sveltejs/adapter-auto';
import preprocessor from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor({
		scss: {
			prependData: '@use "src/styles/_variables.scss" as *;'
		}
	}),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: { $components: 'src/lib/components', $stores: 'src/lib/stores' }
	}
};

export default config;
