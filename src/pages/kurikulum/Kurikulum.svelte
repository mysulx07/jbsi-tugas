<script>
  // @ts-nocheck
  import { Link } from "svelte-routing";

  let { kurikulums = [] } = $props();
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
