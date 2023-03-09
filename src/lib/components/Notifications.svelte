<script>
	import notificationStore from '$stores/notifications';
	import { fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	$: if ($notificationStore.msg) {
		setTimeout(() => {
			$notificationStore.msg = '';
			$notificationStore.type = '';
		}, 4000);
	}
</script>

{#if $notificationStore.msg}
	<div
		transition:fly={{ duration: 1200, y: -100, easing: backInOut }}
		class:error={$notificationStore.type === 'error'}
		class:success={$notificationStore.type === 'success'}
	>
		<p>{$notificationStore.msg}</p>
	</div>{/if}

<style lang="scss">
	div {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 1rem;
		padding: 1rem 2rem;
		border-radius: 10px;
		color: $color-white;
		font-size: 1.5rem;
		z-index: 10;
	}

	.error {
		background-color: #ab3131b5;
	}
	.success {
		background-color: #055c45d2;
	}
</style>
