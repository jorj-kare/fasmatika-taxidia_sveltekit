<script>
	import notificationStore from '$stores/notifications';
	import CloseBtn from '$components/account/CloseBtn.svelte';
	import Modal from '$components/Modal.svelte';
	import Field from '$components/form/Field.svelte';
	import Form from '$components/form/Form.svelte';
	import { isFieldEmpty } from '$components/form/validations';
	import getRandomColor from '$lib/utils/getRandomColor';
	import { onMount } from 'svelte';
	import Button from '$lib/components/form/Button.svelte';

	let backgroundColor;

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
			notificationStore.set({ type: 'success', msg: 'Επιτυχής σύνδεση!' });
		} catch (err) {
			notificationStore.set({ type: 'error', msg: err.message });
		}
	}
	onMount(() => {
		backgroundColor = getRandomColor();
	});
</script>

<Modal opacity={1} {backgroundColor}>
	<Form on:submit={login}>
		<Field label="Όνομα χρήστη" name="username" validate={isFieldEmpty} />
		<Field label="Κωδικός" name="password" validate={isFieldEmpty} />
		<Button size="b" color={backgroundColor}>Σύνδεση</Button>
	</Form>

	<CloseBtn page="account" />
</Modal>
