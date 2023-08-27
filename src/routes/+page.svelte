<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Chat from './Chat.svelte';
  import NameForm from './NameForm.svelte';

  export let data;

  let { visited, name } = data;
  let ready = visited;
  onMount(() => ready = true);
</script>

<div class="text-center flex flex-col space-y-4 mt-6">
  {#if ready}
    <h1 in:fly={{ x: -50, duration: visited ? 0 : 2000, delay: 0 }} class="text-3xl">They have arrived</h1>
    <h1 in:fly={{ x: -50, duration: visited ? 0 : 1000, delay: visited ? 0 : 1000 }} class="text-xl">The AI Whisperer is here!</h1>
    <h1 in:fly={{ x: -50, duration: visited ? 0 : 2000, delay: visited ? 0 : 2000 }} class="text-4xl text-red-500">We need your help</h1>
    <h1 in:fly={{ x: -50, duration: visited ? 0 : 2000, delay: visited ? 0 : 4000 }} class="text-xl">The evil AI wizard Maldrak has taken our treasure, and only you can defeat him and retrieve the treasure</h1>
    <h1 in:fly={{ x: -50, duration: visited ? 0 : 2000, delay: visited ? 0 : 7000 }} class="text-xl">Tell us, AI Whisperer, what is your name?</h1>
    <NameForm data={data} bind:name />
    {#if name}
      <h1 in:fly={{ x: -50, duration: visited ? 0 : 1000 }} class="text-2xl">Good luck, he is below</h1>
      <Chat data={data} />
    {/if}
  {/if}
</div>
