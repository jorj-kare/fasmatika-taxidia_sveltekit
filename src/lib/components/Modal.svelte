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
	out:fade
>
	<slot />
</div>

<style>
	.wrapper {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		inset: 0;

		z-index: 2;
	}
</style>
