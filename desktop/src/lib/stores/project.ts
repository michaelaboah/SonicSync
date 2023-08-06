import { derived, writable, type Writable } from 'svelte/store';
import type {
     AudioTeam,
     IO,
     ProductionInformation,
     Project,
} from '$lib/@types/project';
import { gearList } from '$lib/stores/equipment'



export const ioList = writable<IO>({
    inputs: [],
    outputs: [],
});

export const audioTeam = writable<AudioTeam>()
export const prodInfo = writable<ProductionInformation>();

export const project = derived<[Writable<ProductionInformation>, Writable<Object[]>, Writable<IO>, Writable<AudioTeam>], Project>(
    [prodInfo, gearList, ioList, audioTeam],
    ([$prodInfo, _$gearList, $ioList, $audioTeam]) => {
        return { prodInfo: $prodInfo, /*gearList: $gearList,*/ ioList: $ioList, audioTeam: $audioTeam } as Project;
    }
);

export const loadProject = (project: Project) => {
    // gearList.set(project.gearList);
    prodInfo.set(project.prodInfo);
    ioList.set(project.ioList);
    audioTeam.set(project.audioTeam);
};
