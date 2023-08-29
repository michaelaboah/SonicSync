export type Preferences = {
  ui: UI,
  cloud: Cloud | null,
  database: DBStorage | null,
  general: GeneralPrefs
}



export let DEFAULT: Preferences = {
  ui: { sidebar: true, darkMode: true },
  cloud: {rememberMe: false },
  database: {autoStore: true, dataSeachMode: true},
  general: {autoSaveTimer: 1000 * 60 }
}

export type UI = {
  // Major Sidebar open == true
  sidebar: boolean,
  // Skeleton UI store
  darkMode: boolean,
}

type Cloud = {
  rememberMe: boolean,
  // credentials: { email: string; password: string },
}

type DBStorage = {
  dataSeachMode: boolean,
  autoStore: boolean,
}

type GeneralPrefs = {
  autoSaveTimer: number,
}
