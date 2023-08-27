<script>
  import { invalidateAll } from "$app/navigation";

	export let data;

  $: sortedLeaderboard = Object.entries(data.leaderboard).sort((a, b) => {
    if (a[1].level === b[1].level) {
      return a[1].time - b[1].time;
    }
    return b[1].level - a[1].level;
  });
</script>

<div class="text-center flex flex-col space-y-12 mt-6 items-center">
  <h1 class="text-6xl">
    Leaderboard
  </h1>
  <div class="w-7/12 relative">
    <div class="absolute top-3 right-[-48pt] cursor-pointer" on:click={() => invalidateAll()} on:keypress={() => invalidateAll()} role="button" tabindex="0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </div>
    {#each sortedLeaderboard as [name, info], i}
      <div class="flex flex-row justify-between p-4 {i % 2 === 0 ? 'bg-slate-400 dark:bg-slate-700' : 'bg-slate-300 dark:bg-slate-800'}">
        <p class="text-4xl">{name}</p>
        <p class="text-4xl">{info.level}</p>
      </div>
    {/each}
  </div>
</div>
