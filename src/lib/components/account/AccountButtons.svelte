<script>
	export let href;
</script>

<a on:click {href}><slot /></a>

<style lang="scss">
	a {
		padding: 1.3rem;
		background-color: $color-white;
		color: $color-black;
		border: none;
		border-radius: 2px;
		font-size: 2rem;
		letter-spacing: 0.3rem;
		transition: color 1.5s ease-in, border 2s, border-radius 1s, background-color 0.8s;

		&:hover,
		&:active {
			background-color: transparent;
			color: $color-white;
			border-radius: 2px;
			border-left: 0.5px solid $color-white;
			border-right: 0.5px solid $color-white;
		}
	}
</style>
