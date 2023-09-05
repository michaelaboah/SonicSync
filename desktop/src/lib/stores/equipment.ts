import { writable } from "svelte/store"
import type { Gear, Cable } from "$lib/@types/equipment"
import { Analog, Category } from "$lib/@types/graphql";

export const cableList = writable<Cable[]>([
  {
    id: 0,
    name: "Stage Mic",
    description: "Lead Vox",
    bundle: null, 
    model: "XLR",
    cableKind: "Analog",
    length: 25,
    source: null,
    destination: null,
  }
]);

export const gearList = writable<Gear[]>([
  {
    equipment: {
      _id: "",
      category: Category.Console,
      model: "",
      cost: 6000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      { id: 0, description: "Primary", quantity: 0, purpose: "" },
    ]
  },
]);
