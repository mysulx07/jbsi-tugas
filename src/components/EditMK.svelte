<script>
  // @ts-nocheck

  import { fade } from "svelte/transition";

  import fetchData from "../lib/fetchData";
  import CariDosen from "./CariDosen.svelte";
  import Loading from "./Loading.svelte";

  let { jadwal, dosens, editmk = false, loadJadwal, tutupedit } = $props();

  let dosen1 = $state([]);
  let dosen2 = $state([]);
  let no = $state(1);

  let show = $state(false);

  let smtr = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VII"];

  export function init() {
    let cari = dosens.find((row) => row.nidn == jadwal.nidn1);
    dosen1 = cari ?? [{ nidn: "", namal: "" }];
    cari = dosens.find((row) => row.nidn == jadwal.nidn2);
    dosen2 = cari ?? [{ nidn: "", namal: "" }];
    // console.log([{ dosen1 }, { dosen2 }]);
  }

  function setNidn(data) {
    if (no == 1) {
      dosen1 = data;
    } else {
      dosen2 = data;
    }
    show = false;
  }

  function cariDosen(dosen) {
    no = dosen;
    show = true;
  }

  async function updateDosen() {
    const id = jadwal.id;
    const nidn1 = dosen1.nidn;
    const nidn2 = dosen2.nidn;

    const data = {
      id,
      nidn1,
      nidn2,
    };
    // console.log(data);
    const result = await fetchData("POST", `/api/jadwal/dosen/`, data);

    loadJadwal();
  }

  function tutup() {
    if (event.target == event.currentTarget) show = false;
  }
</script>

<CariDosen {show} {dosens} {setNidn} {tutup} />
{#if editmk}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <main
    onclick={tutupedit}
    transition:fade
    class="w-screen h-screen fixed top-0 left-0 bg-green-200/50 backdrop-blur flex justify-center items-center z-20"
  >
    <div class="w-[50%] h-[50%] bg-white rounded-lg p-5">
      <div class="w-full flex justify-end p-5">
        <button
          onclick={tutupedit}
          class="bg-red-600 px-3 rounded-full hover:bg-red-400 text-white font-bold"
          >X</button
        >
      </div>
      <div class="font-semibold text-lg text-center">Ganti Dosen Pengampu</div>

      <div class="w-full font-semibold text-lg mt-2">
        {jadwal.kodemk} - {jadwal.namamk}
      </div>
      <div class="font-semibold text-md mt-1">
        Kelas
        {jadwal.prodi}
        {smtr[jadwal.semester]}
        {jadwal.kelas}
      </div>
      <div class="mt-2">
        <button
          onclick={() => cariDosen(1)}
          class="w-[80%] flex flex-row text-left hover:bg-sky-300 pl-3 rounded-sm py-1"
        >
          <div class="w-[30%]">Dosen I</div>
          <div>{dosen1.namal}</div>
        </button>
        <button
          onclick={() => cariDosen(2)}
          class="w-[80%] flex flex-row text-left hover:bg-sky-300 pl-3 rounded-sm py-1"
        >
          <div class="w-[30%]">Dosen II</div>
          <div>{dosen2.namal}</div>
        </button>
      </div>
      <div class="flex w-full justify-center mt-3">
        <button
          class="p-3 bg-lime-600 hover:bg-lime-400 rounded-lg shadow-md w-[30%] font-semibold text-lg"
          onclick={updateDosen}>Simpan</button
        >
      </div>
    </div>
  </main>
{/if}
