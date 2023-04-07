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
		<figure>
			<img src={PUBLIC_CLOUDINARY_URL + post.img} alt={post.title} />
		</figure>

		<div class="title">
			<h1>
				{post.title}
			</h1>
		</div>
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
		padding: 20rem;
		background-color: $color-black;

		figure {
			width: 101rem;
			height: 70rem;
			img {
				border-radius: 10px;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.title {
			display: flex;
			align-items: center;
			gap: 4rem;
		}
		h1 {
			font-size: 6rem;
			word-spacing: normal;
			font-weight: 300;
			margin-top: 4rem;
		}
		.content {
			max-width: 60ch;
			font-size: 2.5rem;
			line-height: 1.8;
		}
		.author {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 3rem;
			margin-top: 10rem;
			font-size: 2.1rem;
			letter-spacing: 0.2rem;
			img {
				width: 13rem;
				height: 13rem;
				object-fit: cover;
				border-radius: 50rem;
			}
		}
	}
</style>
