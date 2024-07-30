<script>
  // @ts-nocheck

  import fetchData from "../../lib/fetchData";
  import CariDosen from "../../components/CariDosen.svelte";
  import Loading from "../../components/Loading.svelte";
  import Error from "../../components/Error.svelte";

  let { prodi, tahun, dosens } = $props();

  let loading = $state(true);
  let salah = $state(false);

  let show = $state(false);
  let makuls = $state([]);
  let makul = $state([]);
  let jadwals = $state([]);
  let no = $state("");
  let kelas = $state("");
  let semester = $state("");
  let dosen1 = $state([]);
  let dosen2 = $state([]);
  let laporan = $state("");

  const kosong = {
    nidn: "",
    namal: "",
    nama: "",
  };

  async function loadMK() {
    loading = true;
    const data = await fetchData("GET", `/api/matakuliah/${prodi}/${tahun}`);
    if (data.status != false) {
    }
    makuls = data.data;

    // console.log(makuls);
    loading = false;
  }

  async function getMK(cari) {
    loading = true;
    kelas = "";
    dosen1 = kosong;
    dosen2 = kosong;
    laporan = "";
    makul = makuls.find((data) => data.kodemk == cari);

    semester = String(makul.smtr);
    const data = await fetchData(
      "GET",
      `/api/jadwal/matakuliah/${makul.kodemk}`
    );
    jadwals = data.data;
    // console.log(jadwals);
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    loading = false;
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

  async function daftar() {
    const kodemk = makul.kodemk;
    const nidn1 = dosen1.nidn;
    const nidn2 = dosen2.nidn;

    const data = {
      tahun: 2024,
      kodeMk: makul.kodemk,
      nidn1,
      nidn2,
      prodi,
      kelas,
      semester,
    };
    // console.log(data);
    const result = await fetchData("POST", `/api/jadwal/matakuliah/`, data);
    // console.log(result.data);
    await getMK(kodemk);
    if (result.status != true) laporan = "gagal mengeksekusi data";
  }

  function setMakul(dataMakul) {
    loading = true;
    dosen1 = dosens.find((data) => data.nidn == dataMakul.nidn1) ?? kosong;
    dosen2 = dosens.find((data) => data.nidn == dataMakul.nidn2) ?? kosong;

    semester = String(dataMakul.semester);
    kelas = dataMakul.kelas;
    loading = false;
  }

  async function hapus(id) {
    loading = true;
    // console.log(id);
    const result = await fetchData("DELETE", `/api/jadwal/`, { id });
    await getMK(makul.kodemk);
    loading = false;
  }
</script>

<Loading {loading} />
<Error {salah} />

<CariDosen {show} {tutup} {dosens} {setNidn} />

{#await loadMK() then MK}
  <div class="flex">
    <div class="w-[60%]">
      <div class="text-center">Kurikulum {prodi} tahun {tahun}</div>

      <div class="overflow-y-scroll h-[90vh]">
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
                    <button onclick={() => getMK(data.kodemk)}>edit</button>
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
              <table class="table-fixed w-full">
                <tbody>
                  <tr>
                    <td class="w-1/3"><b>Prodi</b></td>
                    <td class="pl-2">: {prodi}</td>
                  </tr>
                  <tr>
                    <td><b>Semester</b></td>
                    <td class="pl-2"
                      >:
                      <input type="radio" bind:group={semester} value="1" />1
                      <input type="radio" bind:group={semester} value="2" />2
                      <input
                        type="radio"
                        bind:group={semester}
                        id=""
                        value="3"
                      />3
                      <input type="radio" bind:group={semester} value="4" />4
                      <input type="radio" bind:group={semester} value="5" />5
                      <input type="radio" bind:group={semester} value="6" />6
                      <input
                        type="radio"
                        bind:group={semester}
                        id=""
                        value="7"
                      />7
                      <input
                        type="radio"
                        bind:group={semester}
                        id=""
                        value="8"
                      />8
                    </td>
                  </tr>
                  <tr>
                    <td><b>Kelas</b></td>
                    <td class="pl-2"
                      >:
                      <input type="radio" bind:group={kelas} value="A" />A
                      <input type="radio" bind:group={kelas} value="B" />B
                      <input type="radio" bind:group={kelas} value="C" />C
                      <input type="radio" bind:group={kelas} value="D" />D
                      <input type="radio" bind:group={kelas} value="E" />E
                      <input type="radio" bind:group={kelas} value="F" />F
                      <input type="radio" bind:group={kelas} value="G" />G
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onclick={() => cariDosen(1)}
                        class="bg-indigo-600 w-full rounded-md hover:bg-indigo-500"
                        ><b>Dosen I</b></button
                      >
                    </td>
                    <td class="pl-2">: {dosen1.namal}</td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onclick={() => cariDosen(2)}
                        class="bg-indigo-600 w-full rounded-md hover:bg-indigo-500"
                        ><b>Dosen II</b></button
                      >
                    </td>
                    <td class="pl-2">: {dosen2.namal}</td>
                  </tr>
                </tbody>
              </table>
              <div class="">
                <button
                  onclick={daftar}
                  class=" p-2 w-full mt-2 border-1 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-md hover:ring-1 text-white font-semibold"
                  >Daftar</button
                >
              </div>
              <div class="mt-1 text-center font- font-semibold text-slate-500">
                {laporan}
              </div>
            </div>
          </div>
        {/if}
      </div>
      <div>
        <div class="font-semibold">
          Daftar Pengampu {makul.namamk}, semester {makul.semester}, {makul.sks}
          SKS
        </div>
        <div class="">
          {#each jadwals as data, i}
            <div>
              <button
                onclick={() => setMakul(data)}
                class="hover:bg-blue-400 rounded-md my-1 w-[90%] text-left py-1 px-2"
                >Kelas {data.semester}
                {data.kelas} : {data.namal1}
                {data.namal2 ? ` | ${data.namal2}` : ""}
              </button>
              <button
                onclick={() => hapus(data.id)}
                class="bg-red-600 text-white py-1 px-2 rounded-md ml-1 hover:bg-red-400"
                h>X</button
              >
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/await}
