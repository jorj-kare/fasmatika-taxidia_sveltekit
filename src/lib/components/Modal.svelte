<script>
	import { fade } from 'svelte/transition';
	export let backgroundColor = '#00000';
</script>

<div class="wrapper" style:background-color={backgroundColor} out:fade|local={{ duration: 400 }}>
	<slot />
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		min-width: 100vw;
		overflow-y: scroll;
		z-index: 2;
	}
</style>
