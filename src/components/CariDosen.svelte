<script>
  // @ts-nocheck
  let {
    show = true,
    tutup = () => (show = false),
    dosens = [],
    setNidn,
  } = $props();

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
      class="absolute m-3 rounded-2xl shadow-lg border w-full lg:w-1/2 bg-white top-[200px] p-5 flex flex-col"
    >
      <div class="flex">
        <input
          type="text"
          bind:value={nama}
          onkeyup={cariDosen}
          class="ring-1"
        />
      </div>
      <div>
        {#each dosen as data, i}
          <div>
            <button
              onclick={() => setNidn(data)}
              class="w-full py-1 my-1 rounded-sm bg-sky-200 hover:bg-sky-500"
              >{data.namal}</button
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
