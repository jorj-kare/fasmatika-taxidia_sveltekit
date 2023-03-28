<script>
	import { fade, slide } from 'svelte/transition';
	import IoMdStarOutline from 'svelte-icons/io/IoMdStarOutline.svelte';
	import IoMdStar from 'svelte-icons/io/IoMdStar.svelte';
	import notificationsStore from '$stores/notifications';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import getRandomColor from '$lib/utils/getRandomColor';

	export let stars;
	export let username;
	export let id;
	let showNames = false;
	let userFavorite;

	async function giveStar() {
		if (!$page.data.user || $page.data.user.username === username) return;
		let data = { stars: $page.data.user.username };
		data.action = userFavorite ? 'remove' : 'push';
		const res = await fetch(`/api/posts/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
		const resJson = await res.json();
		if (!res.ok) {
			$notificationsStore.type = 'error';
			$notificationsStore.msg = resJson.message;
		}

		invalidateAll();
	}

	$: if (
		$page.data.user &&
		stars.length > 0 &&
		stars.includes($page.data.user.username)
	) {
		userFavorite = true;
	} else {
		userFavorite = false;
	}
</script>

<div class="starWrapper">
	<button id="starBtn" on:click={giveStar}>
		{#if userFavorite}
			<span style:color={'#F7DB6A'}>
				<IoMdStar />
			</span>
		{:else}
			<span>
				<IoMdStarOutline />
			</span>
		{/if}
	</button>
	<button
		id="starCounter"
		on:mouseenter={() => {
			if (stars.length > 0) showNames = true;
		}}
		on:mouseleave={() => {
			showNames = false;
		}}>{stars.length}</button>
	{#if showNames}
		<ul
			id="starNames"
			transition:fade
			on:mouseenter={() => {
				showNames = true;
			}}
			on:mouseleave={() => {
				showNames = false;
			}}>
			{#each stars as star}
				<li style:background-color={getRandomColor()}>{star}</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.starWrapper {
		grid-area: star;
		justify-self: center;
		align-self: flex-start;
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 2.5rem;
		#starBtn {
			width: 6rem;
			padding: 0;
			transition: all 0.4s;
			color: inherit;
			&:hover {
				transform: scale(1.1);
			}
		}
		#starCounter {
			color: inherit;
			cursor: pointer;
		}
		#starNames {
			position: absolute;
			display: flex;
			align-content: flex-start;
			flex-wrap: wrap;
			gap: 0.5rem;
			left: 2rem;
			bottom: -8rem;
			width: 57rem;
			height: 10rem;
			padding: 1rem;
			outline: 2px solid;
			border-radius: 10px;
			background-color: $color-white;
			overflow-y: scroll;
			list-style: none;
			text-transform: capitalize;
			cursor: pointer;
			li {
				padding: 0.5rem;
				color: $color-white;
				border-radius: 3px;
			}
		}
	}
</style>
