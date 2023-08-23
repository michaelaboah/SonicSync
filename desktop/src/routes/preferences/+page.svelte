<script lang="ts">
	import { LightSwitch, modeCurrent } from "@skeletonlabs/skeleton";


</script>

<section class="p-4">
  <h2 class="h2">User Settings</h2>
    <hr class="w-5/6 mt-4 mb-2"/>



  <h2 class="h2">Appearance Settings</h2>
    <hr class="w-5/6 mt-4 mb-2"/>
  <div class="flex flex-row">
    <h4 class="h4"><strong>Theme: </strong></h4>
    <LightSwitch class="mx-8"/> 
    {$modeCurrent}
  </div>

</section>
