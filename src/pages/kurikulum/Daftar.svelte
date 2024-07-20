<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import fetchData from "../../lib/fetchData";

  let top;
  let makuls = $state([]);
  let makul = $state([]);
  let jadwals = $state([]);
  let nidn = $state("");
  let kelas = $state("");

  let { prodi, tahun, dosens } = $props();
  onMount(async () => {
    const data = await fetchData("GET", `/api/matakuliah/${prodi}/${tahun}`);
    makuls = data.data;
    // console.log(makul);
  });

  async function getMK(cari) {
    // console.log(cari);
    makul = makuls.find((data) => data.kodemk == cari);

    const data = await fetchData(
      "GET",
      `/api/jadwal/matakuliah/${makul.kodemk}`
    );
    jadwals = data.data;
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // console.log(jadwals);
  }
</script>

<div class="flex">
  <div class="w-[60%]" bind:this={top}>
    Kurikulum {prodi} tahun {tahun}
    <div>
      <div class="p-2">
        <table
          class="border-collapse border border-slate-400 table-auto min-w-full"
        >
          <thead>
            <tr class="border-b border-slate-300 bg-slate-300 rounded">
              <th class="p-2">#</th>
              <th class="p-2">Kode MK</th>
              <th class="p-2">Nama MK</th>
              <th class="p-2">SKS</th>
              <th class="p-2">SMT</th>
              <th class="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {#each makuls as data, i}
              <tr class="border border-slate-300 hover:bg-gray-500">
                <td class="text-center p-2">{i + 1}</td>
                <td class="text-center p-2">{data.kodemk}</td>
                <td>{data.namamk}</td>
                <td class="text-center p-2">{data.sks}</td>
                <td class="text-center p-2">{data.smtr}</td>
                <td class="text-center p-2">
                  <button onclick={() => getMK(data.kodemk)}>daftar</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="w-[40%]">
    <div class="">
      <div class="">
        {makul.namamk}
      </div>
      <div class="">
        {makul.kodemk}
      </div>
      <div class="">
        {makul.sks}
      </div>
      <div class="">
        {makul.smtr}
      </div>
    </div>
    <div class="">
      Daftar Pengampu MK
      <div class="">
        {#each jadwals as data, i}
          <div>
            Kelas {data.kelas} : {data.namal}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
