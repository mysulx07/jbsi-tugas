<script>
  import { Router, Route } from "svelte-routing";

  import fetchData from "./lib/fetchData";
  import Nav from "./components/Nav.svelte";

  import Kurikulum from "./pages/kurikulum/Kurikulum.svelte";
  import Daftar from "./pages/kurikulum/Daftar.svelte";
  import Loading from "./components/Loading.svelte";
  import Home from "./pages/Home.svelte";
  import Error from "./components/Error.svelte";

  let loading = $state(true);
  let salah = $state(false);
  let laporan = $state("error");

  let kurikulums = $state([]);
  let dosens = $state([]);
  // let jadwals = $state([]);

  async function loadKurikulum() {
    loading = true;
    let data = await fetchData("GET", "/api/matakuliah/kurikulum");
    if (data.status == false) {
      salah = true;
      laporan = "Gagal meload data kurikulum";
      console.log(laporan);
    }
    kurikulums = data.data;

    data = await fetchData("GET", "/api/dosen");
    if (data.status == false) {
      salah = true;
      laporan = "Gagal meload data dosen";
      console.log(laporan);
    }
    dosens = data.data;

    // data = await fetchData("GET", "/api/jadwal");
    // if (data.status == false) {
    //   salah = true;
    //   laporan = "Gagal meload data jadwal";
    //   console.log(laporan);
    // }
    // jadwals = data.data;

    // console.log({ kurikulums }, { dosens }, { jadwals });
    loading = false;
  }
</script>

<div>
  <Error {salah} pesan={laporan} />
  <Loading {loading} />

  {#await loadKurikulum() then data}
    <Router basepath="/tugas">
      <Nav />
      <main class="container mx-auto p-2">
        <Route path="/"><Home {dosens} /></Route>
        <Route path="/kurikulum"><Kurikulum {kurikulums} /></Route>
        <Route path="/kurikulum/daftar/:prodi/:tahun" let:params
          ><Daftar prodi={params.prodi} tahun={params.tahun} {dosens} /></Route
        >
        <Route path="/pbsi">PBSI</Route>
        <Route path="/bsi">BSI</Route>
        <Route path="/pbsd">PBSD</Route>
        <Route path="/login">login</Route>
      </main>
    </Router>
  {/await}
</div>
