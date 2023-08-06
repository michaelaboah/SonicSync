import { writable } from "svelte/store"
import type { Gear } from "$lib/@types/equipment"

export const gearList = writable<Gear[]>([]);
