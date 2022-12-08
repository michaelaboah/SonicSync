import client from '../apollo/apolloClient';
import type {
  ApolloQueryResult,
  ObservableQuery,
  WatchQueryOptions,
  QueryOptions,
  MutationOptions,
} from '@apollo/client';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AmplifierInput = {
  max_sample_rate: SampleRate;
  midi: MidiType;
  network_connectivity: Array<NetworkConnectivty>;
  notes: Array<Scalars['String']>;
  physical_connectivity: Array<PhysicalConnectivty>;
  power: ElectricalInput;
  signal_protocol: Protocol;
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

export type AmplifierItem = {
  __typename?: 'AmplifierItem';
  id?: Maybe<Scalars['Int']>;
  max_sample_rate: SampleRate;
  midi?: Maybe<MidiType>;
  network_connectivity: Array<NetworkPort>;
  physical_connectivity: Array<PhysicalPort>;
  power?: Maybe<IElectrical>;
  signal_protocol: Protocol;
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

export type AmplifierItemTest = {
  id?: InputMaybe<Scalars['Int']>;
  max_sample_rate: SampleRate;
  midi?: InputMaybe<MidiType>;
  network_connectivity: Array<NetworkConnectivty>;
  physical_connectivity: Array<PhysicalConnectivty>;
  power?: InputMaybe<ElectricalInput>;
  signal_protocol: Protocol;
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

/** Common types of Analog or Copper based connections. *Note: Generally more robust than digital counterparts, but lacks flexibility. */
export enum Analog {
  /** Barrel Connector. Very basic found on lower power devices. Commonly used for recievers. */
  Dc_12V = 'DC_12V',
  DualPinPhoenix = 'DUAL_PIN_PHOENIX',
  Nl2 = 'NL2',
  Nl4 = 'NL4',
  Nl8 = 'NL8',
  TriPinPhoenix = 'TRI_PIN_PHOENIX',
  /** Tip-Ring-Ring-Sleeve Connection. Commonly used for mobile audio connections. *Note: Sleeve is ground. */
  Trrs = 'TRRS',
  /** Tip-Ring-Sleeve Connection. Commonly used for stereo equipment. *Note: Sleeve is ground. */
  Trs = 'TRS',
  /** Tip-Sleeve Connection. Commonly used for musical instruments. *Note: No ground. */
  Ts = 'TS',
  /** 3 pin XLR connection. Most common single direction analog connection. */
  XlrAnalog = 'XLR_ANALOG',
  /** 3 pin XLR connection. A digital connection that uses AES-3 for carrying 2 complete signals. *Note: Lower ohm rating, may not be compatible with XLR_ANALOG. */
  XlrDigital = 'XLR_DIGITAL',
}

/** Possible category that an Item can be apart of. */
export enum Categories {
  Amplifier = 'AMPLIFIER',
  Computer = 'COMPUTER',
  Console = 'CONSOLE',
  Generic = 'GENERIC',
  Microphones = 'MICROPHONES',
  Monitoring = 'MONITORING',
  Network = 'NETWORK',
  Processor = 'PROCESSOR',
  Radio = 'RADIO',
  Speaker = 'SPEAKER',
  SpkHardware = 'SPK_HARDWARE',
}

/** Addition of computer ports,  */
export type ComputerConnectivity = {
  front_port?: InputMaybe<Scalars['Boolean']>;
  number_of_ports: Scalars['Int'];
  port_type: ComputerPortType;
  version?: InputMaybe<Scalars['String']>;
};

export type ComputerInputTest = {
  computer_ports: Array<ComputerConnectivity>;
  cpu_processor: Scalars['String'];
  dedicated_graphics: Scalars['Boolean'];
  id?: InputMaybe<Scalars['Int']>;
  model_year?: InputMaybe<Scalars['String']>;
  network_connectivity: Array<NetworkConnectivty>;
  operating_system?: InputMaybe<Scalars['String']>;
  power: ElectricalInput;
  ram_size: Scalars['Int'];
  total_storage: Scalars['Int'];
};

/** Representation of any computer based items. */
export type ComputerItem = {
  __typename?: 'ComputerItem';
  computer_ports: Array<ComputerPort>;
  cpu_processor: Scalars['String'];
  dedicated_graphics: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
  model_year?: Maybe<Scalars['String']>;
  network_connectivity: Array<NetworkPort>;
  operating_system?: Maybe<Scalars['String']>;
  power: IElectrical;
  ram_size: Scalars['Int'];
  total_storage: Scalars['Int'];
};

export type ComputerPort = {
  __typename?: 'ComputerPort';
  front_port?: Maybe<Scalars['Boolean']>;
  number_of_ports: Scalars['Int'];
  port_type: ComputerPortType;
  version?: Maybe<Scalars['String']>;
};

/** An array representation of the ports available on a computer. */
export enum ComputerPortType {
  Displayport = 'DISPLAYPORT',
  Firewire = 'FIREWIRE',
  Hdmi = 'HDMI',
  MiniDisplayport = 'MINI_DISPLAYPORT',
  MiniHdmi = 'MINI_HDMI',
  MircoB = 'MIRCO_B',
  SdCard = 'SD_CARD',
  UsbA = 'USB_A',
  UsbB = 'USB_B',
  UsbC = 'USB_C',
  UsbCThunderbolt = 'USB_C_THUNDERBOLT',
}

export type ConsoleInput = {
  aux_inputs: Scalars['Int'];
  can_expand: Scalars['Boolean'];
  faders: Scalars['Int'];
  max_sample_rate: SampleRate;
  midi: MidiType;
  model: Scalars['String'];
  motorized: Scalars['Boolean'];
  notes: Array<Scalars['String']>;
  phantom_power_inputs: Scalars['Int'];
  physical_aux_inputs: Scalars['Int'];
  physical_inputs: Scalars['Int'];
  physical_outputs: Scalars['Int'];
  power: ElectricalInput;
  protocol_inputs: Scalars['Int'];
  searchModel?: InputMaybe<Scalars['String']>;
  signal_protocol: Protocol;
  total_busses: Scalars['Int'];
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

export type ConsoleInputTest = {
  aux_inputs: Scalars['Int'];
  can_expand: Scalars['Boolean'];
  faders: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  max_sample_rate: SampleRate;
  midi?: InputMaybe<MidiType>;
  motorized: Scalars['Boolean'];
  phantom_power_inputs: Scalars['Int'];
  physical_aux_inputs: Scalars['Int'];
  physical_inputs: Scalars['Int'];
  physical_outputs: Scalars['Int'];
  power: ElectricalInput;
  protocol_inputs: Scalars['Int'];
  signal_protocol: Protocol;
  total_busses: Scalars['Int'];
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

export type ConsoleInputTest = {
  auxInputs: Scalars['Int'];
  can_expand: Scalars['Boolean'];
  faders: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  max_sample_rate: SampleRate;
  midi?: InputMaybe<MidiType>;
  motorized: Scalars['Boolean'];
  phantomPowerInputs: Scalars['Int'];
  physicalAuxInputs: Scalars['Int'];
  physicalInputs: Scalars['Int'];
  physicalOutputs: Scalars['Int'];
  power: ElectricalInput;
  protocolInputs: Scalars['Int'];
  signalProtocol: Protocol;
  totalBusses: Scalars['Int'];
  totalInputs: Scalars['Int'];
  totalOutputs: Scalars['Int'];
};

export type ConsoleItem = {
  __typename?: 'ConsoleItem';
  aux_inputs: Scalars['Int'];
  can_expand: Scalars['Boolean'];
  faders: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  max_sample_rate: SampleRate;
  midi?: Maybe<MidiType>;
  motorized: Scalars['Boolean'];
  phantom_power_inputs: Scalars['Int'];
  physical_aux_inputs: Scalars['Int'];
  physical_inputs: Scalars['Int'];
  physical_outputs: Scalars['Int'];
  power: IElectrical;
  protocol_inputs: Scalars['Int'];
  signal_protocol: Protocol;
  total_busses: Scalars['Int'];
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

export enum CountryCodes {
  Ad = 'AD',
  Ae = 'AE',
  Af = 'AF',
  Ag = 'AG',
  Ai = 'AI',
  Al = 'AL',
  Am = 'AM',
  An = 'AN',
  Ao = 'AO',
  Aq = 'AQ',
  Ar = 'AR',
  As = 'AS',
  At = 'AT',
  Au = 'AU',
  Aw = 'AW',
  Ax = 'AX',
  Az = 'AZ',
  Ba = 'BA',
  Bb = 'BB',
  Bd = 'BD',
  Be = 'BE',
  Bf = 'BF',
  Bg = 'BG',
  Bh = 'BH',
  Bi = 'BI',
  Bj = 'BJ',
  Bm = 'BM',
  Bn = 'BN',
  Bo = 'BO',
  Br = 'BR',
  Bs = 'BS',
  Bt = 'BT',
  Bv = 'BV',
  Bw = 'BW',
  By = 'BY',
  Bz = 'BZ',
  Ca = 'CA',
  Cc = 'CC',
  Cd = 'CD',
  Cf = 'CF',
  Cg = 'CG',
  Ch = 'CH',
  Ci = 'CI',
  Ck = 'CK',
  Cl = 'CL',
  Cm = 'CM',
  Cn = 'CN',
  Co = 'CO',
  Cr = 'CR',
  Cs = 'CS',
  Cu = 'CU',
  Cv = 'CV',
  Cx = 'CX',
  Cy = 'CY',
  Cz = 'CZ',
  De = 'DE',
  Dj = 'DJ',
  Dk = 'DK',
  Dm = 'DM',
  Do = 'DO',
  Dz = 'DZ',
  Ec = 'EC',
  Ee = 'EE',
  Eg = 'EG',
  Eh = 'EH',
  Er = 'ER',
  Es = 'ES',
  Et = 'ET',
  Fi = 'FI',
  Fj = 'FJ',
  Fk = 'FK',
  Fm = 'FM',
  Fo = 'FO',
  Fr = 'FR',
  Ga = 'GA',
  Gb = 'GB',
  Gd = 'GD',
  Ge = 'GE',
  Gf = 'GF',
  Gg = 'GG',
  Gh = 'GH',
  Gi = 'GI',
  Gl = 'GL',
  Gm = 'GM',
  Gn = 'GN',
  Gp = 'GP',
  Gq = 'GQ',
  Gr = 'GR',
  Gs = 'GS',
  Gt = 'GT',
  Gu = 'GU',
  Gw = 'GW',
  Gy = 'GY',
  Hk = 'HK',
  Hm = 'HM',
  Hn = 'HN',
  Hr = 'HR',
  Ht = 'HT',
  Hu = 'HU',
  Id = 'ID',
  Ie = 'IE',
  Il = 'IL',
  Im = 'IM',
  In = 'IN',
  Io = 'IO',
  Iq = 'IQ',
  Ir = 'IR',
  Is = 'IS',
  It = 'IT',
  Je = 'JE',
  Jm = 'JM',
  Jo = 'JO',
  Jp = 'JP',
  Ke = 'KE',
  Kg = 'KG',
  Kh = 'KH',
  Ki = 'KI',
  Km = 'KM',
  Kn = 'KN',
  Kp = 'KP',
  Kr = 'KR',
  Kw = 'KW',
  Ky = 'KY',
  Kz = 'KZ',
  La = 'LA',
  Lb = 'LB',
  Lc = 'LC',
  Li = 'LI',
  Lk = 'LK',
  Lr = 'LR',
  Ls = 'LS',
  Lt = 'LT',
  Lu = 'LU',
  Lv = 'LV',
  Ly = 'LY',
  Ma = 'MA',
  Mc = 'MC',
  Md = 'MD',
  Mg = 'MG',
  Mh = 'MH',
  Mk = 'MK',
  Ml = 'ML',
  Mm = 'MM',
  Mn = 'MN',
  Mo = 'MO',
  Mp = 'MP',
  Mq = 'MQ',
  Mr = 'MR',
  Ms = 'MS',
  Mt = 'MT',
  Mu = 'MU',
  Mv = 'MV',
  Mw = 'MW',
  Mx = 'MX',
  My = 'MY',
  Mz = 'MZ',
  Na = 'NA',
  Nc = 'NC',
  Ne = 'NE',
  Nf = 'NF',
  Ng = 'NG',
  Ni = 'NI',
  Nl = 'NL',
  No = 'NO',
  Np = 'NP',
  Nr = 'NR',
  Nu = 'NU',
  Nz = 'NZ',
  Om = 'OM',
  Pa = 'PA',
  Pe = 'PE',
  Pf = 'PF',
  Pg = 'PG',
  Ph = 'PH',
  Pk = 'PK',
  Pl = 'PL',
  Pm = 'PM',
  Pn = 'PN',
  Pr = 'PR',
  Ps = 'PS',
  Pt = 'PT',
  Pw = 'PW',
  Py = 'PY',
  Qa = 'QA',
  Re = 'RE',
  Ro = 'RO',
  Ru = 'RU',
  Rw = 'RW',
  Sa = 'SA',
  Sb = 'SB',
  Sc = 'SC',
  Sd = 'SD',
  Se = 'SE',
  Sg = 'SG',
  Sh = 'SH',
  Si = 'SI',
  Sj = 'SJ',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sr = 'SR',
  St = 'ST',
  Sv = 'SV',
  Sy = 'SY',
  Sz = 'SZ',
  Tc = 'TC',
  Td = 'TD',
  Tf = 'TF',
  Tg = 'TG',
  Th = 'TH',
  Tj = 'TJ',
  Tk = 'TK',
  Tl = 'TL',
  Tm = 'TM',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Tt = 'TT',
  Tv = 'TV',
  Tw = 'TW',
  Tz = 'TZ',
  Ua = 'UA',
  Ug = 'UG',
  Um = 'UM',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Va = 'VA',
  Vc = 'VC',
  Ve = 'VE',
  Vg = 'VG',
  Vi = 'VI',
  Vn = 'VN',
  Vu = 'VU',
  Wf = 'WF',
  Ws = 'WS',
  Ye = 'YE',
  Yt = 'YT',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW',
}

/**
 * Dimensions: Used for storing physical dimentions of items for display or calculations.
 *  Ex: Calculating volume for bulk item storage
 */
export type Dimension = {
  __typename?: 'Dimension';
  height: Scalars['Float'];
  length: Scalars['Float'];
  rack_unit?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
};

/** Inputs for Length (equivalent to Depth), Width, and height. All values are required. */
export type Dimensions = {
  height: Scalars['Float'];
  length: Scalars['Float'];
  rack_unit?: InputMaybe<Scalars['Float']>;
  width: Scalars['Float'];
};

export type DriverArrangment = {
  __typename?: 'DriverArrangment';
  /** Diameter of a speaker driver */
  speaker_size: Scalars['Float'];
};

export type DriverArrangmentTest = {
  /** Diameter of a speaker driver */
  speaker_size: Scalars['Float'];
};

/** Input for the electrical properties of an Item, only available in select Item type. Ex: ProcessorItem or ConsoleItem */
export type ElectricalInput = {
  /** Electrical connector used as power input. EX: Powercon Blue */
  input_connector: PowerConnector;
  /** Electrical equipment tend to have a voltage range. Ex: 90V-260V. */
  lower_voltage: Scalars['Float'];
  /** Electrical equipment may have a maximum wattage. Ex: 20A. */
  max_wattage: Scalars['Float'];
  /** Electrical connetor for output often daisy chaining. EX: Powercon Grey/White. */
  output_connector?: InputMaybe<PowerConnector>;
  /** Electrical may have redundant power built in. */
  redundant?: InputMaybe<Scalars['Boolean']>;
  /** Electrical equipment tend to have a voltage range. Ex: 90V-260V. */
  upper_voltage: Scalars['Float'];
  /** Electrical equipment must have a wattage. Ex: 15A. *Note: Please convert Volt-Amperes (VA) to wattage (A). */
  wattage: Scalars['Float'];
};

export type Equipment = {
  __typename?: 'Equipment';
  category: Scalars['String'];
  cost?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  depth?: Maybe<Scalars['Float']>;
  frequencyRange?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  manufacturer: Scalars['String'];
  model: Scalars['String'];
  powerDraw?: Maybe<Scalars['Float']>;
  publicNotes?: Maybe<Scalars['String']>;
  rackUnit?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
  weight?: Maybe<Scalars['Float']>;
};

export type EquipmentInput = {
  category: Scalars['String'];
  cost?: InputMaybe<Scalars['Float']>;
  depth?: InputMaybe<Scalars['Float']>;
  frequencyRange?: InputMaybe<Scalars['String']>;
  manufacturer: Scalars['String'];
  model: Scalars['String'];
  powerDraw?: InputMaybe<Scalars['Float']>;
  publicNotes?: InputMaybe<Scalars['String']>;
  rackUnit?: InputMaybe<Scalars['Float']>;
  searchModel?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type EquipmentResponse = {
  __typename?: 'EquipmentResponse';
  equipment?: Maybe<Equipment>;
  equipmentItems?: Maybe<Array<Equipment>>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  details: Scalars['String'];
  field: Scalars['String'];
  message: Scalars['String'];
};

/** Interface for items with potential electrical capabilies. Stored as JSONType. */
export type IElectrical = {
  __typename?: 'IElectrical';
  /** Electrical connector used as power input. EX: Powercon Blue */
  input_connector: PowerConnector;
  /** Electrical equipment tend to have a voltage range. Ex: 90V-260V. */
  lower_voltage: Scalars['Float'];
  /** Electrical equipment may have a maximum wattage. Ex: 20A. */
  max_wattage: Scalars['Float'];
  /** Electrical connetor for output often daisy chaining. EX: Powercon Grey/White. */
  output_connector?: Maybe<PowerConnector>;
  /** Electrical may have redundant power built in. */
  redundant?: Maybe<Scalars['Boolean']>;
  /** Electrical equipment tend to have a voltage range. Ex: 90V-260V. */
  upper_voltage: Scalars['Float'];
  /** Electrical equipment must have a wattage. Ex: 15A. *Note: Please convert Volt-Amperes (VA) to wattage (A). */
  wattage: Scalars['Float'];
};

export type IGeneric = {
  /** Monetary value of item (in $USD). */
  cost?: Maybe<Scalars['Float']>;
  /** Store when item was created. */
  createdAt: Scalars['String'];
  dimensions?: Maybe<Dimension>;
  id?: Maybe<Scalars['Int']>;
  /** Global notes for current item. */
  publicNotes?: Maybe<Scalars['String']>;
  /** Store when item was last changed. */
  updatedAt: Scalars['String'];
  /** Storing the wieght of an Item (in lbs) */
  weight?: Maybe<Scalars['Float']>;
};

export type Item = IGeneric & {
  __typename?: 'Item';
  amplifier?: Maybe<AmplifierItem>;
  category: Categories;
  computer?: Maybe<ComputerItem>;
  console?: Maybe<ConsoleItem>;
  /** Monetary value of item (in $USD). */
  cost?: Maybe<Scalars['Float']>;
  /** Store when item was created. */
  createdAt: Scalars['String'];
  dimensions?: Maybe<Dimension>;
  id?: Maybe<Scalars['Int']>;
  microphone?: Maybe<MicrophoneItem>;
  model: Scalars['String'];
  monitoring_item?: Maybe<MonitoringItem>;
  network_item?: Maybe<NetworkItem>;
  notes?: Maybe<Array<Scalars['String']>>;
  processor?: Maybe<ProcessingItem>;
  /** Global notes for current item. */
  publicNotes?: Maybe<Scalars['String']>;
  radio_item?: Maybe<RfItem>;
  speaker_item?: Maybe<SpeakerItem>;
  /** Store when item was last changed. */
  updatedAt: Scalars['String'];
  /** Storing the wieght of an Item (in lbs) */
  weight?: Maybe<Scalars['Float']>;
};

export type ItemInput = {
  amplifier?: InputMaybe<AmplifierItemTest>;
  category: Categories;
  computer?: InputMaybe<ComputerInputTest>;
  console?: InputMaybe<ConsoleInputTest>;
  cost: Scalars['Float'];
  dimensions?: InputMaybe<Dimensions>;
  manufacturer: Scalars['String'];
  microphone?: InputMaybe<MicrophoneInputTest>;
  model: Scalars['String'];
  monitoring_item?: InputMaybe<MonitoringInputTest>;
  network_item?: InputMaybe<NetworkInputTest>;
  notes?: InputMaybe<Array<Scalars['String']>>;
  processor?: InputMaybe<ProcessingItemTest>;
  publicNotes: Scalars['String'];
  rf_item?: InputMaybe<RfInputTest>;
  searchModel?: InputMaybe<Scalars['String']>;
  speaker_item?: InputMaybe<SpeakerInputTest>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type ItemInputEdit = {
  amplifier?: InputMaybe<AmplifierInput>;
  category: Categories;
  computer?: InputMaybe<ComputerInputTest>;
  console?: InputMaybe<ConsoleInput>;
  cost: Scalars['Float'];
  dimensions?: InputMaybe<Dimensions>;
  manufacturer: Scalars['String'];
  microphone?: InputMaybe<MicrophoneInput>;
  model: Scalars['String'];
  monitoring_item?: InputMaybe<MonitoringInput>;
  network_item?: InputMaybe<NetworkInput>;
  notes?: InputMaybe<Array<Scalars['String']>>;
  processor?: InputMaybe<ProcessorInput>;
  publicNotes: Scalars['String'];
  rf_item?: InputMaybe<RfItemInput>;
  searchModel?: InputMaybe<Scalars['String']>;
  speaker_item?: InputMaybe<SpeakerInput>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  /** Potential list of errors that can be generated from a Query or Mutation */
  errors?: Maybe<Array<FieldError>>;
  /** Potential Item that comes back as result of a successful Query or Mutation. */
  item?: Maybe<Item>;
};

export type MicrophoneInput = {
  connector?: InputMaybe<Analog>;
  diaphragm_size?: InputMaybe<Scalars['Float']>;
  frequency_response?: InputMaybe<Scalars['String']>;
  low_cut?: InputMaybe<Scalars['Boolean']>;
  max_spl: Scalars['Float'];
  microphone_type?: InputMaybe<Array<MicrophoneType>>;
  output_impedance?: InputMaybe<Scalars['Float']>;
  pad?: InputMaybe<Scalars['Boolean']>;
  phantom?: InputMaybe<Scalars['Boolean']>;
};

export type MicrophoneInputTest = {
  connector?: InputMaybe<Analog>;
  diaphragm_size?: InputMaybe<Scalars['Float']>;
  frequency_response?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  low_cut?: InputMaybe<Scalars['Boolean']>;
  max_spl: Scalars['Float'];
  microphone_type?: InputMaybe<Array<MicrophoneType>>;
  output_impedance?: InputMaybe<Scalars['Float']>;
  pad?: InputMaybe<Scalars['Boolean']>;
  phantom?: InputMaybe<Scalars['Boolean']>;
};

export type MicrophoneItem = {
  __typename?: 'MicrophoneItem';
  connector?: Maybe<Analog>;
  diaphragm_size?: Maybe<Scalars['Float']>;
  frequency_response?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  low_cut?: Maybe<Scalars['Boolean']>;
  max_spl: Scalars['Float'];
  microphone_type?: Maybe<Array<MicrophoneType>>;
  output_impedance?: Maybe<Scalars['Float']>;
  pad?: Maybe<Scalars['Boolean']>;
  phantom?: Maybe<Scalars['Boolean']>;
};

/** The type of micrphone source medium */
export enum MicrophoneType {
  Condensor = 'CONDENSOR',
  Dynamic = 'DYNAMIC',
  PrePoloraizedCondensor = 'PRE_POLORAIZED_CONDENSOR',
  Ribbon = 'RIBBON',
}

/** Common types of Midi connection interfaces */
export enum MidiType {
  /** Connection type found in most older / analog equipment. *Note: Conversion is likely necessary for newer equipment. */
  Serial = 'SERIAL',
  /** Connection type found in most newer equipment. *Note: Signal may not be as robust as serial. */
  Usb = 'USB',
}

export type MonitoringInput = {
  distro?: InputMaybe<Scalars['Boolean']>;
  network_connectivity: Array<NetworkConnectivty>;
  physical_connectivity: Array<PhysicalConnectivty>;
  power: ElectricalInput;
};

export type MonitoringInputTest = {
  distro?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  network_connectivity: Array<NetworkConnectivty>;
  physical_connectivity?: InputMaybe<Array<PhysicalConnectivty>>;
  power: ElectricalInput;
};

export type MonitoringItem = {
  __typename?: 'MonitoringItem';
  distro?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  network_connectivity: Array<NetworkPort>;
  physical_connectivity?: Maybe<Array<PhysicalPort>>;
  power: IElectrical;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEquipment?: Maybe<EquipmentResponse>;
  /** Create a new item with optional subfields. */
  createItem?: Maybe<ItemResponse>;
  createPost: Post;
  deleteEquipment: Scalars['Boolean'];
  deleteEquipmentRange: Scalars['String'];
  deletePost: Scalars['Boolean'];
  deletePosts: Scalars['Boolean'];
  loginUser: UserResponse;
  logout: Scalars['Boolean'];
  registerUser: UserResponse;
  updateEquipment?: Maybe<EquipmentResponse>;
  /** Update an Item using the exact model name and edit all of the fields. */
  updateItem: ItemResponse;
};

export type MutationCreateEquipmentArgs = {
  inputOptions: EquipmentInput;
};

export type MutationCreateItemArgs = {
  itemInput: ItemInput;
};

export type MutationCreatePostArgs = {
  title: Scalars['String'];
};

export type MutationDeleteEquipmentArgs = {
  id?: InputMaybe<Scalars['Int']>;
  model: Scalars['String'];
};

export type MutationDeleteEquipmentRangeArgs = {
  ids: Array<Scalars['Int']>;
};

export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};

export type MutationDeletePostsArgs = {
  ids: Array<Scalars['Int']>;
};

export type MutationLoginUserArgs = {
  inputOptions: UserInput;
};

export type MutationRegisterUserArgs = {
  inputOptions: UserInput;
};

export type MutationUpdateEquipmentArgs = {
  id: Scalars['Int'];
  updateOptions: EquipmentInput;
};

export type MutationUpdateItemArgs = {
  edits: ItemInputEdit;
  model: Scalars['String'];
};

/** Addition of network ports. Various Protocols are handled via the: (Protocol Enummeration) */
export type NetworkConnectivty = {
  max_connection_speed: NetworkSpeeds;
  port_identifier?: InputMaybe<Scalars['String']>;
  power_over_ethernet: Scalars['Boolean'];
  protocol: Protocol;
};

export type NetworkInput = {
  fiber: Scalars['Boolean'];
  max_speed: Scalars['Int'];
  network_connectivity: Array<NetworkConnectivty>;
  network_type: NetworkType;
  poe_ports: Scalars['Int'];
  power: ElectricalInput;
};

export type NetworkInputTest = {
  fiber: Scalars['Boolean'];
  id?: InputMaybe<Scalars['Int']>;
  max_speed: Scalars['Int'];
  network_connectivity: Array<NetworkConnectivty>;
  network_type: NetworkType;
  poe_ports: Scalars['Int'];
  power: ElectricalInput;
};

/** Network specific items, handling routing, switching and wireless functionality */
export type NetworkItem = {
  __typename?: 'NetworkItem';
  fiber: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
  max_speed: Scalars['Int'];
  network_connectivity: Array<NetworkPort>;
  network_type: NetworkType;
  poe_ports: Scalars['Int'];
  power: IElectrical;
};

/** Represents RJ45 or Ethernet ports for network capable equipment. Each object represents a singular port */
export type NetworkPort = {
  __typename?: 'NetworkPort';
  max_connection_speed: NetworkSpeeds;
  port_identifier?: Maybe<Scalars['String']>;
  power_over_ethernet: Scalars['Boolean'];
  protocol: Protocol;
};

export enum NetworkSpeeds {
  Gigabit = 'GIGABIT',
  Superspeed = 'SUPERSPEED',
  TenGigabit = 'TEN_GIGABIT',
}

/** Assignable types for various types of networking equipment */
export enum NetworkType {
  AccessPoint = 'ACCESS_POINT',
  Injector = 'INJECTOR',
  Modem = 'MODEM',
  NetworkBridge = 'NETWORK_BRIDGE',
  Nic = 'NIC',
  Repeater = 'REPEATER',
  Router = 'ROUTER',
  RouterSwAp = 'ROUTER_SW_AP',
  SwitchManaged = 'SWITCH_MANAGED',
  SwitchUnmanaged = 'SWITCH_UNMANAGED',
}

/** Addition of physical ports. Various Protocols are handled via the: (Analog Enummeration) */
export type PhysicalConnectivty = {
  connector_type: Analog;
  input: Scalars['Boolean'];
  port_identifier?: InputMaybe<Scalars['String']>;
  signal_lines: Scalars['Int'];
};

/** Represents Analog for capable equipment. Each object represents a singular port. */
export type PhysicalPort = {
  __typename?: 'PhysicalPort';
  connector_type: Analog;
  input: Scalars['Boolean'];
  port_identifier?: Maybe<Scalars['String']>;
  signal_lines: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  /** Store when item was created. */
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  /** Store when item was last changed. */
  updatedAt: Scalars['String'];
};

/** Common connector types for power input/output. */
export enum PowerConnector {
  /** Most common general purpose connector to draw electricity from a powersource. Max voltage: 120. Max amperage: 15A */
  Edison = 'EDISON',
  /** Similar to an EDISON plug, but with a higher max amperage. Max voltage: 120. Max amperage: 20A */
  Edison_20A = 'EDISON_20A',
  /** Most common general purpose connector for connecting electrical equipment to a powersource. Max voltage: 250V. Max amperage: 16A */
  Iec = 'IEC',
  /** High voltage locking connector, the 20 stands for 20 Amps. Max voltage: 250V. *Note: Also known as 3-Wire */
  L6_20 = 'L6_20',
  /** High voltage locking connector, the 30 stands for 30 Amps. Max voltage: 250V. *Note: Also known as 3-Wire */
  L6_30 = 'L6_30',
  /** High voltage locking connector, the 50 stands for 50 Amps. Max voltage: 250V. *Note: Also known as 3-Wire */
  L6_50 = 'L6_50',
  /** High voltage locking connector, the 60 stands for 60 Amps. Max voltage: 250V. *Note: Also known as 3-Wire */
  L6_60 = 'L6_60',
  /** Power VIA an RJ45 connection, source must be POE capable */
  Poe = 'POE',
  /** Most common general purpose connector for live electrical connections. Designed for rugged applications. Max voltage: 250V. Max amperage: 20A. *Note: CANNOT be disconnected under live load. */
  Powercon_20A = 'POWERCON_20A',
  /** An extremely robust and reliable locking single phase AC appliance cable connector for high current capacity. Max voltage: 250V. Max amperage: 32A. *Note: CANNOT be disconnected under live load. */
  Powercon_32A = 'POWERCON_32A',
  /** Locking connector for outdoor live electrical connections. Designed for rugged applications. Max voltage: 250V. Max amperage: 20A. *Note: CAN be disconnected under live load. */
  PowerconTrue1 = 'POWERCON_TRUE1',
  /** Successor to POWERCON_TRUE1. Designed for rugged, outdoor, live, applications. Max voltage: 250V. Max amperage: 20A. *Note: CAN be disconnected under live load. */
  PowerconTrue1Top = 'POWERCON_TRUE1_TOP',
}

export type ProcessingItem = {
  __typename?: 'ProcessingItem';
  id?: Maybe<Scalars['Int']>;
  max_sample_rate: SampleRate;
  midi: MidiType;
  network_connectivity: Array<NetworkPort>;
  physical_connectivity: Array<PhysicalPort>;
  physical_inputs: Scalars['Int'];
  physical_outputs: Scalars['Int'];
  power: IElectrical;
  protocol_inputs: Scalars['Int'];
  signal_protocol: Protocol;
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

export type ProcessingItemTest = {
  id?: InputMaybe<Scalars['Int']>;
  max_sample_rate: SampleRate;
  midi: MidiType;
  network_connectivity: Array<NetworkConnectivty>;
  physical_connectivity: Array<PhysicalConnectivty>;
  physical_inputs: Scalars['Int'];
  physical_outputs: Scalars['Int'];
  power: ElectricalInput;
  protocol_inputs: Scalars['Int'];
  signal_protocol: Protocol;
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

export type ProcessorInput = {
  max_sample_rate: SampleRate;
  midi?: InputMaybe<MidiType>;
  network_connectivity: Array<NetworkConnectivty>;
  physical_inputs: Scalars['Int'];
  physical_outputs: Scalars['Int'];
  power: ElectricalInput;
  protocol_inputs: Scalars['Int'];
  signal_protocol: Protocol;
  total_inputs: Scalars['Int'];
  total_outputs: Scalars['Int'];
};

/** Network based audio protocols and computer connections. */
export enum Protocol {
  /** Technical standard of audio over IP protocol. Packatizes and distributes audio signals across connected devices with low latency. Compatible with any network switch & DANTE devices. */
  Aes_67 = 'AES_67',
  /** Audio-Video-Bridging. Streams audio & video signals across connected devices with low latency. Compatible with selected network switchs. *Note: Open-Source */
  Avb = 'AVB',
  /** AVB Standardized. Streams audio & video signals across connected devices with low latency. Compatible with selected network switchs. *Note: Managed by AVNU Aliance. */
  AvbMilan = 'AVB_MILAN',
  /** Audio over Ethernet. Streams 64 audio signals across (up to 16 ) connected devices with low latency. Compatible with selected gear from Aviom companies. *Note: Proprietary by Aviom. */
  ANet = 'A_NET',
  /** Most common Audio over IP (AoI) & Audio of Ethernet (AoE) protocol. Packatizes and distributes audio signals across connected devices with low latency. Compatible with any network switch. *Note: Proprietary by Audinate */
  Dante = 'DANTE',
  /** Standard IP connection, for LAN or WAN connections. IPv4 is most commonly used for local networks and is the basis for other IP basesd protocols. */
  Ip = 'IP',
  /** Audio over Fiber, networked & P2P systems. Streams audio signals across connected devices with low latency. Compatible with selected Optocore gear. *Note: Proprietary by Optocore. */
  Optocore = 'OPTOCORE',
  /** Audio over Ethernet. Streams 16 audio signals across connected devices with low latency. Compatible with selected gear from Music Tribe child companies. *Note: Proprietary by Music Tribe. */
  Ultranet = 'ULTRANET',
}

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  findAllItems: Array<Item>;
  /** Using the complete model name find one value. */
  findItem: ItemResponse;
  fullTextSearch: Array<Equipment>;
  fuzzyItemSearch: Array<Item>;
  fuzzyTextSearch: Array<Equipment>;
  getAllEquipment?: Maybe<Array<Equipment>>;
  getEquipment?: Maybe<Equipment>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  search: Array<Post>;
  users: Array<User>;
};

export type QueryFindItemArgs = {
  model: Scalars['String'];
};

export type QueryFullTextSearchArgs = {
  fullSearch: Scalars['String'];
};

export type QueryFuzzyItemSearchArgs = {
  model: Scalars['String'];
};

export type QueryFuzzyTextSearchArgs = {
  fuzzySearch: Scalars['String'];
};

export type QueryGetEquipmentArgs = {
  model: Scalars['String'];
};

export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type QuerySearchArgs = {
  searchTitle: Scalars['String'];
};

export type RfBandInput = {
  /** The shorthand frequency band name. */
  band_name: Scalars['String'];
  deprecated: Scalars['Boolean'];
  /** The lowest possible radio frequency. */
  lower_frequency_range: Scalars['Float'];
  manufacturer: Scalars['String'];
  nation_code: CountryCodes;
  /** The highest possible radio frequency. */
  upper_frequency_range: Scalars['Float'];
};

export type RfInputTest = {
  id?: InputMaybe<Scalars['Int']>;
  lower_frequency_response: Scalars['Int'];
  /** The possible distance a signal can be maintained up to. In feet and with Line-of-Site. */
  physical_range: Scalars['Int'];
  reciever: RecieverInput;
  transmitter: TransmitterInput;
  upper_frequency_response: Scalars['Int'];
};

/** Items that have RF capabilities */
export type RfItem = {
  __typename?: 'RFItem';
  id?: Maybe<Scalars['Int']>;
  lower_frequency_response: Scalars['Int'];
  /** The possible distance a signal can be maintained up to. In feet and with Line-of-Site. */
  physical_range: Scalars['Int'];
  reciever: Reciever;
  transmitter: Transmitter;
  upper_frequency_response: Scalars['Int'];
};

export type RfItemInput = {
  lower_frequency_response: Scalars['Int'];
  /** The possible distance a signal can be maintained up to. In feet and with Line-of-Site. */
  physical_range: Scalars['Int'];
  possible_bands: Array<RfBandInput>;
  reciever: RecieverInput;
  transmitter: TransmitterInput;
  upper_frequency_response: Scalars['Int'];
};

export type Reciever = {
  __typename?: 'Reciever';
  cascade_antenna: Scalars['Boolean'];
  network_ports: Array<NetworkPort>;
  physical_ports: Array<PhysicalPort>;
  power: IElectrical;
};

export type RecieverInput = {
  cascade_antenna: Scalars['Boolean'];
  network_ports: Array<NetworkConnectivty>;
  physical_ports: Array<PhysicalConnectivty>;
  power: ElectricalInput;
};

/** Standard sampling rates found within the recording industry */
export enum SampleRate {
  /** High-Definition or 48.0kHz Sample Rate. Used for predominately for professional recording, high quality distrubution and live events. Note: Commonly found in regular Blu-Rays. */
  Hd = 'HD',
  /** Standard-Definition or 44.1kHz Sample Rate. Used for predominately for consumer distrubution. Note: Commonly found in regular CDs. */
  Sd = 'SD',
  /** Ultra-High-Definition or 96.0kHz Sample Rate. Used for predominately for professional recording, high quality distrubution and archival purposes. Note: Commonly found in high-end audio equipment. */
  Uhd = 'UHD',
}

export type SpeakerInput = {
  built_in_processing: Scalars['Boolean'];
  lower_frequency_response: Scalars['Int'];
  /** Maximum SPL of the speaker. */
  max_spl: Scalars['Float'];
  mounting_options: Array<Scalars['String']>;
  network_connectivity: Array<NetworkConnectivty>;
  physical_connectivity: Array<PhysicalConnectivty>;
  power: ElectricalInput;
  upper_frequency_response: Scalars['Int'];
  wireless: Scalars['Boolean'];
};

export type SpeakerInputTest = {
  built_in_processing: Scalars['Boolean'];
  driver: DriverArrangmentTest;
  id?: InputMaybe<Scalars['Int']>;
  lower_frequency_response: Scalars['Int'];
  /** Maximum SPL of the speaker. */
  max_spl: Scalars['Float'];
  mounting_options: Array<Scalars['String']>;
  network_connectivity: Array<NetworkConnectivty>;
  physical_connectivity: Array<PhysicalConnectivty>;
  power: ElectricalInput;
  upper_frequency_response: Scalars['Int'];
  wireless: Scalars['Boolean'];
};

export type SpeakerItem = {
  __typename?: 'SpeakerItem';
  built_in_processing: Scalars['Boolean'];
  driver: DriverArrangment;
  id?: Maybe<Scalars['Int']>;
  lower_frequency_response: Scalars['Int'];
  /** Maximum SPL of the speaker. */
  max_spl: Scalars['Float'];
  mounting_options: Array<Scalars['String']>;
  network_connectivity: Array<NetworkPort>;
  physical_connectivity: Array<PhysicalPort>;
  power: IElectrical;
  upper_frequency_response: Scalars['Int'];
  wireless: Scalars['Boolean'];
};

export type Transmitter = {
  __typename?: 'Transmitter';
  connector: TransmitterConnector;
};

export enum TransmitterConnector {
  /** DPA's proprietary connector */
  Microdot = 'MICRODOT',
  /** Shure's proprietary connector */
  ShureTa4 = 'SHURE_TA4',
  /** Sennheiser's proprietary connector */
  TriPin = 'TRI_PIN',
  /** Basic 1/8" connector */
  Trrs = 'TRRS',
}

export type TransmitterInput = {
  connector: TransmitterConnector;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken: Scalars['String'];
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateEquipmentMutationVariables = Exact<{
  inputOptions: EquipmentInput;
}>;

export type CreateEquipmentMutation = {
  __typename?: 'Mutation';
  createEquipment?: {
    __typename?: 'EquipmentResponse';
    equipment?: {
      __typename?: 'Equipment';
      createdAt: string;
      updatedAt: string;
      category: string;
      manufacturer: string;
      model: string;
      publicNotes?: string | null;
      cost?: number | null;
      powerDraw?: number | null;
      weight?: number | null;
      depth?: number | null;
      rackUnit?: number | null;
      frequencyRange?: string | null;
    } | null;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    equipmentItems?: Array<{
      __typename?: 'Equipment';
      id: number;
      createdAt: string;
      updatedAt: string;
      category: string;
      manufacturer: string;
      model: string;
      publicNotes?: string | null;
      cost?: number | null;
      powerDraw?: number | null;
      weight?: number | null;
      depth?: number | null;
      rackUnit?: number | null;
      frequencyRange?: string | null;
    }> | null;
  } | null;
};

export type CreateAmplifierItemMutationVariables = Exact<{
  itemInput: ItemInput;
}>;

export type CreateAmplifierItemMutation = {
  __typename?: 'Mutation';
  createItem?: {
    __typename?: 'ItemResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    item?: {
      __typename?: 'Item';
      id?: number | null;
      createdAt: string;
      updatedAt: string;
      cost?: number | null;
      model: string;
      weight?: number | null;
      publicNotes?: string | null;
      category: Categories;
      notes?: Array<string> | null;
      amplifier?: {
        __typename?: 'AmplifierItem';
        id?: number | null;
        total_inputs: number;
        total_outputs: number;
        midi?: MidiType | null;
        signal_protocol: Protocol;
        max_sample_rate: SampleRate;
        physical_connectivity: Array<{
          __typename?: 'PhysicalPort';
          port_identifier?: string | null;
          connector_type: Analog;
          signal_lines: number;
          input: boolean;
        }>;
        network_connectivity: Array<{
          __typename?: 'NetworkPort';
          protocol: Protocol;
          power_over_ethernet: boolean;
          port_identifier?: string | null;
          max_connection_speed: NetworkSpeeds;
        }>;
        power?: {
          __typename?: 'IElectrical';
          wattage: number;
          redundant?: boolean | null;
          lower_voltage: number;
          max_wattage: number;
          input_connector: PowerConnector;
          output_connector?: PowerConnector | null;
        } | null;
      } | null;
      dimensions?: {
        __typename?: 'Dimension';
        width: number;
        length: number;
        height: number;
        rack_unit?: number | null;
      } | null;
    } | null;
  } | null;
};

export type CreateComputerItemMutationVariables = Exact<{
  itemInput: ItemInput;
}>;

export type CreateComputerItemMutation = {
  __typename?: 'Mutation';
  createItem?: {
    __typename?: 'ItemResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    item?: {
      __typename?: 'Item';
      id?: number | null;
      createdAt: string;
      updatedAt: string;
      cost?: number | null;
      model: string;
      weight?: number | null;
      publicNotes?: string | null;
      category: Categories;
      notes?: Array<string> | null;
      computer?: {
        __typename?: 'ComputerItem';
        id?: number | null;
        cpu_processor: string;
        ram_size: number;
        total_storage: number;
        model_year?: string | null;
        operating_system?: string | null;
        dedicated_graphics: boolean;
        network_connectivity: Array<{
          __typename?: 'NetworkPort';
          protocol: Protocol;
          power_over_ethernet: boolean;
          port_identifier?: string | null;
          max_connection_speed: NetworkSpeeds;
        }>;
        computer_ports: Array<{
          __typename?: 'ComputerPort';
          port_type: ComputerPortType;
          number_of_ports: number;
          front_port?: boolean | null;
          version?: string | null;
        }>;
        power: {
          __typename?: 'IElectrical';
          wattage: number;
          redundant?: boolean | null;
          lower_voltage: number;
          max_wattage: number;
          input_connector: PowerConnector;
          output_connector?: PowerConnector | null;
        };
      } | null;
      dimensions?: {
        __typename?: 'Dimension';
        width: number;
        length: number;
        height: number;
        rack_unit?: number | null;
      } | null;
    } | null;
  } | null;
};

export type CreateConsoleItemMutationVariables = Exact<{
  itemInput: ItemInput;
}>;

export type CreateConsoleItemMutation = {
  __typename?: 'Mutation';
  createItem?: {
    __typename?: 'ItemResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    item?: {
      __typename?: 'Item';
      id?: number | null;
      createdAt: string;
      updatedAt: string;
      cost?: number | null;
      model: string;
      weight?: number | null;
      publicNotes?: string | null;
      category: Categories;
      notes?: Array<string> | null;
      console?: {
        __typename?: 'ConsoleItem';
        total_inputs: number;
        total_outputs: number;
        total_busses: number;
        physical_inputs: number;
        physical_outputs: number;
        aux_inputs: number;
        physical_aux_inputs: number;
        phantom_power_inputs: number;
        faders: number;
        motorized: boolean;
        midi?: MidiType | null;
        protocol_inputs: number;
        signal_protocol: Protocol;
        can_expand: boolean;
        max_sample_rate: SampleRate;
        power: {
          __typename?: 'IElectrical';
          wattage: number;
          redundant?: boolean | null;
          lower_voltage: number;
          max_wattage: number;
          input_connector: PowerConnector;
          output_connector?: PowerConnector | null;
        };
      } | null;
      dimensions?: {
        __typename?: 'Dimension';
        width: number;
        length: number;
        height: number;
        rack_unit?: number | null;
      } | null;
    } | null;
  } | null;
};

export type CreateMicrophoneItemMutationVariables = Exact<{
  itemInput: ItemInput;
}>;

export type CreateMicrophoneItemMutation = {
  __typename?: 'Mutation';
  createItem?: {
    __typename?: 'ItemResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    item?: {
      __typename?: 'Item';
      id?: number | null;
      createdAt: string;
      updatedAt: string;
      cost?: number | null;
      model: string;
      weight?: number | null;
      publicNotes?: string | null;
      category: Categories;
      notes?: Array<string> | null;
      microphone?: {
        __typename?: 'MicrophoneItem';
        id?: number | null;
        max_spl: number;
        phantom?: boolean | null;
        low_cut?: boolean | null;
        pad?: boolean | null;
        diaphragm_size?: number | null;
        output_impedance?: number | null;
        frequency_response?: string | null;
        connector?: Analog | null;
        microphone_type?: Array<MicrophoneType> | null;
      } | null;
      dimensions?: {
        __typename?: 'Dimension';
        width: number;
        length: number;
        height: number;
        rack_unit?: number | null;
      } | null;
    } | null;
  } | null;
};

export type CreateMonitoringItemMutationVariables = Exact<{
  itemInput: ItemInput;
}>;

export type CreateMonitoringItemMutation = {
  __typename?: 'Mutation';
  createItem?: {
    __typename?: 'ItemResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    item?: {
      __typename?: 'Item';
      id?: number | null;
      createdAt: string;
      updatedAt: string;
      cost?: number | null;
      model: string;
      weight?: number | null;
      publicNotes?: string | null;
      category: Categories;
      notes?: Array<string> | null;
      monitoring_item?: {
        __typename?: 'MonitoringItem';
        id?: number | null;
        distro?: boolean | null;
        network_connectivity: Array<{
          __typename?: 'NetworkPort';
          protocol: Protocol;
          power_over_ethernet: boolean;
          port_identifier?: string | null;
          max_connection_speed: NetworkSpeeds;
        }>;
        physical_connectivity?: Array<{
          __typename?: 'PhysicalPort';
          port_identifier?: string | null;
          connector_type: Analog;
          signal_lines: number;
          input: boolean;
        }> | null;
        power: {
          __typename?: 'IElectrical';
          wattage: number;
          redundant?: boolean | null;
          lower_voltage: number;
          max_wattage: number;
          input_connector: PowerConnector;
          output_connector?: PowerConnector | null;
        };
      } | null;
      dimensions?: {
        __typename?: 'Dimension';
        width: number;
        length: number;
        height: number;
        rack_unit?: number | null;
      } | null;
    } | null;
  } | null;
};

export type CreateProcessingItemMutationVariables = Exact<{
  itemInput: ItemInput;
}>;

export type CreateProcessingItemMutation = {
  __typename?: 'Mutation';
  createItem?: {
    __typename?: 'ItemResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    item?: {
      __typename?: 'Item';
      id?: number | null;
      createdAt: string;
      updatedAt: string;
      cost?: number | null;
      model: string;
      weight?: number | null;
      publicNotes?: string | null;
      category: Categories;
      notes?: Array<string> | null;
      processor?: {
        __typename?: 'ProcessingItem';
        total_inputs: number;
        total_outputs: number;
        physical_inputs: number;
        physical_outputs: number;
        midi: MidiType;
        protocol_inputs: number;
        signal_protocol: Protocol;
        max_sample_rate: SampleRate;
        network_connectivity: Array<{
          __typename?: 'NetworkPort';
          protocol: Protocol;
          power_over_ethernet: boolean;
          port_identifier?: string | null;
          max_connection_speed: NetworkSpeeds;
        }>;
        power: {
          __typename?: 'IElectrical';
          wattage: number;
          redundant?: boolean | null;
          lower_voltage: number;
          max_wattage: number;
          input_connector: PowerConnector;
          output_connector?: PowerConnector | null;
        };
      } | null;
      dimensions?: {
        __typename?: 'Dimension';
        width: number;
        length: number;
        height: number;
        rack_unit?: number | null;
      } | null;
    } | null;
  } | null;
};

export type EquipmentModelSearchQueryVariables = Exact<{
  fullSearch: Scalars['String'];
}>;

export type EquipmentModelSearchQuery = {
  __typename?: 'Query';
  fullTextSearch: Array<{
    __typename?: 'Equipment';
    createdAt: string;
    updatedAt: string;
    category: string;
    manufacturer: string;
    model: string;
    publicNotes?: string | null;
    cost?: number | null;
    powerDraw?: number | null;
    weight?: number | null;
    depth?: number | null;
    rackUnit?: number | null;
    frequencyRange?: string | null;
  }>;
};

export type FindAllItemsQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllItemsQuery = {
  __typename?: 'Query';
  findAllItems: Array<{
    __typename?: 'Item';
    id?: number | null;
    createdAt: string;
    updatedAt: string;
    cost?: number | null;
    model: string;
    weight?: number | null;
    publicNotes?: string | null;
    category: Categories;
    notes?: Array<string> | null;
    amplifier?: {
      __typename?: 'AmplifierItem';
      id?: number | null;
      total_inputs: number;
      total_outputs: number;
      midi?: MidiType | null;
      signal_protocol: Protocol;
      max_sample_rate: SampleRate;
      physical_connectivity: Array<{
        __typename?: 'PhysicalPort';
        port_identifier?: string | null;
        connector_type: Analog;
        signal_lines: number;
        input: boolean;
      }>;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      power?: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      } | null;
    } | null;
    console?: {
      __typename?: 'ConsoleItem';
      total_inputs: number;
      total_outputs: number;
      total_busses: number;
      physical_inputs: number;
      physical_outputs: number;
      aux_inputs: number;
      physical_aux_inputs: number;
      phantom_power_inputs: number;
      faders: number;
      motorized: boolean;
      midi?: MidiType | null;
      protocol_inputs: number;
      signal_protocol: Protocol;
      can_expand: boolean;
      max_sample_rate: SampleRate;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    computer?: {
      __typename?: 'ComputerItem';
      id?: number | null;
      cpu_processor: string;
      ram_size: number;
      total_storage: number;
      model_year?: string | null;
      operating_system?: string | null;
      dedicated_graphics: boolean;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      computer_ports: Array<{
        __typename?: 'ComputerPort';
        port_type: ComputerPortType;
        number_of_ports: number;
        front_port?: boolean | null;
        version?: string | null;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    processor?: {
      __typename?: 'ProcessingItem';
      total_inputs: number;
      total_outputs: number;
      physical_inputs: number;
      physical_outputs: number;
      midi: MidiType;
      protocol_inputs: number;
      signal_protocol: Protocol;
      max_sample_rate: SampleRate;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    network_item?: {
      __typename?: 'NetworkItem';
      id?: number | null;
      network_type: NetworkType;
      poe_ports: number;
      max_speed: number;
      fiber: boolean;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    microphone?: {
      __typename?: 'MicrophoneItem';
      id?: number | null;
      max_spl: number;
      phantom?: boolean | null;
      low_cut?: boolean | null;
      pad?: boolean | null;
      diaphragm_size?: number | null;
      output_impedance?: number | null;
      frequency_response?: string | null;
      connector?: Analog | null;
      microphone_type?: Array<MicrophoneType> | null;
    } | null;
    radio_item?: {
      __typename?: 'RFItem';
      id?: number | null;
      physical_range: number;
      lower_frequency_response: number;
      upper_frequency_response: number;
      transmitter: { __typename?: 'Transmitter'; connector: TransmitterConnector };
      reciever: {
        __typename?: 'Reciever';
        cascade_antenna: boolean;
        network_ports: Array<{
          __typename?: 'NetworkPort';
          protocol: Protocol;
          power_over_ethernet: boolean;
          port_identifier?: string | null;
          max_connection_speed: NetworkSpeeds;
        }>;
        physical_ports: Array<{
          __typename?: 'PhysicalPort';
          port_identifier?: string | null;
          connector_type: Analog;
          signal_lines: number;
          input: boolean;
        }>;
        power: {
          __typename?: 'IElectrical';
          wattage: number;
          redundant?: boolean | null;
          lower_voltage: number;
          max_wattage: number;
          input_connector: PowerConnector;
          output_connector?: PowerConnector | null;
        };
      };
    } | null;
    speaker_item?: {
      __typename?: 'SpeakerItem';
      id?: number | null;
      built_in_processing: boolean;
      wireless: boolean;
      max_spl: number;
      lower_frequency_response: number;
      upper_frequency_response: number;
      mounting_options: Array<string>;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      physical_connectivity: Array<{
        __typename?: 'PhysicalPort';
        port_identifier?: string | null;
        connector_type: Analog;
        signal_lines: number;
        input: boolean;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    monitoring_item?: {
      __typename?: 'MonitoringItem';
      id?: number | null;
      distro?: boolean | null;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      physical_connectivity?: Array<{
        __typename?: 'PhysicalPort';
        port_identifier?: string | null;
        connector_type: Analog;
        signal_lines: number;
        input: boolean;
      }> | null;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    dimensions?: {
      __typename?: 'Dimension';
      width: number;
      length: number;
      height: number;
      rack_unit?: number | null;
    } | null;
  }>;
};

export type AmpFragFragment = {
  __typename?: 'AmplifierItem';
  id?: number | null;
  total_inputs: number;
  total_outputs: number;
  midi?: MidiType | null;
  signal_protocol: Protocol;
  max_sample_rate: SampleRate;
  physical_connectivity: Array<{
    __typename?: 'PhysicalPort';
    port_identifier?: string | null;
    connector_type: Analog;
    signal_lines: number;
    input: boolean;
  }>;
  network_connectivity: Array<{
    __typename?: 'NetworkPort';
    protocol: Protocol;
    power_over_ethernet: boolean;
    port_identifier?: string | null;
    max_connection_speed: NetworkSpeeds;
  }>;
  power?: {
    __typename?: 'IElectrical';
    wattage: number;
    redundant?: boolean | null;
    lower_voltage: number;
    max_wattage: number;
    input_connector: PowerConnector;
    output_connector?: PowerConnector | null;
  } | null;
};

export type ComputerFragFragment = {
  __typename?: 'ComputerItem';
  id?: number | null;
  cpu_processor: string;
  ram_size: number;
  total_storage: number;
  model_year?: string | null;
  operating_system?: string | null;
  dedicated_graphics: boolean;
  network_connectivity: Array<{
    __typename?: 'NetworkPort';
    protocol: Protocol;
    power_over_ethernet: boolean;
    port_identifier?: string | null;
    max_connection_speed: NetworkSpeeds;
  }>;
  computer_ports: Array<{
    __typename?: 'ComputerPort';
    port_type: ComputerPortType;
    number_of_ports: number;
    front_port?: boolean | null;
    version?: string | null;
  }>;
  power: {
    __typename?: 'IElectrical';
    wattage: number;
    redundant?: boolean | null;
    lower_voltage: number;
    max_wattage: number;
    input_connector: PowerConnector;
    output_connector?: PowerConnector | null;
  };
};

export type ConsoleFragFragment = {
  __typename?: 'ConsoleItem';
  total_inputs: number;
  total_outputs: number;
  total_busses: number;
  physical_inputs: number;
  physical_outputs: number;
  aux_inputs: number;
  physical_aux_inputs: number;
  phantom_power_inputs: number;
  faders: number;
  motorized: boolean;
  midi?: MidiType | null;
  protocol_inputs: number;
  signal_protocol: Protocol;
  can_expand: boolean;
  max_sample_rate: SampleRate;
  power: {
    __typename?: 'IElectrical';
    wattage: number;
    redundant?: boolean | null;
    lower_voltage: number;
    max_wattage: number;
    input_connector: PowerConnector;
    output_connector?: PowerConnector | null;
  };
};

export type DimensionFragFragment = {
  __typename?: 'Dimension';
  width: number;
  length: number;
  height: number;
  rack_unit?: number | null;
};

export type GenericFragFragment = {
  __typename?: 'Item';
  id?: number | null;
  createdAt: string;
  updatedAt: string;
  cost?: number | null;
  model: string;
  weight?: number | null;
  publicNotes?: string | null;
  category: Categories;
  notes?: Array<string> | null;
  dimensions?: {
    __typename?: 'Dimension';
    width: number;
    length: number;
    height: number;
    rack_unit?: number | null;
  } | null;
};

export type MicrophoneFragFragment = {
  __typename?: 'MicrophoneItem';
  id?: number | null;
  max_spl: number;
  phantom?: boolean | null;
  low_cut?: boolean | null;
  pad?: boolean | null;
  diaphragm_size?: number | null;
  output_impedance?: number | null;
  frequency_response?: string | null;
  connector?: Analog | null;
  microphone_type?: Array<MicrophoneType> | null;
};

export type MonitoringFragFragment = {
  __typename?: 'MonitoringItem';
  id?: number | null;
  distro?: boolean | null;
  network_connectivity: Array<{
    __typename?: 'NetworkPort';
    protocol: Protocol;
    power_over_ethernet: boolean;
    port_identifier?: string | null;
    max_connection_speed: NetworkSpeeds;
  }>;
  physical_connectivity?: Array<{
    __typename?: 'PhysicalPort';
    port_identifier?: string | null;
    connector_type: Analog;
    signal_lines: number;
    input: boolean;
  }> | null;
  power: {
    __typename?: 'IElectrical';
    wattage: number;
    redundant?: boolean | null;
    lower_voltage: number;
    max_wattage: number;
    input_connector: PowerConnector;
    output_connector?: PowerConnector | null;
  };
};

export type NetworkFragFragment = {
  __typename?: 'NetworkPort';
  protocol: Protocol;
  power_over_ethernet: boolean;
  port_identifier?: string | null;
  max_connection_speed: NetworkSpeeds;
};

export type NetworkItemFragFragment = {
  __typename?: 'NetworkItem';
  id?: number | null;
  network_type: NetworkType;
  poe_ports: number;
  max_speed: number;
  fiber: boolean;
  network_connectivity: Array<{
    __typename?: 'NetworkPort';
    protocol: Protocol;
    power_over_ethernet: boolean;
    port_identifier?: string | null;
    max_connection_speed: NetworkSpeeds;
  }>;
  power: {
    __typename?: 'IElectrical';
    wattage: number;
    redundant?: boolean | null;
    lower_voltage: number;
    max_wattage: number;
    input_connector: PowerConnector;
    output_connector?: PowerConnector | null;
  };
};

export type PhysicalPortFragFragment = {
  __typename?: 'PhysicalPort';
  port_identifier?: string | null;
  connector_type: Analog;
  signal_lines: number;
  input: boolean;
};

export type PowerFragFragment = {
  __typename?: 'IElectrical';
  wattage: number;
  redundant?: boolean | null;
  lower_voltage: number;
  max_wattage: number;
  input_connector: PowerConnector;
  output_connector?: PowerConnector | null;
};

export type ProcessorFragFragment = {
  __typename?: 'ProcessingItem';
  total_inputs: number;
  total_outputs: number;
  physical_inputs: number;
  physical_outputs: number;
  midi: MidiType;
  protocol_inputs: number;
  signal_protocol: Protocol;
  max_sample_rate: SampleRate;
  network_connectivity: Array<{
    __typename?: 'NetworkPort';
    protocol: Protocol;
    power_over_ethernet: boolean;
    port_identifier?: string | null;
    max_connection_speed: NetworkSpeeds;
  }>;
  power: {
    __typename?: 'IElectrical';
    wattage: number;
    redundant?: boolean | null;
    lower_voltage: number;
    max_wattage: number;
    input_connector: PowerConnector;
    output_connector?: PowerConnector | null;
  };
};

export type RadioFragFragment = {
  __typename?: 'RFItem';
  id?: number | null;
  physical_range: number;
  lower_frequency_response: number;
  upper_frequency_response: number;
  transmitter: { __typename?: 'Transmitter'; connector: TransmitterConnector };
  reciever: {
    __typename?: 'Reciever';
    cascade_antenna: boolean;
    network_ports: Array<{
      __typename?: 'NetworkPort';
      protocol: Protocol;
      power_over_ethernet: boolean;
      port_identifier?: string | null;
      max_connection_speed: NetworkSpeeds;
    }>;
    physical_ports: Array<{
      __typename?: 'PhysicalPort';
      port_identifier?: string | null;
      connector_type: Analog;
      signal_lines: number;
      input: boolean;
    }>;
    power: {
      __typename?: 'IElectrical';
      wattage: number;
      redundant?: boolean | null;
      lower_voltage: number;
      max_wattage: number;
      input_connector: PowerConnector;
      output_connector?: PowerConnector | null;
    };
  };
};

export type SpeakerFragFragment = {
  __typename?: 'SpeakerItem';
  id?: number | null;
  built_in_processing: boolean;
  wireless: boolean;
  max_spl: number;
  lower_frequency_response: number;
  upper_frequency_response: number;
  mounting_options: Array<string>;
  network_connectivity: Array<{
    __typename?: 'NetworkPort';
    protocol: Protocol;
    power_over_ethernet: boolean;
    port_identifier?: string | null;
    max_connection_speed: NetworkSpeeds;
  }>;
  physical_connectivity: Array<{
    __typename?: 'PhysicalPort';
    port_identifier?: string | null;
    connector_type: Analog;
    signal_lines: number;
    input: boolean;
  }>;
  power: {
    __typename?: 'IElectrical';
    wattage: number;
    redundant?: boolean | null;
    lower_voltage: number;
    max_wattage: number;
    input_connector: PowerConnector;
    output_connector?: PowerConnector | null;
  };
};

export type FuzzyItemSearchQueryVariables = Exact<{
  model: Scalars['String'];
}>;

export type FuzzyItemSearchQuery = {
  __typename?: 'Query';
  fuzzyItemSearch: Array<{
    __typename?: 'Item';
    id?: number | null;
    createdAt: string;
    updatedAt: string;
    cost?: number | null;
    model: string;
    weight?: number | null;
    publicNotes?: string | null;
    category: Categories;
    notes?: Array<string> | null;
    amplifier?: {
      __typename?: 'AmplifierItem';
      id?: number | null;
      total_inputs: number;
      total_outputs: number;
      midi?: MidiType | null;
      signal_protocol: Protocol;
      max_sample_rate: SampleRate;
      physical_connectivity: Array<{
        __typename?: 'PhysicalPort';
        port_identifier?: string | null;
        connector_type: Analog;
        signal_lines: number;
        input: boolean;
      }>;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      power?: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      } | null;
    } | null;
    console?: {
      __typename?: 'ConsoleItem';
      total_inputs: number;
      total_outputs: number;
      total_busses: number;
      physical_inputs: number;
      physical_outputs: number;
      aux_inputs: number;
      physical_aux_inputs: number;
      phantom_power_inputs: number;
      faders: number;
      motorized: boolean;
      midi?: MidiType | null;
      protocol_inputs: number;
      signal_protocol: Protocol;
      can_expand: boolean;
      max_sample_rate: SampleRate;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    computer?: {
      __typename?: 'ComputerItem';
      id?: number | null;
      cpu_processor: string;
      ram_size: number;
      total_storage: number;
      model_year?: string | null;
      operating_system?: string | null;
      dedicated_graphics: boolean;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      computer_ports: Array<{
        __typename?: 'ComputerPort';
        port_type: ComputerPortType;
        number_of_ports: number;
        front_port?: boolean | null;
        version?: string | null;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    processor?: {
      __typename?: 'ProcessingItem';
      total_inputs: number;
      total_outputs: number;
      physical_inputs: number;
      physical_outputs: number;
      midi: MidiType;
      protocol_inputs: number;
      signal_protocol: Protocol;
      max_sample_rate: SampleRate;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    network_item?: {
      __typename?: 'NetworkItem';
      id?: number | null;
      network_type: NetworkType;
      poe_ports: number;
      max_speed: number;
      fiber: boolean;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    microphone?: {
      __typename?: 'MicrophoneItem';
      id?: number | null;
      max_spl: number;
      phantom?: boolean | null;
      low_cut?: boolean | null;
      pad?: boolean | null;
      diaphragm_size?: number | null;
      output_impedance?: number | null;
      frequency_response?: string | null;
      connector?: Analog | null;
      microphone_type?: Array<MicrophoneType> | null;
    } | null;
    radio_item?: {
      __typename?: 'RFItem';
      id?: number | null;
      physical_range: number;
      lower_frequency_response: number;
      upper_frequency_response: number;
      transmitter: { __typename?: 'Transmitter'; connector: TransmitterConnector };
      reciever: {
        __typename?: 'Reciever';
        cascade_antenna: boolean;
        network_ports: Array<{
          __typename?: 'NetworkPort';
          protocol: Protocol;
          power_over_ethernet: boolean;
          port_identifier?: string | null;
          max_connection_speed: NetworkSpeeds;
        }>;
        physical_ports: Array<{
          __typename?: 'PhysicalPort';
          port_identifier?: string | null;
          connector_type: Analog;
          signal_lines: number;
          input: boolean;
        }>;
        power: {
          __typename?: 'IElectrical';
          wattage: number;
          redundant?: boolean | null;
          lower_voltage: number;
          max_wattage: number;
          input_connector: PowerConnector;
          output_connector?: PowerConnector | null;
        };
      };
    } | null;
    speaker_item?: {
      __typename?: 'SpeakerItem';
      id?: number | null;
      built_in_processing: boolean;
      wireless: boolean;
      max_spl: number;
      lower_frequency_response: number;
      upper_frequency_response: number;
      mounting_options: Array<string>;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      physical_connectivity: Array<{
        __typename?: 'PhysicalPort';
        port_identifier?: string | null;
        connector_type: Analog;
        signal_lines: number;
        input: boolean;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    monitoring_item?: {
      __typename?: 'MonitoringItem';
      id?: number | null;
      distro?: boolean | null;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      physical_connectivity?: Array<{
        __typename?: 'PhysicalPort';
        port_identifier?: string | null;
        connector_type: Analog;
        signal_lines: number;
        input: boolean;
      }> | null;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    dimensions?: {
      __typename?: 'Dimension';
      width: number;
      length: number;
      height: number;
      rack_unit?: number | null;
    } | null;
  }>;
};

export type GetEquipmentQueryVariables = Exact<{
  model: Scalars['String'];
}>;

export type GetEquipmentQuery = {
  __typename?: 'Query';
  getEquipment?: {
    __typename?: 'Equipment';
    createdAt: string;
    updatedAt: string;
    category: string;
    manufacturer: string;
    model: string;
    publicNotes?: string | null;
    cost?: number | null;
    powerDraw?: number | null;
    weight?: number | null;
    depth?: number | null;
    rackUnit?: number | null;
    frequencyRange?: string | null;
  } | null;
};

export type GlobalItemSearchQueryVariables = Exact<{
  model: Scalars['String'];
}>;

export type GlobalItemSearchQuery = {
  __typename?: 'Query';
  fuzzyItemSearch: Array<{
    __typename?: 'Item';
    id?: number | null;
    createdAt: string;
    updatedAt: string;
    cost?: number | null;
    model: string;
    weight?: number | null;
    publicNotes?: string | null;
    category: Categories;
    notes?: Array<string> | null;
    processor?: {
      __typename?: 'ProcessingItem';
      total_inputs: number;
      total_outputs: number;
      physical_inputs: number;
      physical_outputs: number;
      midi: MidiType;
      protocol_inputs: number;
      signal_protocol: Protocol;
      max_sample_rate: SampleRate;
      network_connectivity: Array<{
        __typename?: 'NetworkPort';
        protocol: Protocol;
        power_over_ethernet: boolean;
        port_identifier?: string | null;
        max_connection_speed: NetworkSpeeds;
      }>;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    console?: {
      __typename?: 'ConsoleItem';
      total_inputs: number;
      total_outputs: number;
      total_busses: number;
      physical_inputs: number;
      physical_outputs: number;
      aux_inputs: number;
      physical_aux_inputs: number;
      phantom_power_inputs: number;
      faders: number;
      motorized: boolean;
      midi?: MidiType | null;
      protocol_inputs: number;
      signal_protocol: Protocol;
      can_expand: boolean;
      max_sample_rate: SampleRate;
      power: {
        __typename?: 'IElectrical';
        wattage: number;
        redundant?: boolean | null;
        lower_voltage: number;
        max_wattage: number;
        input_connector: PowerConnector;
        output_connector?: PowerConnector | null;
      };
    } | null;
    dimensions?: {
      __typename?: 'Dimension';
      width: number;
      length: number;
      height: number;
      rack_unit?: number | null;
    } | null;
  }>;
};

export type LoginUserMutationVariables = Exact<{
  inputOptions: UserInput;
}>;

export type LoginUserMutation = {
  __typename?: 'Mutation';
  loginUser: {
    __typename?: 'UserResponse';
    accessToken: string;
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    user?: { __typename?: 'User'; createdAt: string; updatedAt: string; id: number; email: string } | null;
  };
};

export type UpdateEquipmentMutationVariables = Exact<{
  updateOptions: EquipmentInput;
  updateEquipmentId: Scalars['Int'];
}>;

export type UpdateEquipmentMutation = {
  __typename?: 'Mutation';
  updateEquipment?: {
    __typename?: 'EquipmentResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    equipment?: {
      __typename?: 'Equipment';
      id: number;
      createdAt: string;
      updatedAt: string;
      category: string;
      manufacturer: string;
      model: string;
      publicNotes?: string | null;
      cost?: number | null;
      powerDraw?: number | null;
      weight?: number | null;
      depth?: number | null;
      rackUnit?: number | null;
      frequencyRange?: string | null;
    } | null;
    equipmentItems?: Array<{
      __typename?: 'Equipment';
      id: number;
      createdAt: string;
      updatedAt: string;
      category: string;
      manufacturer: string;
      model: string;
      publicNotes?: string | null;
      cost?: number | null;
      powerDraw?: number | null;
      weight?: number | null;
      depth?: number | null;
      rackUnit?: number | null;
      frequencyRange?: string | null;
    }> | null;
  } | null;
};

export type ByeQueryVariables = Exact<{ [key: string]: never }>;

export type ByeQuery = { __typename?: 'Query'; bye: string };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; id: number; createdAt: string; updatedAt: string; email: string } | null;
};

export const PhysicalPortFragFragmentDoc = gql`
  fragment PhysicalPortFrag on PhysicalPort {
    port_identifier
    connector_type
    signal_lines
    input
  }
`;
export const NetworkFragFragmentDoc = gql`
  fragment NetworkFrag on NetworkPort {
    protocol
    power_over_ethernet
    port_identifier
    max_connection_speed
  }
`;
export const PowerFragFragmentDoc = gql`
  fragment PowerFrag on IElectrical {
    wattage
    redundant
    lower_voltage
    max_wattage
    input_connector
    output_connector
  }
`;
export const AmpFragFragmentDoc = gql`
  fragment AmpFrag on AmplifierItem {
    id
    total_inputs
    total_outputs
    midi
    physical_connectivity {
      ...PhysicalPortFrag
    }
    network_connectivity {
      ...NetworkFrag
    }
    signal_protocol
    max_sample_rate
    power {
      ...PowerFrag
    }
  }
  ${PhysicalPortFragFragmentDoc}
  ${NetworkFragFragmentDoc}
  ${PowerFragFragmentDoc}
`;
export const ComputerFragFragmentDoc = gql`
  fragment ComputerFrag on ComputerItem {
    id
    cpu_processor
    ram_size
    total_storage
    model_year
    operating_system
    dedicated_graphics
    network_connectivity {
      ...NetworkFrag
    }
    computer_ports {
      port_type
      number_of_ports
      front_port
      version
    }
    power {
      ...PowerFrag
    }
  }
  ${NetworkFragFragmentDoc}
  ${PowerFragFragmentDoc}
`;
export const ConsoleFragFragmentDoc = gql`
  fragment ConsoleFrag on ConsoleItem {
    total_inputs
    total_outputs
    total_busses
    physical_inputs
    physical_outputs
    aux_inputs
    physical_aux_inputs
    phantom_power_inputs
    faders
    motorized
    midi
    protocol_inputs
    signal_protocol
    can_expand
    max_sample_rate
    power {
      ...PowerFrag
    }
  }
  ${PowerFragFragmentDoc}
`;
export const DimensionFragFragmentDoc = gql`
  fragment DimensionFrag on Dimension {
    width
    length
    height
    rack_unit
  }
`;
export const GenericFragFragmentDoc = gql`
  fragment GenericFrag on Item {
    id
    createdAt
    updatedAt
    cost
    model
    weight
    publicNotes
    category
    notes
    dimensions {
      ...DimensionFrag
    }
  }
  ${DimensionFragFragmentDoc}
`;
export const MicrophoneFragFragmentDoc = gql`
  fragment MicrophoneFrag on MicrophoneItem {
    id
    max_spl
    phantom
    low_cut
    pad
    diaphragm_size
    output_impedance
    frequency_response
    connector
    microphone_type
  }
`;
export const MonitoringFragFragmentDoc = gql`
  fragment MonitoringFrag on MonitoringItem {
    id
    distro
    network_connectivity {
      ...NetworkFrag
    }
    physical_connectivity {
      ...PhysicalPortFrag
    }
    power {
      ...PowerFrag
    }
  }
  ${NetworkFragFragmentDoc}
  ${PhysicalPortFragFragmentDoc}
  ${PowerFragFragmentDoc}
`;
export const NetworkItemFragFragmentDoc = gql`
  fragment NetworkItemFrag on NetworkItem {
    id
    network_type
    poe_ports
    max_speed
    fiber
    network_connectivity {
      ...NetworkFrag
    }
    power {
      ...PowerFrag
    }
  }
  ${NetworkFragFragmentDoc}
  ${PowerFragFragmentDoc}
`;
export const ProcessorFragFragmentDoc = gql`
  fragment ProcessorFrag on ProcessingItem {
    total_inputs
    total_outputs
    physical_inputs
    physical_outputs
    midi
    protocol_inputs
    signal_protocol
    max_sample_rate
    network_connectivity {
      ...NetworkFrag
    }
    power {
      ...PowerFrag
    }
  }
  ${NetworkFragFragmentDoc}
  ${PowerFragFragmentDoc}
`;
export const RadioFragFragmentDoc = gql`
  fragment RadioFrag on RFItem {
    id
    physical_range
    lower_frequency_response
    upper_frequency_response
    transmitter {
      connector
    }
    reciever {
      network_ports {
        ...NetworkFrag
      }
      physical_ports {
        ...PhysicalPortFrag
      }
      cascade_antenna
      power {
        ...PowerFrag
      }
    }
  }
  ${NetworkFragFragmentDoc}
  ${PhysicalPortFragFragmentDoc}
  ${PowerFragFragmentDoc}
`;
export const SpeakerFragFragmentDoc = gql`
  fragment SpeakerFrag on SpeakerItem {
    id
    built_in_processing
    wireless
    max_spl
    lower_frequency_response
    upper_frequency_response
    mounting_options
    network_connectivity {
      ...NetworkFrag
    }
    physical_connectivity {
      ...PhysicalPortFrag
    }
    power {
      ...PowerFrag
    }
  }
  ${NetworkFragFragmentDoc}
  ${PhysicalPortFragFragmentDoc}
  ${PowerFragFragmentDoc}
`;
export const CreateEquipmentDoc = gql`
  mutation CreateEquipment($inputOptions: EquipmentInput!) {
    createEquipment(inputOptions: $inputOptions) {
      equipment {
        createdAt
        updatedAt
        category
        manufacturer
        model
        publicNotes
        cost
        powerDraw
        weight
        depth
        rackUnit
        frequencyRange
      }
      errors {
        field
        message
      }
      equipmentItems {
        id
        createdAt
        updatedAt
        category
        manufacturer
        model
        publicNotes
        cost
        powerDraw
        weight
        depth
        rackUnit
        frequencyRange
      }
    }
  }
`;
export const CreateAmplifierItemDoc = gql`
  mutation CreateAmplifierItem($itemInput: ItemInput!) {
    createItem(itemInput: $itemInput) {
      errors {
        field
        message
      }
      item {
        ...GenericFrag
        amplifier {
          ...AmpFrag
        }
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${AmpFragFragmentDoc}
`;
export const CreateComputerItemDoc = gql`
  mutation CreateComputerItem($itemInput: ItemInput!) {
    createItem(itemInput: $itemInput) {
      errors {
        field
        message
      }
      item {
        ...GenericFrag
        computer {
          ...ComputerFrag
        }
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${ComputerFragFragmentDoc}
`;
export const CreateConsoleItemDoc = gql`
  mutation CreateConsoleItem($itemInput: ItemInput!) {
    createItem(itemInput: $itemInput) {
      errors {
        field
        message
      }
      item {
        ...GenericFrag
        console {
          ...ConsoleFrag
        }
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${ConsoleFragFragmentDoc}
`;
export const CreateMicrophoneItemDoc = gql`
  mutation CreateMicrophoneItem($itemInput: ItemInput!) {
    createItem(itemInput: $itemInput) {
      errors {
        field
        message
      }
      item {
        ...GenericFrag
        microphone {
          ...MicrophoneFrag
        }
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${MicrophoneFragFragmentDoc}
`;
export const CreateMonitoringItemDoc = gql`
  mutation CreateMonitoringItem($itemInput: ItemInput!) {
    createItem(itemInput: $itemInput) {
      errors {
        field
        message
      }
      item {
        ...GenericFrag
        monitoring_item {
          ...MonitoringFrag
        }
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${MonitoringFragFragmentDoc}
`;
export const CreateProcessingItemDoc = gql`
  mutation CreateProcessingItem($itemInput: ItemInput!) {
    createItem(itemInput: $itemInput) {
      errors {
        field
        message
      }
      item {
        ...GenericFrag
        processor {
          ...ProcessorFrag
        }
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${ProcessorFragFragmentDoc}
`;
export const EquipmentModelSearchDoc = gql`
  query EquipmentModelSearch($fullSearch: String!) {
    fullTextSearch(fullSearch: $fullSearch) {
      createdAt
      updatedAt
      category
      manufacturer
      model
      publicNotes
      cost
      powerDraw
      weight
      depth
      rackUnit
      frequencyRange
    }
  }
`;
export const FindAllItemsDoc = gql`
  query FindAllItems {
    findAllItems {
      ...GenericFrag
      amplifier {
        ...AmpFrag
      }
      console {
        ...ConsoleFrag
      }
      computer {
        ...ComputerFrag
      }
      processor {
        ...ProcessorFrag
      }
      network_item {
        ...NetworkItemFrag
      }
      microphone {
        ...MicrophoneFrag
      }
      radio_item {
        ...RadioFrag
      }
      speaker_item {
        ...SpeakerFrag
      }
      monitoring_item {
        ...MonitoringFrag
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${AmpFragFragmentDoc}
  ${ConsoleFragFragmentDoc}
  ${ComputerFragFragmentDoc}
  ${ProcessorFragFragmentDoc}
  ${NetworkItemFragFragmentDoc}
  ${MicrophoneFragFragmentDoc}
  ${RadioFragFragmentDoc}
  ${SpeakerFragFragmentDoc}
  ${MonitoringFragFragmentDoc}
`;
export const FuzzyItemSearchDoc = gql`
  query FuzzyItemSearch($model: String!) {
    fuzzyItemSearch(model: $model) {
      ...GenericFrag
      amplifier {
        ...AmpFrag
      }
      console {
        ...ConsoleFrag
      }
      computer {
        ...ComputerFrag
      }
      processor {
        ...ProcessorFrag
      }
      network_item {
        ...NetworkItemFrag
      }
      microphone {
        ...MicrophoneFrag
      }
      radio_item {
        ...RadioFrag
      }
      speaker_item {
        ...SpeakerFrag
      }
      monitoring_item {
        ...MonitoringFrag
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${AmpFragFragmentDoc}
  ${ConsoleFragFragmentDoc}
  ${ComputerFragFragmentDoc}
  ${ProcessorFragFragmentDoc}
  ${NetworkItemFragFragmentDoc}
  ${MicrophoneFragFragmentDoc}
  ${RadioFragFragmentDoc}
  ${SpeakerFragFragmentDoc}
  ${MonitoringFragFragmentDoc}
`;
export const GetEquipmentDoc = gql`
  query GetEquipment($model: String!) {
    getEquipment(model: $model) {
      createdAt
      updatedAt
      category
      manufacturer
      model
      publicNotes
      cost
      powerDraw
      weight
      depth
      rackUnit
      frequencyRange
    }
  }
`;
export const GlobalItemSearchDoc = gql`
  query GlobalItemSearch($model: String!) {
    fuzzyItemSearch(model: $model) {
      ...GenericFrag
      processor {
        ...ProcessorFrag
      }
      console {
        ...ConsoleFrag
      }
    }
  }
  ${GenericFragFragmentDoc}
  ${ProcessorFragFragmentDoc}
  ${ConsoleFragFragmentDoc}
`;
export const LoginUserDoc = gql`
  mutation LoginUser($inputOptions: UserInput!) {
    loginUser(inputOptions: $inputOptions) {
      errors {
        field
        message
      }
      user {
        createdAt
        updatedAt
        id
        email
      }
      accessToken
    }
  }
`;
export const UpdateEquipmentDoc = gql`
  mutation UpdateEquipment($updateOptions: EquipmentInput!, $updateEquipmentId: Int!) {
    updateEquipment(updateOptions: $updateOptions, id: $updateEquipmentId) {
      errors {
        field
        message
      }
      equipment {
        id
        createdAt
        updatedAt
        category
        manufacturer
        model
        publicNotes
        cost
        powerDraw
        weight
        depth
        rackUnit
        frequencyRange
      }
      equipmentItems {
        id
        createdAt
        updatedAt
        category
        manufacturer
        model
        publicNotes
        cost
        powerDraw
        weight
        depth
        rackUnit
        frequencyRange
      }
    }
  }
`;
export const ByeDoc = gql`
  query Bye {
    bye
  }
`;
export const MeDoc = gql`
  query Me {
    me: me {
      id
      createdAt
      updatedAt
      email
    }
  }
`;
export const CreateEquipment = (options: Omit<MutationOptions<any, CreateEquipmentMutationVariables>, 'mutation'>) => {
  const m = client.mutate<CreateEquipmentMutation, CreateEquipmentMutationVariables>({
    mutation: CreateEquipmentDoc,
    ...options,
  });
  return m;
};
export const CreateAmplifierItem = (
  options: Omit<MutationOptions<any, CreateAmplifierItemMutationVariables>, 'mutation'>
) => {
  const m = client.mutate<CreateAmplifierItemMutation, CreateAmplifierItemMutationVariables>({
    mutation: CreateAmplifierItemDoc,
    ...options,
  });
  return m;
};
export const CreateComputerItem = (
  options: Omit<MutationOptions<any, CreateComputerItemMutationVariables>, 'mutation'>
) => {
  const m = client.mutate<CreateComputerItemMutation, CreateComputerItemMutationVariables>({
    mutation: CreateComputerItemDoc,
    ...options,
  });
  return m;
};
export const CreateConsoleItem = (
  options: Omit<MutationOptions<any, CreateConsoleItemMutationVariables>, 'mutation'>
) => {
  const m = client.mutate<CreateConsoleItemMutation, CreateConsoleItemMutationVariables>({
    mutation: CreateConsoleItemDoc,
    ...options,
  });
  return m;
};
export const CreateMicrophoneItem = (
  options: Omit<MutationOptions<any, CreateMicrophoneItemMutationVariables>, 'mutation'>
) => {
  const m = client.mutate<CreateMicrophoneItemMutation, CreateMicrophoneItemMutationVariables>({
    mutation: CreateMicrophoneItemDoc,
    ...options,
  });
  return m;
};
export const CreateMonitoringItem = (
  options: Omit<MutationOptions<any, CreateMonitoringItemMutationVariables>, 'mutation'>
) => {
  const m = client.mutate<CreateMonitoringItemMutation, CreateMonitoringItemMutationVariables>({
    mutation: CreateMonitoringItemDoc,
    ...options,
  });
  return m;
};
export const CreateProcessingItem = (
  options: Omit<MutationOptions<any, CreateProcessingItemMutationVariables>, 'mutation'>
) => {
  const m = client.mutate<CreateProcessingItemMutation, CreateProcessingItemMutationVariables>({
    mutation: CreateProcessingItemDoc,
    ...options,
  });
  return m;
};
export const EquipmentModelSearch = (
  options: Omit<WatchQueryOptions<EquipmentModelSearchQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<EquipmentModelSearchQuery> & {
    query: ObservableQuery<EquipmentModelSearchQuery, EquipmentModelSearchQueryVariables>;
  }
> => {
  const q = client.watchQuery({
    query: EquipmentModelSearchDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<EquipmentModelSearchQuery> & {
      query: ObservableQuery<EquipmentModelSearchQuery, EquipmentModelSearchQueryVariables>;
    }
  >({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
    q.subscribe((v: any) => {
      set({ ...v, query: q });
    });
  });
  return result;
};

export const AsyncEquipmentModelSearch = (options: Omit<QueryOptions<EquipmentModelSearchQueryVariables>, 'query'>) => {
  return client.query<EquipmentModelSearchQuery>({ query: EquipmentModelSearchDoc, ...options });
};

export const FindAllItems = (
  options: Omit<WatchQueryOptions<FindAllItemsQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<FindAllItemsQuery> & {
    query: ObservableQuery<FindAllItemsQuery, FindAllItemsQueryVariables>;
  }
> => {
  const q = client.watchQuery({
    query: FindAllItemsDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<FindAllItemsQuery> & {
      query: ObservableQuery<FindAllItemsQuery, FindAllItemsQueryVariables>;
    }
  >({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
    q.subscribe((v: any) => {
      set({ ...v, query: q });
    });
  });
  return result;
};

export const AsyncFindAllItems = (options: Omit<QueryOptions<FindAllItemsQueryVariables>, 'query'>) => {
  return client.query<FindAllItemsQuery>({ query: FindAllItemsDoc, ...options });
};

export const FuzzyItemSearch = (
  options: Omit<WatchQueryOptions<FuzzyItemSearchQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<FuzzyItemSearchQuery> & {
    query: ObservableQuery<FuzzyItemSearchQuery, FuzzyItemSearchQueryVariables>;
  }
> => {
  const q = client.watchQuery({
    query: FuzzyItemSearchDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<FuzzyItemSearchQuery> & {
      query: ObservableQuery<FuzzyItemSearchQuery, FuzzyItemSearchQueryVariables>;
    }
  >({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
    q.subscribe((v: any) => {
      set({ ...v, query: q });
    });
  });
  return result;
};

export const AsyncFuzzyItemSearch = (options: Omit<QueryOptions<FuzzyItemSearchQueryVariables>, 'query'>) => {
  return client.query<FuzzyItemSearchQuery>({ query: FuzzyItemSearchDoc, ...options });
};

export const GetEquipment = (
  options: Omit<WatchQueryOptions<GetEquipmentQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<GetEquipmentQuery> & {
    query: ObservableQuery<GetEquipmentQuery, GetEquipmentQueryVariables>;
  }
> => {
  const q = client.watchQuery({
    query: GetEquipmentDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<GetEquipmentQuery> & {
      query: ObservableQuery<GetEquipmentQuery, GetEquipmentQueryVariables>;
    }
  >({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
    q.subscribe((v: any) => {
      set({ ...v, query: q });
    });
  });
  return result;
};

export const AsyncGetEquipment = (options: Omit<QueryOptions<GetEquipmentQueryVariables>, 'query'>) => {
  return client.query<GetEquipmentQuery>({ query: GetEquipmentDoc, ...options });
};

export const GlobalItemSearch = (
  options: Omit<WatchQueryOptions<GlobalItemSearchQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<GlobalItemSearchQuery> & {
    query: ObservableQuery<GlobalItemSearchQuery, GlobalItemSearchQueryVariables>;
  }
> => {
  const q = client.watchQuery({
    query: GlobalItemSearchDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<GlobalItemSearchQuery> & {
      query: ObservableQuery<GlobalItemSearchQuery, GlobalItemSearchQueryVariables>;
    }
  >({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
    q.subscribe((v: any) => {
      set({ ...v, query: q });
    });
  });
  return result;
};

export const AsyncGlobalItemSearch = (options: Omit<QueryOptions<GlobalItemSearchQueryVariables>, 'query'>) => {
  return client.query<GlobalItemSearchQuery>({ query: GlobalItemSearchDoc, ...options });
};

export const LoginUser = (options: Omit<MutationOptions<any, LoginUserMutationVariables>, 'mutation'>) => {
  const m = client.mutate<LoginUserMutation, LoginUserMutationVariables>({
    mutation: LoginUserDoc,
    ...options,
  });
  return m;
};
export const UpdateEquipment = (options: Omit<MutationOptions<any, UpdateEquipmentMutationVariables>, 'mutation'>) => {
  const m = client.mutate<UpdateEquipmentMutation, UpdateEquipmentMutationVariables>({
    mutation: UpdateEquipmentDoc,
    ...options,
  });
  return m;
};
export const Bye = (
  options: Omit<WatchQueryOptions<ByeQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<ByeQuery> & {
    query: ObservableQuery<ByeQuery, ByeQueryVariables>;
  }
> => {
  const q = client.watchQuery({
    query: ByeDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<ByeQuery> & {
      query: ObservableQuery<ByeQuery, ByeQueryVariables>;
    }
  >({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
    q.subscribe((v: any) => {
      set({ ...v, query: q });
    });
  });
  return result;
};

export const AsyncBye = (options: Omit<QueryOptions<ByeQueryVariables>, 'query'>) => {
  return client.query<ByeQuery>({ query: ByeDoc, ...options });
};

export const Me = (
  options: Omit<WatchQueryOptions<MeQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<MeQuery> & {
    query: ObservableQuery<MeQuery, MeQueryVariables>;
  }
> => {
  const q = client.watchQuery({
    query: MeDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<MeQuery> & {
      query: ObservableQuery<MeQuery, MeQueryVariables>;
    }
  >({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
    q.subscribe((v: any) => {
      set({ ...v, query: q });
    });
  });
  return result;
};

export const AsyncMe = (options: Omit<QueryOptions<MeQueryVariables>, 'query'>) => {
  return client.query<MeQuery>({ query: MeDoc, ...options });
};
