export type Item = {
    id: number
    description: string
    quantity: number,
    purpose: string,
    publicNotes: string,
    privateNotes: string,
  }

export type Equip = {
    category: string,
    model: string,
    cost: number,
    wattage: number,
    items: Item[]
  }

