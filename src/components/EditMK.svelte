<script>
  // @ts-nocheck

  import { fade } from "svelte/transition";

  let { jadwal, dosens, editmk = false, loadJadwal } = $props();
</script>

{#if editmk}
  <main
    transition:fade
    class="w-screen h-screen fixed top-0 left-0 bg-green-200/50 backdrop-blur flex justify-center z-10"
  >
    <div class="w-[60%] mt-12 bg-white rounded-lg p-5">
      <div><button onclick={loadJadwal}>Tutup</button></div>
      <div>Ganti Dosen Pengampu</div>
      <div>{jadwal.namamk}</div>
      <div>{jadwal.namal1}</div>
      <div>{jadwal.namal2}</div>
    </div>
  </main>
{/if}
