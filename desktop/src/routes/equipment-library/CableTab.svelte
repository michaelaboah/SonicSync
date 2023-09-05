<script lang="ts">
	import type { Equip } from "$lib/@types/equipment";
	import { invoke } from "@tauri-apps/api/tauri";


  // async function getEquipment(): Promise<Equip[]> {
  //   const response = invoke<Equip[]>("get_all_items");
  //   console.log(response);
  //   return response
  // }


</script>


<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-compact">
		<thead>
			<tr>
				<th>Model</th>
				<th>Category</th>
				<th>Manufacturer</th>
				<th>Weight</th>
				<th>Dimensions</th>
				<th>Notes</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody >
   <!--    {#await getEquipment()} -->
   <!--      Fetching  -->
   <!--    {:then items }  -->
   <!--        -->
			<!-- {#each items as row, i} -->
			<!-- 	<tr> -->
			<!-- 		<td>{row.model}</td> -->
			<!-- 		<td>{row.category}</td> -->
			<!-- 		<td>{row.manufacturer}</td> -->
			<!-- 		<td>{row.weight}</td> -->
			<!-- 		<td>{row.dimensions.length}</td> -->
			<!-- 		<td>{row.notes}</td> -->
			<!-- 	</tr> -->
			<!-- {/each} -->
			<!---->
			<!---->
   <!--    {/await} -->
		</tbody>
		<tfoot>
			<tr>
				<th colspan="3">Total: </th>
				<!-- <td>{totalWeight}</td> -->
			</tr>
		</tfoot>
	</table>
</div>

