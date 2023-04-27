<script>
	import AccountBtn from '$components/account/AccountButtons.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import navStore from '$lib/stores/nav.js';
	export let data;
	$navStore.type = 'nav';
	async function logout() {
		await fetch('/api/account/logout', {
			method: 'POST',
			body: {}
		});

		goto('/', {
			invalidateAll: true
		});
	}
</script>

<div class="account" out:fade|local={{ duration: 400 }}>
	{#if data.user}
		<AccountBtn href={`/account/myPosts/${data.user.id}`}>Οι καταχωρήσεις μου</AccountBtn>
		<AccountBtn href="#" on:click={logout}>Αποσύνδεση</AccountBtn>
	{:else}
		<AccountBtn href="/account/login">Σύνδεση</AccountBtn>
		<AccountBtn href="/account/signUp">Δημιουργία λογαριασμού</AccountBtn>
	{/if}
</div>

<style lang="scss">
	.account {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2.5rem;
		height: 100%;
		background-color: $color-black;
	}
</style>
