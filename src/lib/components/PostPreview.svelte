<script>
	import Modal from '$lib/components/Modal.svelte';
	import Stars from '$lib/components/Stars.svelte';
	import getRandomColor from '$lib/utils/getRandomColor';
	import { goto, invalidateAll } from '$app/navigation';
	import { PUBLIC_CLOUDINARY_URL } from '$env/static/public';
	import { cloudinary } from '$lib/utils/cloudinary.js';
	export let title;
	export let img;
	export let username;
	export let usernameImg;
	export let createdAt;
	export let id;
	export let editable = false;
	export let stars = 0;

	const randomColor = getRandomColor();
	const profileImg = usernameImg ? usernameImg : 'defaultUser.jpg';

	function getPost() {
		goto(`/post/${id}`);
	}

	async function deletePost() {
		if (!confirm('Are you sure that you want to delete this post?')) return;
		await fetch(`/api/posts/${id}`, {
			method: 'DELETE'
		});

		await cloudinary({
			publicId: img.split('.')[0],
			action: 'destroy',
			folder: 'posts'
		});

		invalidateAll();
	}
</script>

<div class="wrapper" style:color={randomColor}>
	<div class="post" on:click={getPost} on:keypress={getPost}>
		<div id="title">
			<h1>
				<span>|</span>
				{title}
				<span>|</span>
			</h1>
		</div>
		<img src={PUBLIC_CLOUDINARY_URL + img} alt={title} />
	</div>
	<div class="{!editable ? 'details--1' : 'details--2'} details">
		{#if !editable}
			<div id="stars"><Stars {stars} {username} {id} /></div>
		{/if}
		<p id="date">
			{new Date(createdAt).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
			})}
		</p>
		{#if !editable}
			<p id="author">{username}</p>
			<img id="profileImg" src={PUBLIC_CLOUDINARY_URL + profileImg} alt={username} />
		{/if}
	</div>
	{#if editable}
		<div class="btn-wrapper">
			<a class="btn btn--edit" style="--random-color:{randomColor}" href={`/${id}/new-post`}
				>Επεξεργασία</a
			>
			<button class="btn btn--delete" on:click={deletePost}>Διαγραφή</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.btn-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 2rem;

		.btn {
			margin: 0;
			padding: 1rem;
			align-self: center;
			border: 1px solid;
			border-radius: 5px;
			font-size: 1.8rem;
			transition: all 0.5s;

			&:hover {
				color: $color-white;
				background-color: var(--random-color);
			}
			&--delete {
				color: $color-error;
				border-color: $color-error;
				&:hover {
					background-color: $color-error;
				}
			}
		}
	}

	.post {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		color: inherit;
		img {
			width: 100%;
			height: auto;
			max-height: 60rem;
			border-radius: 10px;
			object-fit: cover;
			transition: all 0.3s;
			&:hover {
				filter: saturate(3);
			}
		}
		#title {
			display: flex;
			align-items: center;
			white-space: break-spaces;
			h1 {
				grid-area: text;
				font-weight: 400;
				font-size: 4rem;
				@include break($media-xSmall) {
					font-size: 3.5rem;
				}
			}
			span {
				font-size: 5rem;
			}
		}
	}
	.details--2 {
		display: flex;
		justify-content: center;
	}
	.details--1 {
		display: grid;
		gap: 0.5rem;
		justify-items: flex-end;
		grid-template-areas:
			'star date date date img'
			'star auth auth auth img';
	}
	.details {
		position: relative;
		font-size: 2rem;
		letter-spacing: 0.1rem;
		font-weight: 400;

		@include break($media-xSmall) {
			font-size: 2rem;
			letter-spacing: normal;
		}
		#stars {
			grid-area: star;
		}

		#date {
			grid-area: date;
			justify-self: flex-end;
		}
		#author {
			grid-area: auth;
			justify-self: flex-end;
			text-transform: capitalize;
		}
		#profileImg {
			grid-area: img;
			justify-self: center;
			width: 5rem;
			height: 5rem;
			border-radius: 50px;
			object-fit: cover;
		}
	}
</style>
