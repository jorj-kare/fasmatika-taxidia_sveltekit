<script>
	import Headers from '$components/Headers.svelte';
	import PostPreview from '$components/PostPreview.svelte';
	import navStore from '$lib/stores/nav.js';
	export let data;
	$navStore.type = 'nav';
</script>

<Headers />

<section class="posts grid-layout">
	{#each data.posts.data as { _id, title, img, author, createdAt, stars }}
		<PostPreview
			{title}
			id={_id}
			{img}
			{createdAt}
			{stars}
			username={author?.username}
			usernameImg={author?.profileImg}
		/>
	{/each}
</section>

<style lang="scss">
	.posts {
		min-height: 100vh;
		background-color: $color-white;
		padding-bottom: 20rem;
	}
</style>
