<script>
	export let page;
</script>

<a class="btn-round" href="/{page}"> <p /></a>

<style lang="scss">
	a {
		position: absolute;
		top: 2.5rem;
		right: 2.5rem;
		font-size: 2.8rem;
		z-index: 3;
		transition: box-shadow 0.5s;
		&:hover {
			box-shadow: 0 0 8px $color-white;
		}
	}

	a:before {
		content: '\2758';
		position: absolute;
		transform: rotate(90deg);
		left: 2.5rem;
		-webkit-backface-visibility: hidden;
		transition: all 1s;
	}
	a:after {
		content: '\2758';
		position: absolute;
		transform: rotate(-90deg);
		left: 2.2rem;
		-webkit-backface-visibility: hidden;
		transition: all 1s;
	}
	a:hover:after {
		transform: rotate(-399deg) scale(1.2);
	}
	a:hover:before {
		transform: rotate(399deg) scale(1.2);
	}
</style>
