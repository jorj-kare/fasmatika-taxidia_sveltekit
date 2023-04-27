<script>
	import { PUBLIC_CLOUDINARY_URL } from '$env/static/public';
	import { cloudinary } from '$lib/utils/cloudinary.js';
	import { Circle2 } from 'svelte-loading-spinners';
	import GoTrashcan from 'svelte-icons/go/GoTrashcan.svelte';
	import IoMdImages from 'svelte-icons/io/IoMdImages.svelte';
	import notificationsStore from '$lib/stores/notifications.js';
	import { labelShine, stopLabelShine } from '$lib/utils/inputFocus.js';
	import { goto } from '$app/navigation';
	import { nanoid } from 'nanoid';
	import { fade } from 'svelte/transition';

	export let data;

	let title;
	let content;
	let imgSrc;
	let fileInput;
	let file;
	let submitting = false;
	let editMode = false;
	if (data.data?.post) {
		title = data.data.post.title;
		content = data.data.post.content;
		imgSrc = PUBLIC_CLOUDINARY_URL + data.data.post.img;
		editMode = true;
	}
	export const snapshot = {
		capture: () => {
			return {
				title,
				content,
				file,
				imgSrc
			};
		},
		restore: (value) => {
			(title = value.title),
				(content = value.content),
				(file = value.file),
				(imgSrc = value.imgSrc);
		}
	};

	async function onsubmit() {
		try {
			if (!data.user) {
				throw new Error('Πρέπει να συνδεθείς πρώτα!');
			}

			let filename;
			submitting = true;

			// If create a new post or edit post and there is a file save image
			if ((editMode && file) || !editMode) {
				const resCloud = await cloudinary({
					publicId: nanoid(),
					file: file,
					action: 'upload',
					folder: 'posts'
				});

				if (!resCloud.public_id) throw new Error('Μη έγκυρη μορφή αρχείου: φωτογραφία');

				filename = `${resCloud.public_id}.${resCloud.format}`;
			}

			const post = {
				title,
				content
			};

			if (filename) post.img = filename;
			if (!editMode) post.author = data.user.id;

			const url = editMode ? `/api/posts/${data.data.post._id}` : '/api/posts';
			const fetchMethod = editMode ? 'PATCH' : 'POST';

			const res = await fetch(url, {
				method: fetchMethod,
				body: JSON.stringify(post)
			});

			const resJson = await res.json();

			if (!res.ok) {
				submitting = false;
				// If request fails delete newly created image
				if (file) {
					await cloudinary({
						publicId: 'posts/' + filename,
						action: 'destroy',
						folder: 'posts'
					});
				}

				throw new Error(resJson.message);
			}
			// If new image in edit and request is ok delete the previews image.
			if (editMode && file) {
				await cloudinary({
					publicId: data.data.post.img.split('.')[0],
					action: 'destroy',
					folder: 'posts'
				});
			}
			$notificationsStore.type = 'success';
			$notificationsStore.msg = 'Το ποστ έχει αποθηκευτεί με επιτυχία';
			$notificationsStore.sec = 2000;

			setTimeout(() => {
				goto('/', {
					invalidateAll: true
				});
			}, 2500);
		} catch (err) {
			submitting = false;
			$notificationsStore.type = 'error';
			$notificationsStore.msg = err.message;
		}
	}

	function previewImg(e) {
		const fr = new FileReader();
		file = e.target.files[0];
		fr.readAsDataURL(file);
		fr.onload = function (e) {
			imgSrc = e.currentTarget?.result;
		};
	}
	function clearImg() {
		imgSrc = '';
		file = '';
	}
</script>

