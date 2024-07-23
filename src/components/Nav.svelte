<script>
  import { Link } from "svelte-routing";
  import Logo from "../assets/LOGO v3.png";
</script>

<div class="bg-sky-300 w-screen p-2">
  <div class="container mx-auto flex justify-between flex-row items-center">
    <div class="w-[50px] h-[50px]">
      <img src={Logo} alt="Logo" srcset="" class="rounded-full shadow" />
    </div>
    <nav class="flex flex-row gap-3">
      <Link to=".">Ampu</Link>
      <Link to="pbsi">PBSI</Link>
      <Link to="bsi">BSI</Link>
      <Link to="pbsd">PBSD</Link>
      <Link to="kurikulum">Kurikulum</Link>
      <Link to="login">login</Link>
    </nav>
  </div>
</div>
