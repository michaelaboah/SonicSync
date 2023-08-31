import type { Bundle } from "$lib/@types/flow";
import { writable } from "svelte/store";

export const bundleList = writable<Bundle[]>([{
  name: "Drums",
  cableIds: new Set() 
}])
