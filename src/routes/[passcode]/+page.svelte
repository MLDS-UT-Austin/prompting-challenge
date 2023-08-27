<script>
	import Chat from '../Chat.svelte';
	import Leaderboard from './Leaderboard.svelte';

	export let data;
</script>

<div class="text-center flex flex-col space-y-4 mt-6">
	{#if data.location === 'leaderboard'}
		<Leaderboard {data} />
	{:else}
		<Chat {data} />
	{/if}
</div>
