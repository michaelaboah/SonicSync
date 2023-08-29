import type { Cable, Gear } from "./equipment"

export type ProductionInformation = {
    productionName: string
    director: string
    venue: string
    // showImage?: string 
    // designerStamp?: string
    notes?: string
}

export type AudioTeam = {
  designer: {name: string, email: string, phone: string},
  associateDesigner?: {name: string, email: string, phone: string},
  asstDesigner?: {name: string, email: string, phone: string}, 
  prodSound?: {name: string, email: string, phone: string}, 
  asstProdSound?: {name: string, email: string, phone: string}, 
  audio1?: {name: string, email: string, phone: string}, 
  audio2?: {name: string, email: string, phone: string},
  notes?: string
}


export type Input = {
    channel: number | null;
    input_description: string | null;
    input_device: string | null;
    note: string | null;
}

export type Output = {
    channel: number | null;
    output_name: string | null;
    output_device: string | null;
    destination: string | null;
}

export type IO = {
    inputs: Input[];
    outputs: Output[];
};

export type Project = {
  prodInfo: ProductionInformation
  audioTeam: AudioTeam
  ioList: IO
  gearList: Gear[]
  cableList: Cable[]
  meta: Meta
}

export type Meta = {
  currentFilePath: string,
}
