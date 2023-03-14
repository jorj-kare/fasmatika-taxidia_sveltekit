<script>
	import { setContext, createEventDispatcher } from 'svelte';
	import formStore from '$stores/form';
	import { formKey } from '$components/form/key';

	const dispatch = createEventDispatcher();
	setContext(formKey, formStore);

	function onsubmit() {
		if (Object.keys($formStore.errors).length === 0) {
			dispatch('submit', $formStore.values);
		} else {
			$formStore.showErrors = true;
			setTimeout(() => {
				$formStore.showErrors = false;
			}, 5000);
		}
	}
</script>

<form on:submit|preventDefault={onsubmit}>
	<slot />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		font-size: 1.8rem;
	}
</style>
