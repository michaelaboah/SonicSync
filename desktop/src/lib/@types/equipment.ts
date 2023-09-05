import type { Analog, Category, ComputerConnKind, NetworkType, PowerConnector } from "./graphql"
import type { Bundle } from "./flow"

// How details of a singular Gear Item
export type Item = {
    id: number
    description: string
    quantity: number,
    purpose: string,
    publicNotes: string,
    privateNotes: string,
  }

export type Gear = {
    equipment: Equip
    items: Item[]
}

export type Equip = {
  _id: string,
  createdAt: string,
  updatedAt: string,
  cost: number,
  model: string,
  weight: number,
  wattage: number,
  manufacturer: string,
  dimensions: { length: number, width: number, height: number},
  notes: string,
  category: Category,
  details: any | null,
}


export type Cable = {
  id: number,
  name: string,
  description: string,
  // in reference to the bundle name
  bundle: string | null, 
  cableKind: "Power" | "Analog" | "Digital"
  model: string,
  length: number,
  source: Connection | null,
  destination: Connection | null , // Same as Source
}


export type Connection = {
  name: string,
  kind: Analog | PowerConnector | NetworkType, 
}


