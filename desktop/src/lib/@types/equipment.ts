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
  id: string,
  createdAt: string,
  updatedAt: string,
  cost: number,
  model: string,
  weight: number,
  wattage: number,
  manufactuer: string,
  category: string,
  details: any,
}


export type Cable = {
  id: number,
  name: string,
  description: string,
  bundle: Bundle | null,
  model: string,
  length: number,
  source: Connection | null,
  destination: Connection , // Same as Source
}

type Bundle = {
  name: string,
}

type Connection = {
  name: string,
  kind: string, 
}


