<script>
	import { Circle } from 'svelte-loading-spinners';
	export let color;
	export let size = 'm';
	export let type = 'button';
	export let disabled = false;
</script>

<button
	{type}
	{disabled}
	style:color
	class:small={size === 's'}
	class:medium={size === 'm'}
	class:big={size === 'b'}
	><slot />{#if disabled}
		<div id="icon-spin"><Circle size="22" color="#975c8d" /></div>{/if}</button
>

<style lang="scss">
	.small {
		padding: 1rem;
	}
	.medium {
		padding: 1.5rem;
	}
	.big {
		padding: 2rem;
	}
	button {
		display: flex;

		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		border: none;
		border-radius: 5px;
		transition: box-shadow 0.3s;

		&:hover {
			box-shadow: 0 0 8px $color-white;
		}

		#icon-spin {
		}
	}
</style>
