<script>
	import Modal from '$components/Modal.svelte';
	import Form from '$components/form/Form.svelte';
	import Field from '$components/form/Field.svelte';
	import Button from '$components/form/Button.svelte';
	import navStore from '$lib/stores/nav.js';
	import notificationsStore from '$stores/notifications';
	import getRandomColor from '$lib/utils/getRandomColor';
	import { isFieldEmpty } from '$components/form/validations.js';
	import { cloudinary } from '$lib/utils/cloudinary.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let backgroundColor;
	let submitting = false;

	$navStore.type = 'btnClose';
	$navStore.page = 'account';

	async function signUp(e) {
		try {
			const { username, password, confirmPassword, profileImg } = e.detail;
			submitting = true;
			const resCloud = await cloudinary({
				file: profileImg,
				publicId: username,
				action: 'upload',
				folder: 'users'
			});

			if (!resCloud.public_id) throw new Error('Μη έγκυρη μορφή αρχείου: φωτογραφία χρήστη');

			const filename = `${resCloud.public_id}.${resCloud.format}`;
			const data = {
				profileImg: filename,
				username,
				password,
				confirmPassword
			};

			const res = await fetch('/api/account/signUp', {
				method: 'Post',
				body: JSON.stringify(data)
			});

			const resJson = await res.json();

			if (!res.ok) {
				await cloudinary({
					publicId: 'users/' + username,
					action: 'destroy',
					folder: 'users'
				});

				throw new Error(resJson.message);
			}
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
			submitting = false;
		}
	}
	onMount(() => {
		backgroundColor = getRandomColor();
	});
</script>

<Modal {backgroundColor}>
	<Form on:submit={signUp}>
		<Field label="Φωτογραφία προφίλ" name="profileImg" type="file" />
		<Field label="Όνομα" name="username" validate={isFieldEmpty} />
		<Field label="Κωδικός" name="password" type="password" validate={isFieldEmpty} />
		<Field
			label="Επαλήθευση κωδικού"
			name="confirmPassword"
			type="password"
			validate={isFieldEmpty}
		/>
		<Button color={backgroundColor} type="submit" disabled={submitting}>Δημιουργία</Button>
	</Form>
</Modal>
