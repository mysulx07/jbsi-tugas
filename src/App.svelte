<script>
  import { Router, Route } from "svelte-routing";

  import fetchData from "./lib/fetchData";
  import Nav from "./components/Nav.svelte";

  import Kurikulum from "./pages/kurikulum/Kurikulum.svelte";
  import Daftar from "./pages/kurikulum/Daftar.svelte";
  import { onMount } from "svelte";

  let kurikulums;
  let dosens;
  onMount(async () => {
    let data = await fetchData("GET", "/api/matakuliah/kurikulum");
    kurikulums = data.data;
    data = await fetchData("GET", "/api/dosen");
    dosens = data.data;
  });
</script>

<div>
  <Router basepath="/ampu">
    <Nav />
    <main class="container mx-auto p-2">
      <Route path="/">Home</Route>
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
</div>
