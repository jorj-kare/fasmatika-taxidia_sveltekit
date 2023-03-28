<script>
	import Headers from '$components/Headers.svelte';
	import PostPreview from '$components/PostPreview.svelte';
	import navStore from '$lib/stores/nav.js';
	export let data;
	$navStore.type = 'nav';
</script>

<Headers />

<section class="posts">
	{#each data.posts.data as { _id, title, img, author, createdAt }}
		<PostPreview
			{title}
			id={_id}
			{img}
			{createdAt}
			username={author?.username}
			usernameImg={author?.profileImg} />
	{/each}
</section>

<style lang="scss">
	.posts {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: $color-black;
	}
</style>
