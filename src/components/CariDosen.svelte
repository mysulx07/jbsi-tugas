<script>
  // @ts-nocheck
  let { show = true, dosens = [], setNidn, tutup } = $props();

  let dosen = $state("");
  let nama = $state("");

  function cariDosen() {
    dosen = [];
    if (nama == "") return;
    const rex = new RegExp(`${nama}`, "gi");
    dosen = dosens.filter((data) => data.nama.match(rex));
  }
</script>

{#if show}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed left-0 top-0 bg-slate-300/50 backdrop-blur z-50 flex justify-center w-screen h-screen"
    onclick={tutup}
  >
    <div
      class="absolute m-3 rounded-2xl shadow-lg border w-full lg:w-1/3 bg-white top-[100px] p-5 flex flex-col"
    >
      <div class="flex">
        <input
          type="text"
          bind:value={nama}
          onkeyup={cariDosen}
          class=" w-3/4 ring-1 rounded-sm outline-none py-1 px-2"
        />
        <button
          onclick={() => setNidn("")}
          class=" bg-red-500 rounded-xl w-1/3 mx-3">X</button
        >
      </div>
      <div class="mt-3">
        {#each dosen as data, i}
          <div>
            <button
              onclick={() => setNidn(data)}
              class="w-full py-1 my-1 rounded-md bg-sky-200 hover:bg-sky-500"
              >{data.namal}</button
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
