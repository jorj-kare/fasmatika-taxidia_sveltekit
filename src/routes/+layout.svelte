<script>
	// import Notification from '../lib/Notification.svelte';
	import Navigation from '$components/Navigation.svelte';
	import Notifications from '$components/Notifications.svelte';
	import '../styles/main.scss';

	let hidden = true;

	async function toggleNavigationMenu(e) {
		if (e.target.id === 'nav-btn') {
			hidden = !hidden;
		} else if (!hidden) {
			hidden = true;
		}
	}
</script>

<svelte:body on:click={toggleNavigationMenu} />
<Notifications />
<Navigation {hidden} />
<slot />

<style lang="scss">
</style>
