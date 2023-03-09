<script>
	export let title;
	export let img;
	export let content;
	export let username;
	export let usernameImg;
</script>

<div class="post">
	<figure>
		<img src={`/images/posts/${img}`} alt={title} />
	</figure>
	<div class="title">
		<h1>{title}</h1>
	</div>
	<div class="text">
		<p>
			{content}
		</p>
	</div>
	<div class="author">
		<img src={usernameImg} alt={username} />
		<p>{username}</p>
	</div>
</div>

<style lang="scss">
	.post {
		display: grid;
		grid-template-columns: 3rem repeat(6, 1fr) 3rem;
		grid-template-rows: 10rem 1fr 1fr 10rem;
		min-height: 100vh;
		border-bottom: 3px solid $color-white;
	}
	figure {
		grid-column: 2/5;
		grid-row: 2/-1;
		display: flex;
		align-items: center;
		padding: 2rem;
		margin-bottom: 2rem;
		max-height: 100vh;
		border-right: 3px solid $color-white;
		background-color: $color-black;
		img {
			width: 100%;
			height: auto;
			max-height: 100%;
			border-radius: 5px;
			object-fit: cover;
		}
	}

	.text {
		grid-column: 5/8;
		grid-row: 2/4;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 60ch;
		height: 100%;
		padding: 0 5rem;
		overflow-y: scroll;
		font-size: 1.6rem;
		line-height: 1.5;
		background-color: $color-black;
	}
	.title {
		grid-column: 2/8;
		grid-row: 1/2;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;

		letter-spacing: 0.5rem;
		z-index: 1;
		h1 {
			padding-bottom: 0.2rem;
			font-weight: 500;
		}
	}

	.author {
		grid-column: 5/8;
		grid-row: 4/5;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		img {
			width: 4rem;
			height: 4rem;
			border-radius: 50px;
		}
		p {
			font-size: 1.6rem;
		}
	}
</style>
