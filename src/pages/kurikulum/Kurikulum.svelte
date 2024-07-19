<script>
  import { onMount } from "svelte";
  import fetchData from "../../lib/fetchData";
  import { Link } from "svelte-routing";

  let kurikulums = [];

  onMount(async () => {
    const data = await fetchData("GET", "/api/matakuliah/kurikulum");
    kurikulums = data.data;
  });
</script>

<div class="">
  {#each kurikulums as kurikulum, i}
    <div>
      <Link to="kurikulum/daftar/{kurikulum.prodi}/{kurikulum.kurikulum}">
        Kurikulum Prodi <b>{kurikulum.prodi}</b> tahun
        <b>{kurikulum.kurikulum}</b></Link
      >
    </div>
  {/each}
</div>
