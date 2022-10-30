import { derived, writable, type Writable } from "svelte/store";
import { buildGear, buildProdInfo, type Gear, type ProductionInformation, type Project } from "../Classes";

export const accessToken = writable("");

export const gearList = writable<Gear[]>([buildGear({ gearId: 0 } as Gear)]);

export const currentFile = writable<string>("");

// export const projectList = writable<Project>({} as Project);

export const prodInfo = writable<ProductionInformation>(buildProdInfo());

export const project = derived<[Writable<ProductionInformation>, Writable<Gear[]>], Project>(
  [prodInfo, gearList],
  ([$prodInfo, $gearList]) => {
    return { productionInformation: $prodInfo, gearList: $gearList } as Project;
  }
);

export const loadProject = (project: Project) => {
  gearList.set(project.gearList);
  prodInfo.set(project.productionInformation);
};
