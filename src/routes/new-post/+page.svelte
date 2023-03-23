<script>
	import { Circle2 } from 'svelte-loading-spinners';
	import Modal from '$components/Modal.svelte';
	import GoTrashcan from 'svelte-icons/go/GoTrashcan.svelte';
	import IoMdImages from 'svelte-icons/io/IoMdImages.svelte';
	import notificationsStore from '$lib/stores/notifications.js';
	import { labelShine, stopLabelShine } from '$lib/utils/inputFocus.js';
	import { goto } from '$app/navigation';

	export let data;

	let title;
	let content;
	let imgSrc;
	let fileInput;
	let file;
	let submit;

	$: console.log(data);

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
			submit = true;
			const form = new FormData();
			form.append('title', title);
			form.append('content', content);
			form.append('img', file);
			form.append('author', data.user.id);

			const res = await fetch('/api/posts', {
				method: 'Post',
				body: form
			});
			const resJson = res.json();

			if (!res.ok) throw new Error(resJson.message);
			notificationsStore.set({
				type: 'success',
				msg: 'Το ποστ έχει αποθηκευτεί με επιτυχία',
				sec: 2000
			});
			setTimeout(() => {
				goto('/', {
					invalidateAll: true
				});
			}, 2500);
		} catch (err) {
			notificationsStore.set({
				type: 'error',
				msg: err.message
			});
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

<section class="newPost">
	{#if submit}
		<Modal>
			<div class="spinnerWrapper">
				<Circle2
					size="100"
					colorOuter=" #1f4690"
					colorCenter="#975c8d"
					colorInner=" #86c8bc"
					unit="px" />
			</div>
		</Modal>
	{/if}
	<form on:submit|preventDefault={onsubmit}>
		<label id="titleLabel" for="titleInput">Τίτλος </label>
		<textarea
			id="titleInput"
			bind:value={title}
			on:focus={labelShine}
			on:blur={stopLabelShine}
			required />
		<label id="contentLabel" for="contentInput">Περιεχόμενο</label>
		<textarea
			id="contentInput"
			bind:value={content}
			on:focus={labelShine}
			on:blur={stopLabelShine}
			cols="5"
			required />
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
				required />
			<button
				id="btnUploadImg"
				on:click|preventDefault={() => {
					fileInput.click();
				}}>
				<IoMdImages />
			</button>
		{:else}
			<div id="previewImage">
				<img src={imgSrc} alt="preview" />
				<button on:click={clearImg}
					><div id="icon-trash"><GoTrashcan /></div>
					Αφαίρεση</button>
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
		grid-template-rows: repeat(6, 20rem);

		gap: 1rem;
		padding-top: 15rem;
		letter-spacing: 0.3rem;

		label {
			font-size: 2.2rem;
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
		grid-row: 1/2;
		grid-column: 3/4;
		padding-bottom: 0.5rem;
		writing-mode: vertical-rl;
		text-orientation: upright;
	}
	#titleInput {
		grid-column: 4/10;
		grid-row: 1/2;
		background-color: #975c8d;
		font-size: 3rem;
	}
	#contentLabel {
		grid-column: 7/12;
		grid-row: 2/3;
		display: flex;
		align-items: flex-end;
	}
	#contentInput {
		grid-column: 7/13;
		grid-row: 3/7;
		background-color: #1f4690;
		font-size: 2rem;
		font-weight: 300;
	}
	#imageLabel {
		grid-column: 2/4;
		grid-row: 3/4;
		display: flex;
		align-items: flex-end;
	}

	#btnUploadImg {
		grid-column: 2/4;
		grid-row: 4/5;
		position: relative;
		border: 4px solid $color-white;
		border-radius: 15px;
		padding: 3rem;
		background-color: transparent;
		color: $color-white;

		&:after {
			content: '+';
			position: absolute;
			bottom: 0rem;
			right: 1.5rem;
			font-size: 8rem;
			transition: transform 0.5s;
		}

		&:hover:after {
			transform: scale(1.1);
		}
	}

	#previewImage {
		grid-column: 2/5;
		grid-row: 4/10;
		display: flex;
		flex-direction: column;
		align-items: center;

		img {
			width: 100%;
			height: auto;
			border-radius: 15px;
		}

		button {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			align-content: baseline;
			margin-top: 1rem;
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
		grid-row: 2/3;
		width: 15rem;
		height: 15rem;
		margin: auto 0;
		border-radius: 100px;
		border: 3px solid$color-white;
		background-color: #fed049;
		color: $color-black;
		transition: all 1.5s ease-in;
		&:active,
		&:hover {
			cursor: pointer;
			transform: rotate(360deg);
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
		}
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
