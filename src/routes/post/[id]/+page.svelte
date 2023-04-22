<script>
	import navStore from '$lib/stores/nav.js';
	import Modal from '$components/Modal.svelte';
	import { PUBLIC_CLOUDINARY_URL } from '$env/static/public';
	export let data;
	const post = data.data.post;
	$navStore.type = 'closeBtn';
	$navStore.page = '';
</script>

<Modal backgroundColor="#03001c">
	<div class="wrapper">
		<img src={PUBLIC_CLOUDINARY_URL + post.img} alt={post.title} />

		<h1>
			{post.title}
		</h1>

		<p class="content">{post.content}</p>
		<div class="author">
			<img
				src={PUBLIC_CLOUDINARY_URL + post.author.profileImg}
				alt={`profile image of ${post.author.username}`}
			/>
			<p>{post.author.username}</p>
			<p id="date">
				{new Date(post.createdAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}
			</p>
		</div>
	</div>
</Modal>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		gap: 8rem;
		padding: 20rem 0;
		background-color: $color-black;

		@include break($media-small) {
			padding: 15rem 0;
		}

		img {
			max-width: 80vw;
			max-height: 70vh;
			object-fit: contain;
			border-radius: 10px;

			@include break($media-small) {
				max-width: 100vw;
				padding: 2rem;
			}
		}
		h1 {
			max-width: 50vw;
			margin-top: 4rem;
			font-size: 4.5rem;
			font-weight: 300;
			text-align: center;
			word-spacing: normal;
			@include break($media-xLarge) {
				max-width: 80vw;
			}

			@include break($media-small) {
				max-width: 90vw;
				font-size: 4rem;
			}
		}
		.content {
			max-width: 60ch;
			padding-inline: 10rem;
			font-size: 2.5rem;
			line-height: 1.8;
			white-space: pre-line;
			@include break($media-small) {
				padding-inline: 5rem;
				font-size: 2.3rem;
			}
		}
		.author {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 3rem;
			margin-top: 10rem;
			font-size: 2.1rem;
			letter-spacing: 0.2rem;
			@include break($media-medium) {
				margin-top: 5rem;
			}
			img {
				width: 13rem;
				height: 13rem;
				object-fit: cover;
				border-radius: 50rem;
				@include break($media-small) {
					width: 10rem;
					height: 10rem;
				}
			}
		}
	}
</style>
