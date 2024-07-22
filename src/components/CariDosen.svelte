<script>
  // @ts-nocheck
  let { show = true, tutup = () => (show = false), nidn, cariDosen } = $props();
</script>

{#if show}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed left-0 top-0 bg-slate-300/50 backdrop-blur z-50 flex justify-center w-screen h-screen"
    onclick={tutup}
  >
    <div
      class="absolute m-3 rounded-2xl shadow-lg border w-full lg:w-1/2 bg-white top-[200px] p-5 flex flex-col"
    >
      <div class="flex"></div>
      <div class="flex">
        <input type="text" name="" bind:value={nidn} id="" />
        <button onclick={cariDosen}>pilih</button>
      </div>
    </div>
  </div>
{/if}
