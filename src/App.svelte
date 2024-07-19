<script>
  import { Router, Route } from "svelte-routing";
  import Nav from "./components/Nav.svelte";

  import Kurikulum from "./pages/kurikulum/Kurikulum.svelte";
</script>

<div>
  <Router basepath="/ampu">
    <Nav />
    <main class="container mx-auto p-2">
      <Route path="/">Home</Route>
      <Route path="/kurikulum"><Kurikulum /></Route>
      <Route path="/kurikulum/daftar/:prodi/:tahun" let:params
        >daftar Mata kuliah kurikulum prodi {params.prodi} tahun {params.tahun}</Route
      >
      <Route path="/prodi">prodi</Route>
      <Route path="/daftar">daftar</Route>
    </main>
  </Router>
</div>
