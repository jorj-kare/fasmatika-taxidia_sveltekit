<script>
	import notificationStore from '$stores/notifications';
	import { fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	$: if ($notificationStore.msg) {
		setTimeout(() => {
			$notificationStore.msg = '';
			$notificationStore.type = '';
			$notificationStore.sec = 4000;
		}, $notificationStore.sec);
	}
</script>

{#if $notificationStore.msg}
	<div
		transition:fly={{ duration: 1200, y: -100, easing: backInOut }}
		class:error={$notificationStore.type === 'error'}
		class:success={$notificationStore.type === 'success'}>
		<p>{$notificationStore.msg}</p>
	</div>{/if}

<style lang="scss">
	div {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 1.5rem;
		padding: 1.5rem 2.5rem;
		border-radius: 10px;
		color: $color-white;
		font-size: 2rem;
		z-index: 10;
	}

	.error {
		background-color: $color-error;
	}
	.success {
		background-color: $color-success;
	}
</style>
