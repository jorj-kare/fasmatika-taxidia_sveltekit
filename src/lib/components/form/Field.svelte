<script>
	import { v4 as uuid } from 'uuid';
	import { onMount, getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { formKey } from './key';
	import { labelShine, stopLabelShine } from '$lib/utils/inputFocus';
	import FaUserAstronaut from 'svelte-icons/fa/FaUserAstronaut.svelte';
	import GoTrashcan from 'svelte-icons/go/GoTrashcan.svelte';

	let fileInput;
	let imgSrc;
	export let label;
	export let type = 'text';
	export let name;
	export let id = uuid();
	export let validate = undefined;
	let formStore = getContext(formKey);

	function oninput(e) {
		const value = e.currentTarget.value;

		if (validate?.name === 'isPasswordsTheSame' && validate($formStore.values?.password, value)) {
			$formStore.errors[name] = validate($formStore.values?.password, value);
		} else if (validate && validate.name !== 'isPasswordsTheSame' && validate(value)) {
			$formStore.errors[name] = validate(value, label);
		} else {
			delete $formStore.errors[name];
		}

		$formStore.values[name] = type === 'file' ? e.currentTarget.files[0] : value;
	}
	function previewImg(e) {
		const fr = new FileReader();
		fr.readAsDataURL(e.target.files[0]);
		fr.onload = function (e) {
			imgSrc = e.currentTarget?.result;
		};
	}

	onMount(() => {
		if (validate && validate($formStore.values[name])) {
			$formStore.errors[name] = validate($formStore.values[name], label);
		}
	});
</script>

<div class="wrapper">
	{#if type !== 'file'}
		<label for={id}>{label}</label>
		<input {id} {type} {name} on:input={oninput} on:focus={labelShine} on:blur={stopLabelShine} />
	{:else}
		<div class="upload-wrapper">
			<input
				style:display="none"
				bind:this={fileInput}
				on:change={previewImg}
				{id}
				{type}
				{name}
				on:input={oninput}
			/>
			{#if !imgSrc}
				<button
					class="img-wrapper"
					id="uploadImgBtn"
					title="Upload image"
					on:click|preventDefault={() => {
						fileInput.click();
					}}
				>
					<div id="icon-user">
						<FaUserAstronaut />
					</div>
				</button>
			{:else}
				<div class="wrapper">
					<div class="img-wrapper">
						<img src={imgSrc} alt="profile" />
					</div>
					<button
						id="clearImgBtn"
						on:click={() => {
							fileInput.value = '';
							imgSrc = '';
							delete $formStore.values.profileImg;
						}}><GoTrashcan /></button
					>
				</div>
			{/if}
		</div>
	{/if}
	{#if $formStore.errors[name] && $formStore.showErrors}
		<p class="error" transition:slide|local={{ duration: 700 }}>
			{$formStore.errors[name]}
		</p>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-flow: column;
		position: relative;
		label {
			padding-bottom: 0.5rem;
		}
		input {
			padding: 1.5rem 1rem;
			border-radius: 5px;
			outline: transparent;
		}
	}
	.upload-wrapper {
		margin: auto;
		.img-wrapper {
			position: relative;
			height: 17rem;
			width: 17rem;
			padding: 0;
			border: 2px solid $color-white;
			border-radius: 50rem;
			background-color: transparent;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50rem;
				object-fit: cover;
			}
		}
		#uploadImgBtn {
			&:after {
				content: '+';
				position: absolute;
				bottom: -5px;
				right: -5px;
				font-size: 4rem;
				color: $color-white;
				transition: transform 0.5s;
			}
			&:hover:after,
			&:active:after {
				transform: scale(1.2);
			}
			#icon-user {
				margin: 3.5rem;
				color: $color-white;
			}
		}

		#clearImgBtn {
			position: relative;
			top: -2.4rem;
			width: 3.3rem;
			align-self: flex-end;
			background-color: transparent;
			border: none;
			color: $color-white;
			transition: transform 0.5s;

			&:hover {
				transform: rotate(30deg);
			}
		}
	}
	.error {
		position: absolute;
		top: 3rem;
		left: 1rem;
		font-size: 1.6rem;
		// background-color: rgba(218, 216, 216, 0.777);
		border-radius: 5px;
		color: $color-error;
	}
</style>
