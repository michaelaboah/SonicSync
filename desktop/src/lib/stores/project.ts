import { derived, writable, type Writable } from 'svelte/store';
import type {
    Meta,
    AudioTeam,
    IO,
    ProductionInformation,
    Project,
} from '$lib/@types/project';
import type { Gear, Cable } from "$lib/@types/equipment"
import { gearList, cableList } from '$lib/stores/equipment'



export const ioList = writable<IO>({
    inputs: [],
    outputs: [],
});

export const audioTeam = writable<AudioTeam>()
export const prodInfo = writable<ProductionInformation>({
  productionName: "",
  venue: "",
  notes: "",
  director: "",
});

export const meta = writable<Meta>()

export const project = derived<[Writable<ProductionInformation>, Writable<Gear[]>, Writable<IO>, Writable<AudioTeam>, Writable<Cable[]>, Writable<Meta>], Project>(
    [prodInfo, gearList, ioList, audioTeam, cableList, meta],
    ([$prodInfo, $gearList, $ioList, $audioTeam, $cableList, $meta]) => {
        return { 
          prodInfo: $prodInfo, 
          gearList: $gearList, 
          ioList: $ioList, 
          audioTeam: $audioTeam, 
          cableList: $cableList, 
          meta: $meta 
        } as Project;
    }
);

export function loadProject(project: Project) {
    prodInfo.set(project.prodInfo);
    ioList.set(project.ioList);
    audioTeam.set(project.audioTeam);
    gearList.set(project.gearList);
    cableList.set(project.cableList)
    meta.set(project.meta)
};
