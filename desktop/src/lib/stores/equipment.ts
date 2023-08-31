import { writable } from "svelte/store"
import type { Gear, Cable } from "$lib/@types/equipment"
import { Category } from "$lib/@types/graphql";

export const cableList = writable<Cable[]>([
  {
    id: 0,
    name: "Stage Mic",
    description: "Lead Vox",
    bundle: null, 
    model: "XLR",
    cableKind: "ANALOG",
    length: 25,
    source: { name: "SM 58", kind: "XLR_ANALOG"},
    destination: { name: "QL5", kind: "XLR_ANALOG" },
  }
]);

export const gearList = writable<Gear[]>([
  {
    equipment: {
      id: "",
      category: Category.Console,
      model: "",
      cost: 6000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 0, description: "Primary", quantity: 0 },
      // {id: 1, description: "Secondary", quantity: 0},
    ]
  },
]);
