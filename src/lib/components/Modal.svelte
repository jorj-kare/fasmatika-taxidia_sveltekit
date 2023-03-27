<script>
	import { slide, fade } from 'svelte/transition';
	export let opacity = 0.6;
	export let backgroundColor = '#00000';
</script>

<div
	class="wrapper"
	style:opacity
	style:background-color={backgroundColor}
	in:slide={{ duration: 800 }}
	out:fade>
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
