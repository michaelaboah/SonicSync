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
  id: String,
  createdAt: String,
  updatedAt: String,
  cost: number,
  model: String,
  weight: number,
  manafactuer: String,
  category: String,
  details: any,
}