<section class="newPost" out:fade={{ duration: 400 }}>
	{#if submitting}
		<div class="spinnerBackground">
			<div class="spinnerWrapper">
				<Circle2
					size="100"
					colorOuter=" #1f4690"
					colorCenter="#975c8d"
					colorInner=" #86c8bc"
					unit="px"
				/>
			</div>
		</div>
	{/if}
	<form on:submit|preventDefault={onsubmit}>
		<label id="titleLabel" for="titleInput">Τίτλος </label>
		<textarea id="titleInput" bind:value={title} on:focus={labelShine} on:blur={stopLabelShine} />
		<label id="contentLabel" for="contentInput">Κείμενο</label>
		<textarea
			id="contentInput"
			bind:value={content}
			on:focus={labelShine}
			on:blur={stopLabelShine}
			cols="5"
			required
		/>
		<label id="imageLabel" for="imageInput">Φωτογραφία</label>
		{#if !imgSrc}
			<input
				bind:this={fileInput}
				on:change={previewImg}
				style:display="none"
				id="imageInput"
				name="img"
				type="file"
				accept="image/*"
				title="Πατήστε εδω για να επιλεξέτε φωτογραφία"
			/>
			<button
				id="btnUploadImg"
				on:click|preventDefault={() => {
					fileInput.click();
				}}
			>
				<IoMdImages />
			</button>
		{:else}
			<div id="previewImage">
				<img src={imgSrc} alt="preview" />
				<button on:click={clearImg}
					><div id="icon-trash"><GoTrashcan /></div>
					Αφαίρεση</button
				>
			</div>
		{/if}
		<button id="btnSubmit" type="submit"><span> Αποθήκευση</span></button>
	</form>
</section>

<style lang="scss">
	.newPost {
		display: flex;
		flex-direction: column;
		background-color: $color-black;
		padding: 0 4rem;
	}

	form {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-auto-rows: 4.5rem;
		gap: 1rem;
		padding: 20rem 0;
		letter-spacing: 0.3rem;

		@include break($media-small) {
			gap: 0.5;
			padding-top: 12rem;
		}

		label {
			font-size: 2.6rem;
			color: $color-white;
			transition: all 0.5s;
		}
		input,
		textarea {
			padding: 2rem;
			border: 2px solid $color-black;
			border-radius: 15px;
			outline: transparent;
			background-color: transparent;
			word-spacing: normal;
			color: $color-white;
		}
	}

	#titleLabel {
		grid-column: 3/4;
		grid-row: 1/4;
		display: flex;
		padding-bottom: 0.5rem;
		letter-spacing: 0.1rem;
		writing-mode: vertical-rl;
		text-orientation: upright;
		@include break($media-xLarge) {
			grid-column: 2/3;
		}
		@include break($media-medium) {
			grid-column: 1/2;
		}
		@include break($media-small) {
			grid-column: 1/5;
			grid-row: 1/2;
			align-items: flex-end;
			padding-bottom: 0;
			writing-mode: initial;
			text-orientation: initial;
		}
	}
	#titleInput {
		grid-column: 4/10;
		grid-row: 1/4;
		background-color: #975c8d;
		font-size: 3rem;
		@include break($media-xxLarge) {
			grid-column: 4/11;
		}
		@include break($media-xLarge) {
			grid-column: 3/12;
		}
		@include break($media-medium) {
			grid-column: 2/11;
		}
		@include break($media-small) {
			grid-column: 1/-1;
			grid-row: 2/5;
		}
	}
	#contentLabel {
		grid-column: 7/13;
		grid-row: 7/8;
		display: flex;
		align-items: flex-end;
		@include break($media-xLarge) {
			grid-column: 5/12;
		}
		@include break($media-small) {
			grid-column: 1/-1;
			grid-row: 5/6;
		}
	}
	#contentInput {
		grid-column: 7/13;
		grid-row: 8/22;
		background-color: #1f4690;
		font-size: 2rem;
		font-weight: 300;
		@include break($media-xLarge) {
			grid-column: 5/13;
		}
		@include break($media-small) {
			grid-column: 1/-1;
			grid-row: 6/18;
		}
	}
	#imageLabel {
		grid-column: 2/4;
		grid-row: 11/12;
		display: flex;
		align-items: flex-end;
		@include break($media-xLarge) {
			grid-column: 1/3;
		}
		@include break($media-small) {
			grid-column: 1/-1;
			grid-row: 19/20;
		}
	}

	#btnUploadImg {
		grid-column: 2/4;
		grid-row: 12/16;
		position: relative;
		border: 5px solid $color-white;
		border-radius: 15px;
		padding: 3rem;
		background-color: transparent;
		color: $color-white;
		@include break($media-xLarge) {
			grid-column: 1/3;
		}
		@include break($media-small) {
			grid-column: 1/6;
			grid-row: 20/25;
		}
		@include break($media-xSmall) {
			grid-column: 1/8;
			border-width: 3px;
		}

		&:after {
			content: '+';
			position: absolute;
			bottom: -0.5rem;
			right: 1.5rem;
			font-size: 7rem;
			transition: transform 0.5s;
			@include break($media-xLarge) {
				font-size: 6rem;
			}
		}

		&:hover:after {
			transform: scale(1.1);
		}
	}

	#previewImage {
		grid-column: 2/5;
		grid-row: 12/22;
		display: flex;
		flex-direction: column;
		align-items: center;
		@include break($media-xLarge) {
			grid-column: 1/4;
		}
		@include break($media-small) {
			grid-column: 1/-1;
			grid-row: 20 /28;
		}

		img {
			max-width: 100%;
			height: auto;
			max-height: 100%;
			border-radius: 15px;
			object-fit: contain;
		}

		button {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			align-content: baseline;
			margin-top: 1.5rem;
			padding: 0.4rem 0.5rem;
			border-radius: 5px;
			color: $color-white;
			background-color: transparent;
			font-size: 1.3rem;
			letter-spacing: 0.1rem;
			transition: all 0.4s;
			&:hover {
				box-shadow: 0 0 10px $color-white;
			}
			&:hover #icon-trash {
				animation: jump 0.4s 0.1s;
			}
			#icon-trash {
				width: 1.3rem;
				transition: all 0.5s ease-out;
			}
		}
	}

	#btnSubmit {
		grid-column: 2/3;
		grid-row: 5/9;
		width: 15rem;
		height: 15rem;
		margin: auto 0;
		border-radius: 100px;
		border: 3px solid$color-white;
		background-color: #fed049;
		color: $color-black;
		transition: all 1.5s ease-in;
		@include break($media-xLarge) {
			grid-column: 2/3;
			grid-row: 4/9;
			width: 13rem;
			height: 13rem;
		}
		@include break($media-small) {
			justify-self: center;
			grid-column: 1/-1;
			grid-row: 29 / 30;
			width: 50%;
			height: 9rem;
			margin-top: 2rem;
			border-radius: 10px;
			transition: all 0.7s;
		}

		&:active,
		&:hover {
			cursor: pointer;
			transform: rotate(360deg);

			@include break($media-small) {
				transform: none;
				background-color: transparent;
				border-color: #fed049;
				color: $color-white;
			}
		}
		span {
			display: flex;
			position: relative;
			width: fit-content;
			padding: 0.5rem 0.78rem;
			font-size: 1.8rem;
			letter-spacing: 0.4rem;
			border-radius: 15px;
			background-color: $color-white;
			left: 40%;
			@include break($media-xLarge) {
				font-size: 1.6rem;
			}
			@include break($media-small) {
				margin: auto;
				left: auto;
				background-color: transparent;
				letter-spacing: 0.3rem;
			}
		}
	}
	.spinnerBackground {
		position: fixed;
		inset: 0;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #181818d8;
		z-index: 9;
	}

	.spinnerWrapper {
		z-index: 100;
	}

	@keyframes jump {
		from {
			transform: translateY(1px);
		}
		to {
			transform: translateY(-1.5px);
		}
	}
</style>
