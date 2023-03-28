<script>
	import getRandomColor from '$lib/utils/getRandomColor';
	import { goto, invalidateAll } from '$app/navigation';
	export let title;
	export let img;
	export let username;
	export let usernameImg;
	export let createdAt;
	export let id;
	export let editable = false;

	function getPost() {
		goto(`/post/${id}`);
	}

	async function deletePost() {
		if (!confirm('Are you sure that you want to delete this post?')) return;
		await fetch(`/api/posts/${id}`, {
			method: 'DELETE'
		});
		invalidateAll();
	}

	const randomColor = getRandomColor();
	const profileImg = usernameImg ? usernameImg : 'defaultUser.jpg';
</script>

<div class="wrapper">
	<div class="post" on:click={getPost} on:keypress={getPost}>
		<div id="title">
			<h1 style:color={randomColor}>
				<span>|</span>
				{title}
				<span>|</span>
			</h1>
		</div>

		<img src={`/images/posts/${img}`} alt={title} />
		<div class="{!editable ? 'detailsV1' : 'detailsV2'} details">
			<p id="date" style:color={randomColor}>
				{new Date(createdAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}
			</p>
			{#if !editable}
				<p id="author" style:color={randomColor}>{username}</p>
				<img
					id="profileImg"
					src={`/images/users/${profileImg}`}
					alt={username} />
			{/if}
		</div>
	</div>
	{#if editable}
		<button id="btnDelete" on:click={deletePost}>Delete post</button>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		#btnDelete {
			padding: 1rem;
			align-self: center;
			border: 1px solid $color-error;
			color: $color-error;
			border-radius: 5px;
			font-size: 1.8rem;
			transition: all 0.5s;
			&:hover {
				color: $color-white;
				background-color: $color-error;
			}
		}
	}
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
		.detailsV2 {
			display: flex;
			justify-content: center;
		}
		.detailsV1 {
			position: relative;
			display: grid;
			gap: 0.5rem;
			justify-items: flex-end;
			grid-template-areas:
				'date date date img'
				'auth auth auth img';
		}
		.details {
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
