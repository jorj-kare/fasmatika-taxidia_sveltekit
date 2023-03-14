<script>
	import Modal from '$components/Modal.svelte';
	import CloseBtn from '$components/account/CloseBtn.svelte';
	import Form from '$components/form/Form.svelte';
	import Field from '$components/form/Field.svelte';
	import Button from '$components/form/Button.svelte';
	import notifications from '$stores/notifications';
	import getRandomColor from '$lib/utils/getRandomColor';
	import {
		isFieldEmpty,
		isPasswordsTheSame
	} from '$components/form/validations.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let backgroundColor;

	async function signUp(e) {
		try {
			const { username, password, confirmPassword, profileImg } = e.detail;
			console.log(username, password, confirmPassword, profileImg);

			const form = new FormData();
			form.append('username', username);
			form.append('password', password);
			form.append('confirmPassword', confirmPassword);
			form.append('profileImg', profileImg);

			const res = await fetch('/api/account/signUp', {
				method: 'Post',
				body: form
			});

			const resJson = await res.json();

			if (!res.ok) throw resJson;
			$notifications.msg = 'You have successfully sign-up!';
			$notifications.type = 'success';
			goto('/account/login', {
				invalidateAll: true
			});
		} catch (err) {
			$notifications.msg = err.message;
			$notifications.type = 'error';
		}
	}
	onMount(() => {
		backgroundColor = getRandomColor();
	});
</script>

<Modal opacity={1} {backgroundColor}>
	<Form on:submit={signUp}>
		<Field label="Φωτογραφία προφίλ" name="profileImg" type="file" />
		<Field label="Όνομα" name="username" validate={isFieldEmpty} />
		<Field
			label="Κωδικός"
			name="password"
			type="password"
			validate={isFieldEmpty} />
		<Field
			label="Επαλήθευση κωδικού"
			name="confirmPassword"
			type="password"
			validate={isPasswordsTheSame} />

		<Button color={backgroundColor} type="submit">Δημιουργία</Button>
	</Form>

	<CloseBtn page="account" />
</Modal>
