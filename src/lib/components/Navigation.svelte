<script>
	import { fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	export let hidden;
</script>

<div class="nav">
	<button
		id="nav-btn"
		class="nav__button btn-round"
		class:rotate={hidden}
		type="button">
		M
	</button>

	{#if !hidden}
		<ul class="nav__menu">
			<li
				class="nav__item"
				id="home"
				transition:fly|local={{
					y: -50,
					delay: 50,
					duration: 1200,
					easing: backInOut
				}}>
				<a href="/">Αρχική</a>
			</li>
			<li
				class="nav__item"
				id="newPost"
				transition:fly|local={{
					y: -50,
					delay: 200,
					duration: 1200,
					easing: backInOut
				}}>
				<a href="/new-post">Νέο πόστ</a>
			</li>

			<li
				class="nav__item"
				id="profile"
				transition:fly|local={{
					y: -50,
					delay: 350,
					duration: 1200,
					easing: backInOut
				}}>
				<a href="/account">Προφίλ</a>
			</li>
		</ul>
	{/if}
</div>

<style lang="scss">
	.nav {
		position: absolute;
		top: 2.5rem;
		right: 2.5rem;
		z-index: 1;
	}
	button {
		transition: 0.5s all linear;
		&:hover,
		&:active {
			text-shadow: 0 0 10px $color-white;
		}
	}

	ul {
		display: flex;
		justify-content: center;
		gap: 0.25rem;
		margin: 0 -1.6rem;
		list-style: none;
		:nth-child(1) {
			margin-top: 0.8rem;
		}
		:nth-child(2) {
			margin-top: 4.5rem;
		}
		:nth-child(3) {
			margin-top: 2rem;
		}
	}

	li {
		writing-mode: vertical-rl;
		text-orientation: upright;
		font-size: 2rem;
		font-weight: 300;
		letter-spacing: 0.7rem;
		cursor: pointer;
		transition: all 0.5s;
		&:hover,
		&:active {
			transform: translateY(4px);
			text-shadow: (0 2px 10px #fffdfd);
		}
	}

	.rotate {
		transform: rotate(360deg);
	}
</style>
