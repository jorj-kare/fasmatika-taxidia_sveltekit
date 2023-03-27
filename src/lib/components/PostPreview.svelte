<script>
	import getRandomColor from '$lib/utils/getRandomColor';
	import { goto } from '$app/navigation';
	export let title;
	export let img;
	export let username;
	export let usernameImg;
	export let createdAt;
	export let id;
	function getPost() {
		goto(`/post/${id}`);
	}
	const randomColor = getRandomColor();
	const profileImg = usernameImg ? usernameImg : 'defaultUser.jpg';
</script>

<div class="post" on:click={getPost} on:keypress={getPost}>
	<div id="title">
		<h1 style:color={randomColor}>
			<span>|</span>
			{title}
			<span>|</span>
		</h1>
	</div>

	<img src={`/images/posts/${img}`} alt={title} />
	<div class="details">
		<p id="date" style:color={randomColor}>
			{new Date(createdAt).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
			})}
		</p>
		<p id="author" style:color={randomColor}>{username}</p>
		<img id="profileImg" src={`/images/users/${profileImg}`} alt={username} />
	</div>
</div>

<style lang="scss">
	.post {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		color: $color-black;

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

			h1 {
				grid-area: text;
				font-weight: 400;
				font-size: 4rem;
			}
			span {
				font-size: 5rem;
			}
		}

		.details {
			position: relative;
			display: grid;
			gap: 0.5rem;
			justify-items: flex-end;
			grid-template-areas:
				'date date date img'
				'auth auth auth img';
			font-size: 2.5rem;
			letter-spacing: 0.2rem;
			font-weight: 400;
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
				width: 7rem;
				height: 7rem;
				border-radius: 50px;
			}
		}
	}
</style>
