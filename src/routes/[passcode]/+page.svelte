<script>
	import Chat from '../Chat.svelte';

	export let data;
</script>

<div class="text-center flex flex-col space-y-4 mt-6">
	<Chat {data} />
</div>
