<script>
	import { fly, fade } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';
	import navStore from '$lib/stores/nav';
	export let hidden;
</script>

{#if $navStore.type === 'nav'}
	<div class="nav">
		<button id="nav-btn" class="nav__button btn-round" class:rotate={hidden} type="button">
			M
		</button>

		{#if !hidden}
			<ul
				class="nav__menu"
				transition:fly|local={{
					duration: 1200,
					easing: backInOut
				}}
			>
				<li
					class="nav__item"
					id="home"
					transition:fly|local={{
						y: -50,
						delay: 50,
						duration: 1200,
						easing: backInOut
					}}
				>
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
					}}
				>
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
					}}
				>
					<a href="/account">Προφίλ</a>
				</li>
			</ul>
		{/if}
	</div>
{:else if ($navStore.type = 'closeBtn')}
	<a
		id="closeBtn"
		class="btn-round"
		class:light={$navStore.mode === 'light'}
		href="/{$navStore.page}"
	>
		<p /></a
	>
{/if}

<style lang="scss">
	.nav {
		position: absolute;
		top: 4rem;
		right: 4rem;
		z-index: 1;
		@include break($media-xxLarge) {
			top: 2rem;
			right: 2rem;
		}
		@include break($media-xSmall) {
			top: 2rem;
			right: 2rem;
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
			@include break($media-small) {
				border-radius: 20px;
				padding: 2rem 0;
				background-color: #03001c56;
			}

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
	}
	#closeBtn {
		position: absolute;
		top: 4rem;
		right: 4rem;
		font-size: 2.8rem;
		z-index: 3;
		transition: box-shadow 0.5s;
		@include break($media-xxLarge) {
			top: 2rem;
			right: 2rem;
		}
		@include break($media-xSmall) {
			top: 2rem;
			right: 2rem;
		}
		&:hover {
			box-shadow: 0 0 8px $color-white;
		}

		&:before {
			content: '\2758';
			position: absolute;
			transform: rotate(90deg);
			left: 2.5rem;
			-webkit-backface-visibility: hidden;
			transition: all 1s;
			@include break($media-xSmall) {
				content: '\268A';
				transform: rotate(0deg);
				position: relative;
				left: 0;
			}
		}

		&:after {
			content: '\2758';
			position: absolute;
			transform: rotate(-90deg);
			left: 2.2rem;
			-webkit-backface-visibility: hidden;
			transition: all 1s;
			@include break($media-xSmall) {
				content: '';
			}
		}
		&:hover:after {
			transform: rotate(-399deg) scale(1.2);
		}
		&:hover:before {
			transform: rotate(399deg) scale(1.2);
			@include break($media-xSmall) {
				transform: rotate(0) scale(1);
			}
		}
	}
	.light {
		color: $color-black;
		border-color: $color-black;
	}
</style>
