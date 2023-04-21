<script>
	import notificationsStore from '$stores/notifications';
	import navStore from '$lib/stores/nav.js';
	import Modal from '$components/Modal.svelte';
	import Field from '$components/form/Field.svelte';
	import Form from '$components/form/Form.svelte';
	import { isFieldEmpty } from '$components/form/validations';
	import getRandomColor from '$lib/utils/getRandomColor';
	import { onMount } from 'svelte';
	import Button from '$lib/components/form/Button.svelte';
	import { goto } from '$app/navigation';

	let backgroundColor;
	$navStore.type = 'btnClose';
	$navStore.page = 'account';

	async function login(e) {
		try {
			const { username, password } = e.detail;

			const formData = new FormData();
			formData.append('username', username);
			formData.append('password', password);
			const res = await fetch('/api/account/login', {
				method: 'POST',
				body: formData
			});

			const resJson = await res.json();
			if (!res.ok) {
				throw new Error(resJson.message);
			}

			$notificationsStore.type = 'success';
			$notificationsStore.msg = 'Επιτυχής σύνδεση!';
			$notificationsStore.sec = 1500;
			setTimeout(() => {
				goto('/', {
					invalidateAll: true
				});
			}, 2000);
		} catch (err) {
			$notificationsStore.type = 'error';
			$notificationsStore.msg = err.message;
		}
	}
	onMount(() => {
		backgroundColor = getRandomColor();
	});
</script>

<Modal {backgroundColor}>
	<Form on:submit={login}>
		<Field label="Όνομα χρήστη" name="username" validate={isFieldEmpty} />
		<Field label="Κωδικός" name="password" type="password" validate={isFieldEmpty} />
		<Button type="submit" color={backgroundColor}>Σύνδεση</Button>
	</Form>
</Modal>
