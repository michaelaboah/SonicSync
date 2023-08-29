import { writable } from "svelte/store"
import type { Gear, Cable } from "$lib/@types/equipment"

export const cableList = writable<Cable[]>([
  {
    id: 0,
    name: "SM Page",
    description: "Stage Manager Page",
    bundle: { name: "Drums" }, 
    model: "XLR",
    length: 25,
    source: null,
    destination: { name: "PSM Comm Station", kind: "" },
  }
]);

export const gearList = writable<Gear[]>([
  {
    equipment: {
      id: "",
      category: "Console",
      model: "",
      cost: 6000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 0, description: "Primary", quantity: 0 },
      {id: 1, description: "Secondary", quantity: 0},
    ]
  },
]);
