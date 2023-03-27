<script>
	import { page } from '$app/stores';
	import getRandomColor from '$lib/utils/getRandomColor.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(() => {
		setTimeout(() => {
			goto('/');
		}, 1500);
	});
</script>

<div style:background-color={getRandomColor()} class="wrapper">
	<h1>{$page.status}</h1>
	<h2>{$page.error?.message}</h2>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5rem;
		min-height: 100vh;
		color: #eee;
	}
	h1 {
		font-size: 15rem;
	}
	h2 {
		font-size: 5rem;
	}
</style>
