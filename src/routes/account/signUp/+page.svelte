<script>
	import Modal from '$components/Modal.svelte';

	import navStore from '$lib/stores/nav.js';
	import Form from '$components/form/Form.svelte';
	import Field from '$components/form/Field.svelte';
	import Button from '$components/form/Button.svelte';
	import notificationsStore from '$stores/notifications';
	import getRandomColor from '$lib/utils/getRandomColor';
	import {
		isFieldEmpty,
		isPasswordsTheSame
	} from '$components/form/validations.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let backgroundColor;
	$navStore.type = 'btnClose';
	$navStore.page = 'account';
	async function signUp(e) {
		try {
			const { username, password, confirmPassword, profileImg } = e.detail;

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

			if (!res.ok) throw new Error(resJson.message);

			$notificationsStore.type = 'success';
			$notificationsStore.msg = 'Επιτυχής εγγραφή!';
			$notificationsStore.sec = 2000;

			setTimeout(() => {
				goto('/account/login', {
					invalidateAll: true
				});
			}, 2500);
		} catch (err) {
			$notificationsStore.type = 'error';
			$notificationsStore.msg = err.message;
		}
	}
	onMount(() => {
		backgroundColor = getRandomColor();
	});
</script>

<Modal opacity={1} {backgroundColor}>
	<Form on:submit={signUp}>
		<Field
			label="Φωτογραφία προφίλ"
			name="profileImg"
			type="file"
			validate={isFieldEmpty} />
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
</Modal>
