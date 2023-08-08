<script>
  import "../app.css";
  import Header from "./Header.svelte";
</script>

<div class="flex flex-col h-screen">
  <Header />
  <div class="grow bg-sky-100 dark:bg-slate-900 dark:text-white">
    <slot />
  </div>
</div>