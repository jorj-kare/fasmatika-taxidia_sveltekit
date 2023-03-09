<script>
	export let href;
</script>

<a {href}><slot /></a>

<style lang="scss">
	a {
		padding: 0.8rem;
		background-color: $color-white;
		color: $color-black;
		border: none;
		border-radius: 2px;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;
		transition: color 1.5s ease-in, border 2s, border-radius 1s, background-color 0.8s;

		&:hover {
			background-color: transparent;
			color: $color-white;
			border-radius: 5px;
			border-left: 0.5px solid $color-white;
			border-right: 0.5px solid $color-white;
		}
	}
</style>
