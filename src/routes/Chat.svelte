<script>
	import { enhance, applyAction } from '$app/forms';
  import { fade } from 'svelte/transition';

  export let data;

  let { visited, puzzle } = { visited: false, puzzle: {} };
  $: {  // make visited and puzzle variables reactive
    visited = data.visited;
    puzzle = data.puzzle;
  }
  let wizardMessage = '';
</script>


<div in:fade={{ duration: visited ? 0 : 2000, delay: visited ? 0 : 9000 }} class="space-y-8">
  <h1 class="text-9xl">
    🧙
  </h1>
  <p class="text-base">
    {puzzle.description}
  </p>
  <form
    method="POST"
    action="?/chat"
    use:enhance={() => {
      wizardMessage = '...';

      return async ({ result, update }) => {
        await update();

        if (result?.type !== 'success') {
          wizardMessage = '';
          return;
        }

        wizardMessage = result?.data?.message ?? '';
      }
    }}
  >
    <input
      name="message"
      type="text"
      autocomplete="off"
      placeholder="Ask a question"
      required
      class="border-2 border-sky-800 dark:border-sky-400 bg-transparent w-1/2 p-2 rounded-lg" />
  </form>
  <p>
    {wizardMessage}
  </p>
  <form
    method="POST"
    action="?/guess"
    use:enhance={() => {
      return async ({ result, update }) => {
        await update();

        if (result?.type === 'failure') {
          wizardMessage = 'That is incorrect.';
          return;
        } else if (result.type !== 'redirect') {
          return;
        }

        await applyAction(result);
      }
    }}
  >
    <input
      name="guess"
      type="text"
      autocomplete="off"
      placeholder="Guess the passcode"
      required
      class="border-2 border-sky-800 dark:border-sky-400 bg-transparent w-1/6 p-1 rounded-md" />
  </form>
</div>