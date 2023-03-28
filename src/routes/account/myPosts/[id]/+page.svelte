<script>
	import PostPreview from '$components/PostPreview.svelte';
	import getRandomColor from '$lib/utils/getRandomColor';
	import navStore from '$lib/stores/nav.js';
	import GiPeriscope from 'svelte-icons/gi/GiPeriscope.svelte';
	import GoTelescope from 'svelte-icons/go/GoTelescope.svelte';
	import { onDestroy } from 'svelte';
	export let data;
	$navStore.mode = 'light';
	$navStore.type = 'btnClose';
	$navStore.page = 'account';

	onDestroy(() => {
		$navStore.mode = 'dark';
	});
	const randomColor = getRandomColor();
</script>

<section class="posts">
	{#if data.posts.data.length > 0}
		{#each data.posts.data as { _id, title, img, author, createdAt }}
			<PostPreview
				editable={true}
				{title}
				id={_id}
				{img}
				{createdAt}
				username={data.user.username}
				usernameImg={data.user.profileImg} />
		{/each}
	{:else}
		<div
			class="wrapper"
			style={`border-color:${randomColor};color:${randomColor}`}>
			<div id="icon-scope"><GiPeriscope /></div>
			<h1>Δεν βρέθηκε καμία καταχώρηση</h1>
		</div>
	{/if}
</section>

<style lang="scss">
	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(60rem, 1fr));
		padding: 15rem 10rem;
		min-height: 100vh;
		gap: 10rem;
		background-color: $color-white;
		.wrapper {
			grid-column: 1/-1;
			align-self: center;
			justify-self: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 8rem;
			width: 60rem;
			height: 60rem;
			border: 1rem solid $color-black;
			border-radius: 500px;
			font-size: 2.3rem;
			text-align: center;
			letter-spacing: 0.2rem;
			color: $color-black;

			#icon-scope {
				width: 20rem;
			}
		}
	}
</style>
