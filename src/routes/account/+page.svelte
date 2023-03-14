<script>
	import AccountBtn from '$components/account/AccountButtons.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="account" transition:fade={{ duration: 800 }}>
	<AccountBtn href="/account/login">Σύνδεση</AccountBtn>
	<AccountBtn href="/account/signUp">Δημιουργία λογαριασμού</AccountBtn>
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
