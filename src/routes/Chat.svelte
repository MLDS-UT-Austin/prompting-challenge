<script>
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';

  export let data;

  let { visited, puzzle } = data;
</script>


<div in:fade={{ duration: visited ? 0 : 2000, delay: visited ? 0 : 9000 }} class="space-y-8">
  <h1 class="text-9xl">
    🧙
  </h1>
  <p class="text-base">
    {puzzle.description}
  </p>
  <form method="POST" action="?/chat" use:enhance>
    <input
      name="message"
      type="text"
      autocomplete="off"
      required
      class="border-2 border-sky-800 dark:border-sky-400 bg-transparent w-1/2 p-2 rounded-lg" />
  </form>
</div>