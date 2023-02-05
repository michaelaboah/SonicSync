import type { SvelteUISize } from '@svelteuidev/core';
import type { Item as ItemGraphql } from './generated/graphql';

export interface Box {
    id: number;
    name: number;
    length: number;
    width: number;
    height: number;
}
export const buildBox = (currentBox?: Box) => ({ ...currentBox } as Box);

export interface Item {
    itemId: number;
    description: string;
    itemQuantity: number;
    publicNotes?: string;
    privateNotes?: string;
    box?: Box;
}

export const buildItem = (currentItem?: Item): Item =>
    currentItem ? { ...currentItem, itemQuantity: 1 } : ({} as Item);

export type Gear = ItemGraphql & { items: Item[]; gearId: number; quantity: number };

export const buildGear = (currentGear: Gear) => ({ ...currentGear, items: [buildItem()] } as Gear);

export interface ProductionInformation {
    productionName: string;
    designer: string;
    designerPhone: string;
    designerEmail: string;
    associate: [string, boolean];
    assistant: [string, boolean];
    productionSound: [string, boolean];
    asstProdSound: [string, boolean];
    audio2: [string, boolean];
    audio1: [string, boolean];
    showImage: string | undefined;
    designerStamp: string | undefined;
}

export const buildProdInfo = (productionInfo?: ProductionInformation): ProductionInformation =>
    ({ ...productionInfo } as ProductionInformation);

export interface Project {
    productionInformation: ProductionInformation;
    gearList: Gear[];
    ioList: IO;
}

export const createProject = (project?: Project): Project => ({ ...project } as Project);

export interface UserPreferences {
    darkMode: boolean;
    rememberMe: boolean;
    sql_auto_store: boolean;
    credentials: { email: string; password: string };
    ui_font_size: SvelteUISize;
    fontSize: number[];
}

export interface Input {
    channel: number | null;
    input_description: string | null;
    input_device: string | null;
    note: string | null;
}

export interface Output {
    channel: number | null;
    output_name: string | null;
    output_device: string | null;
    destination: string | null;
}

export type IO = {
    input_list: Input[];
    output_list: Output[];
};
