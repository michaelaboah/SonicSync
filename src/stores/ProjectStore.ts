import { derived, writable, type Writable } from 'svelte/store';
import {
  buildGear,
  buildProdInfo,
  type Gear,
  type Input,
  type IO,
  type Output,
  type ProductionInformation,
  type Project,
} from '../Classes';

export const accessToken = writable('');

export const currentFile = writable<string>('');

export const gearList = writable<Gear[]>([buildGear({ gearId: 0 } as Gear)]);

export const input_test: Input[] = [
  { channel: 1, input_device: 'Reby Primary', input_description: 'ULDXQ4 Wireless 1', note: null },
  { channel: 2, input_device: 'Reby Secondary', input_description: 'ULDXQ4 Wireless 2', note: null },
  { channel: 3, input_device: 'Devyn Primary', input_description: 'ULDXQ4 Wireless 3', note: null },
  { channel: 4, input_device: 'Devyn Spare', input_description: 'ULDXQ4 Wireless 4', note: null },
  { channel: 5, input_device: 'Ruthie', input_description: 'ULDXQ4 Wireless 5', note: null },
  { channel: 6, input_device: 'Mickey', input_description: 'ULDXQ4 Wireless 6', note: null },
  { channel: 7, input_device: 'Mel', input_description: 'ULDXQ4 Wireless 7', note: null },
  { channel: 8, input_device: 'Jade', input_description: 'ULDXQ4 Wireless 8', note: null },
  { channel: 9, input_device: 'Steph', input_description: 'ULDXQ4 Wireless 9', note: null },
  { channel: 10, input_device: 'Taylor', input_description: 'ULDXQ4 Wireless 10', note: null },
  { channel: 11, input_device: 'Kyle', input_description: 'ULDXQ4 Wireless 11', note: null },
  { channel: 12, input_device: 'Bryce', input_description: 'ULDXQ4 Wireless 12', note: null },
  { channel: 13, input_device: 'Hannah', input_description: 'ULDXQ4 Wireless 13', note: null },
  { channel: 14, input_device: 'Ariel', input_description: 'ULDXQ4 Wireless 14', note: null },
  { channel: 15, input_device: 'Overhead L', input_description: 'K-Micro Silver Bullet', note: null },
  { channel: 16, input_device: 'Overhead R', input_description: 'K-Micro Silver Bullet', note: null },
  { channel: 17, input_device: 'Snare Top', input_description: 'Audix ADX-90', note: null },
  { channel: 18, input_device: 'Snare Bottom', input_description: 'Audix ADX-90', note: null },
  { channel: 19, input_device: 'Kick', input_description: 'Shure SM52', note: null },
  { channel: 20, input_device: 'Tom 1', input_description: 'TBD', note: null },
  { channel: 21, input_device: 'Tom 2', input_description: 'TBD', note: null },
  { channel: 22, input_device: 'Piano 1', input_description: 'Direct', note: null },
  { channel: 23, input_device: 'Piano 2', input_description: 'Direct', note: null },
  { channel: 24, input_device: 'Guitar', input_description: 'DI', note: null },
  { channel: 25, input_device: 'Keytar', input_description: 'DI', note: null },
  { channel: 26, input_device: 'VoG', input_description: 'Sennheiser ew100', note: null },
  { channel: 27, input_device: 'Stage Mic', input_description: 'Sennheiser ew100', note: null },
  { channel: 28, input_device: 'VoD', input_description: 'Comm Box', note: null },
  { channel: 29, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 30, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 31, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 32, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 33, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 34, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 35, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 36, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 37, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 38, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 39, input_device: 'Ableton', input_description: 'DVS (QLab Secondary)', note: null },
  { channel: 40, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 41, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 42, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 43, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 44, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 45, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 46, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 47, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 48, input_device: 'QLab', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 49, input_device: 'Vox S', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 50, input_device: 'Vox L', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 51, input_device: 'Band S', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 52, input_device: 'Band L', input_description: 'DVS (QLab Primary)', note: null },
  { channel: 53, input_device: '', input_description: '', note: null },
  { channel: 54, input_device: '', input_description: '', note: null },
  { channel: 55, input_device: '', input_description: '', note: null },
  { channel: 56, input_device: '', input_description: '', note: null },
  { channel: 57, input_device: '', input_description: '', note: null },
  { channel: 58, input_device: '', input_description: '', note: null },
  { channel: 59, input_device: '', input_description: '', note: null },
  { channel: 60, input_device: '', input_description: '', note: null },
  { channel: 61, input_device: '', input_description: '', note: null },
  { channel: 62, input_device: '', input_description: '', note: null },
  { channel: 63, input_device: '', input_description: '', note: null },
  { channel: 64, input_device: '', input_description: '', note: null },
];

export const output_test: Output[] = [{ channel: 1, output_device: 'SD 9', destination: 'Galaxy' }];
export const ioList = writable<IO>({
  input_list: input_test,
  output_list: output_test,
});

export const prodInfo = writable<ProductionInformation>(buildProdInfo());

export const project = derived<[Writable<ProductionInformation>, Writable<Gear[]>, Writable<IO>], Project>(
  [prodInfo, gearList, ioList],
  ([$prodInfo, $gearList, $ioList]) => {
    return { productionInformation: $prodInfo, gearList: $gearList, ioList: $ioList } as Project;
  }
);

export const loadProject = (project: Project) => {
  gearList.set(project.gearList);
  prodInfo.set(project.productionInformation);
  ioList.set(project.ioList);
};
