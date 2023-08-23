export type Preferences = {
  ui: UI,
  cloud: Cloud | null,
  database: DBStorage | null,
}

export let DEFAULT: Preferences = {
  ui: { sidebar: true, darkMode: true },
  cloud: {rememberMe: false },
  database: {autoStore: true, dataSeachMode: true}
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

