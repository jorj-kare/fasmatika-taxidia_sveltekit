<script>
	import Headers from '$components/Headers.svelte';
	import Post from '$components/Post.svelte';

	export let data;
</script>

<Headers />

<section class="posts">
	{#each data.posts.data as { title, content, img, author }}
		<Post {title} {content} {img} username={author?.username} usernameImg={author?.profileImg} />
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
