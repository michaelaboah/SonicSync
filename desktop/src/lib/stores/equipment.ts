import { writable } from "svelte/store"
import type { Gear } from "$lib/@types/equipment"

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
      {id: 0, description: "Primary"},
      {id: 1, description: "Secondary"},
      // {description: ""}
    ]
  },
  {
    equipment: {
      id: "",
      category: "Speakers",
      model: "X40-Ultra",
      manafactuer: "Meyer",
      cost: 2000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 0, description: "Left"},
      {id: 1, description: "Right"},
      // {description: ""}
    ]
  },
  {
    equipment: {
      id: "s",
      category: "Speakers",
      model: "SD9",
      manafactuer: "Digico",
      cost: 2000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 2, description: "Beyond"},
      {id: 3, description: "Right"},
      // {description: ""}
    ]
  },
  {
    equipment: {
      id: "s",
      category: "Processor",
      model: "816",
      manafactuer: "Meyer",
      cost: 2000,
      wattage: 15.3,
      details: {} 
    },  
    items: [
      {id: 2, description: "Beyond"},
      {id: 3, description: "Right"},
      // {description: ""}
    ]
  },
]);
