<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import fetchData from "../../lib/fetchData";
  import CariDosen from "../../components/CariDosen.svelte";

  let show = $state(false);
  let makuls = $state([]);
  let makul = $state([]);
  let jadwals = $state([]);
  let no = $state("");
  let kelas = $state("");
  let dosen1 = $state([]);
  let dosen2 = $state([]);

  let { prodi, tahun, dosens } = $props();
  onMount(async () => {
    const data = await fetchData("GET", `/api/matakuliah/${prodi}/${tahun}`);
    makuls = data.data;
    // console.log(makul);
  });

  async function getMK(cari) {
    makul = makuls.find((data) => data.kodemk == cari);
    const data = await fetchData(
      "GET",
      `/api/jadwal/matakuliah/${makul.kodemk}`
    );
    jadwals = data.data;
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function cariDosen(dosen) {
    no = dosen;
    show = true;
  }

  function setNidn(data) {
    if (no == 1) {
      dosen1 = data;
    } else {
      dosen2 = data;
    }
    show = false;
  }

  function tutup() {
    if (event.target == event.currentTarget) show = false;
  }
</script>

<CariDosen {show} {tutup} {dosens} {setNidn} />

<div class="flex">
  <div class="w-[60%]">
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
    <div class="border-2 p-2">
      <div class="font-semibold text-lg">Set Pengampu Mata Kuliah</div>
      {#if Object.keys(makul).length > 0}
        <div>
          <div class="font-bold">
            {makul.namamk} ({makul.kodemk})
          </div>
          <div class="">
            SKS : {makul.sks}, Semester {makul.smtr}
          </div>
          <div class="my-2">
            <table>
              <tbody>
                <tr>
                  <td>kelas</td>
                  <td class="pl-2"
                    >: <input
                      type="text"
                      bind:value={kelas}
                      id=""
                      class="ring-1 px-2 py-1 rounded-md active:ring-blue-500 outline-none"
                    /></td
                  >
                </tr>
                <tr>
                  <td><button onclick={() => cariDosen(1)}>Dosen I</button></td>
                  <td class="pl-2">: {dosen1.namal}</td>
                </tr>
                <tr>
                  <td><button onclick={() => cariDosen(2)}>Dosen II</button></td
                  >
                  <td class="pl-2">: {dosen2.namal}</td>
                </tr>
              </tbody>
            </table>
            <div class="">
              <button
                class=" p-2 w-full border-1 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-md hover:ring-1 text-white font-semibold"
                >Daftar</button
              >
            </div>
          </div>
        </div>
      {/if}
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
