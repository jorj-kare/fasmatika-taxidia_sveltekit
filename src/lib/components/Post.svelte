<script>
	export let title;
	export let img;
	export let content;
	export let username;
	export let usernameImg;

	const profileImg = usernameImg ? usernameImg : 'defaultUser.jpg';
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
		<img src={`/images/users/${profileImg}`} alt={username} />
		<p>{username}</p>
	</div>
</div>

<style lang="scss">
	.post {
		display: grid;
		grid-template-columns: 3rem repeat(6, 1fr) 3rem;
		grid-template-rows: 12rem 1fr 1fr 12rem;
		min-height: 100vh;
		border-bottom: 3px solid $color-white;
		background-color: $color-black;
	}
	figure {
		grid-column: 2/6;
		grid-row: 2/-1;
		display: flex;
		align-items: center;
		padding: 2rem;
		margin-bottom: 2rem;
		max-height: 100vh;
		// border: 3px solid $color-white;

		img {
			width: 100%;
			height: auto;
			max-height: 100%;
			border-radius: 5px;
			object-fit: cover;
		}
	}

	.title {
		grid-column: 6/8;
		grid-row: 1/2;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		letter-spacing: 0.2rem;
		z-index: 1;
		h1 {
			// padding: 2rem;
			border-radius: 10px;
			// color: $color-black;
			// background-color: $color-white;
			font-size: 3.5rem;
			font-weight: 600;
		}
	}

	.text {
		grid-column: 6/8;
		grid-row: 2/4;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 5rem;

		p {
			padding: 3rem 4rem;
			border-radius: 50px;
			max-width: 60ch;
			background-color: #000000bd;
			font-size: 2.2rem;
			letter-spacing: 0.3rem;
			line-height: 1.5;
		}
	}

	.author {
		grid-column: 6/8;
		grid-row: 4/5;
		display: flex;
		// flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: baseline;
		gap: 0.5rem;
		// margin-bottom: 2rem;

		img {
			width: 7rem;
			height: 7rem;
			border-radius: 50px;
		}
		p {
			font-size: 2.1rem;
		}
	}
</style>
