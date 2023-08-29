import { writable } from "svelte/store"
import type { Gear, Cable } from "$lib/@types/equipment"

export const cableList = writable<Cable[]>([
  {
    id: 0,
    name: "SM Page",
    description: "Stage Manager Page",
    bundle: null, 
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
      // {description: ""}
    ]
  },
  {
    equipment: {
      id: "",
      category: "Speakers",
      model: "X40-Ultra",
      manufactuer: "Meyer",
      cost: 2000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 0, description: "Left", quantity: 0},
      {id: 1, description: "Right", quantity: 0},
      // {description: ""}
    ]
  },
  {
    equipment: {
      id: "s",
      category: "Speakers",
      model: "SD9",
      manufactuer: "Digico",
      cost: 2000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 2, description: "Beyond", quantity: 0},
      {id: 3, description: "Right", quantity: 0},
      // {description: ""}
    ]
  },
  {
    equipment: {
      id: "s",
      category: "Processor",
      model: "816",
      manufactuer: "Meyer",
      cost: 2000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 2, description: "Beyond", quantity: 0},
      {id: 3, description: "Right", quantity: 0},
      // {description: ""}
    ]
  },
]);
