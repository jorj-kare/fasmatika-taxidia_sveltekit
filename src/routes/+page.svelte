<script>
	import Headers from '$components/Headers.svelte';
	import PostPreview from '$components/PostPreview.svelte';
	import navStore from '$lib/stores/nav.js';
	export let data;
	$navStore.type = 'nav';
</script>

<Headers />

<section class="posts">
	{#each data.posts.data as { _id, title, img, author, createdAt, stars }}
		<PostPreview
			{title}
			id={_id}
			{img}
			{createdAt}
			{stars}
			username={author?.username}
			usernameImg={author?.profileImg} />
	{/each}
</section>

<style lang="scss">
	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(60rem, 1fr));
		padding: 15rem 10rem;
		min-height: 100vh;
		gap: 10rem;
		background-color: $color-white;
	}
</style>
