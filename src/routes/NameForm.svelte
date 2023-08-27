<script>
	import { enhance, applyAction } from '$app/forms';
	import { fade } from 'svelte/transition';

	export let data;
  export let name;

	let visited = false;
	$: {
		// make visited variable reactive
		visited = data.visited;
	}
</script>

<div in:fade={{ duration: visited ? 0 : 2000, delay: visited ? 0 : 8000 }} class="space-y-8">
  <form
    method="POST"
    action="?/name"
    use:enhance={() => {
      return async ({ result, update }) => {
        await update();

        if (result?.type !== 'success') {
          return;
        }

        name = result?.data?.name ?? '';

        console.log(result);
      };
    }}
  >
    <input
      name="name"
      type="text"
      autocomplete="off"
      placeholder="Name"
      required
      class="border-2 border-sky-800 dark:border-sky-400 bg-transparent w-1/4 p-2 rounded-lg"
    />
  </form>
</div>
