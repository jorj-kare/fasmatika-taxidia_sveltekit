<script>
	export let color;
	export let size = 'm';
	export let type = 'button';
</script>

<button
	{type}
	style:color
	class:small={size === 's'}
	class:medium={size === 'm'}
	class:big={size === 'b'}><slot /></button>

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
		border: none;
		border-radius: 5px;
		transition: box-shadow 0.3s;

		&:hover {
			box-shadow: 0 0 8px $color-white;
		}
	}
</style>
