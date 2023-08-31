export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export enum Category {
  Console = "CONSOLE",
  Processor = "PROCESSOR",
  Monitoring = "MONITORING",
  Speaker = "SPEAKER",
  Amplifier = "AMPLIFIER",
  Computer = "COMPUTER",
  Network = "NETWORK",
  Radio = "RADIO",
  Microphones = "MICROPHONES",
  SpkHardware = "SPK_HARDWARE",
  Generic = "GENERIC"
}

export enum SampleRate {
  Sd = "SD",
  Hd = "HD",
  Uhd = "UHD"
}

export enum MidiType {
  Usb = "USB",
  Serial = "SERIAL"
}

export enum Analog {
  XlrAnalog = "XLR_ANALOG",
  XlrDigital = "XLR_DIGITAL",
  Ts = "TS",
  Trs = "TRS",
  Trrs = "TRRS",
  TriPinPhoenix = "TRI_PIN_PHOENIX",
  DualPinPhoenix = "DUAL_PIN_PHOENIX",
  Nl2 = "NL2",
  Nl4 = "NL4",
  Nl8 = "NL8",
  Dc_12V = "DC_12V"
}

export enum AnalogUsage {
  Input = "INPUT",
  Input_48V = "INPUT_48V",
  Output = "OUTPUT",
  Aux = "AUX"
}

export enum PowerConnector {
  Iec = "IEC",
  Edison = "EDISON",
  Edison_20A = "EDISON_20A",
  Powercon_20A = "POWERCON_20A",
  Powercon_32A = "POWERCON_32A",
  PowerconTrue1 = "POWERCON_TRUE1",
  PowerconTrue1Top = "POWERCON_TRUE1_TOP",
  L6_20 = "L6_20",
  L6_30 = "L6_30",
  L6_50 = "L6_50",
  L6_60 = "L6_60"
}

export enum Protocol {
  Dante = "DANTE",
  Aes_67 = "AES_67",
  Avb = "AVB",
  AvbMilan = "AVB_MILAN",
  Optocore = "OPTOCORE",
  Ultranet = "ULTRANET",
  ANet = "A_NET",
  Ip = "IP"
}

export enum ComputerConnKind {
  UsbA = "USB_A",
  UsbB = "USB_B",
  UsbC = "USB_C",
  Hdmi = "HDMI",
  MiniHdmi = "MINI_HDMI",
  Displayport = "DISPLAYPORT",
  MiniDisplayport = "MINI_DISPLAYPORT",
  MircoB = "MIRCO_B",
  SdCard = "SD_CARD",
  Firewire = "FIREWIRE",
  UsbCThunderbolt = "USB_C_THUNDERBOLT"
}

export enum NetworkType {
  SwitchManaged = "SWITCH_MANAGED",
  SwitchUnmanaged = "SWITCH_UNMANAGED",
  Router = "ROUTER",
  AccessPoint = "ACCESS_POINT",
  RouterSwAp = "ROUTER_SW_AP",
  Injector = "INJECTOR",
  Modem = "MODEM",
  Nic = "NIC",
  Repeater = "REPEATER",
  NetworkBridge = "NETWORK_BRIDGE"
}

export enum MicrophoneType {
  PrePoloraizedCondensor = "PRE_POLORAIZED_CONDENSOR",
  Condensor = "CONDENSOR",
  Ribbon = "RIBBON",
  Dynamic = "DYNAMIC"
}

export enum PolarPattern {
  Supercardioid = "SUPERCARDIOID",
  Cardioid = "CARDIOID",
  Omni = "OMNI",
  Hypercardioid = "HYPERCARDIOID",
  Figure_8 = "FIGURE_8"
}

export enum DiaphagmSize {
  Small = "SMALL",
  Med = "MED",
  Large = "LARGE"
}

export enum TransmitterConnector {
  ShureTa4 = "SHURE_TA4",
  Microdot = "MICRODOT",
  Trrs = "TRRS",
  TriPin = "TRI_PIN"
}

export enum NetworkSpeed {
  Superspeed = "SUPERSPEED",
  Gigabit = "GIGABIT",
  TenGigabit = "TEN_GIGABIT"
}

export type ConsoleInput = {
  analog_connections?: Maybe<Array<AnalogConnInput>>
  network_connections?: Maybe<Array<NetworkConnInput>>
  faders: Scalars["Int"]
  motorized: Scalars["Boolean"]
  midi: MidiType
  protocol_inputs: Scalars["Int"]
  signal_protocol: Protocol
  can_expand: Scalars["Boolean"]
  max_sample_rate: SampleRate
  power?: Maybe<PowerInput>
}

export type Console = {
  __typename?: "Console"
  analog_connections?: Maybe<Array<AnalogConn>>
  network_connections?: Maybe<Array<NetworkConn>>
  faders: Scalars["Int"]
  motorized: Scalars["Boolean"]
  midi: MidiType
  protocol_inputs: Scalars["Int"]
  signal_protocol: Protocol
  can_expand: Scalars["Boolean"]
  max_sample_rate: SampleRate
  power: Power
}

export type Computer = {
  __typename?: "Computer"
  cpu_processor: Scalars["String"]
  ram_size: Scalars["Int"]
  total_storage: Scalars["Int"]
  model_year: Scalars["Int"]
  operating_system: Scalars["String"]
  dedicated_graphics?: Maybe<Scalars["Boolean"]>
  network_connections?: Maybe<Array<Maybe<NetworkConn>>>
  computer_ports?: Maybe<Array<Maybe<ComputerConn>>>
  power: Power
}

export type ComputerInput = {
  cpu_processor: Scalars["String"]
  ram_size: Scalars["Int"]
  total_storage: Scalars["Int"]
  model_year: Scalars["Int"]
  operating_system: Scalars["String"]
  dedicated_graphics: Scalars["Boolean"]
  network_connections?: Maybe<Array<NetworkConnInput>>
  computer_ports?: Maybe<Array<ComputerConnInput>>
  power: PowerInput
}

export type PowerInput = {
  lower_voltage?: Maybe<Scalars["Float"]>
  upper_voltage?: Maybe<Scalars["Float"]>
  wattage: Scalars["Float"]
  max_wattage: Scalars["Float"]
  redundant?: Maybe<Scalars["Boolean"]>
  input_connector: PowerConnector
  output_connector?: Maybe<PowerConnector>
}

export type Power = {
  __typename?: "Power"
  lower_voltage?: Maybe<Scalars["Float"]>
  upper_voltage?: Maybe<Scalars["Float"]>
  wattage: Scalars["Float"]
  max_wattage: Scalars["Float"]
  redundant?: Maybe<Scalars["Boolean"]>
  input_connector: PowerConnector
  output_connector?: Maybe<PowerConnector>
}

export type DimensionInput = {
  length: Scalars["Float"]
  width: Scalars["Float"]
  height: Scalars["Float"]
}

export type Dimension = {
  __typename?: "Dimension"
  length: Scalars["Float"]
  width: Scalars["Float"]
  height: Scalars["Float"]
}

export type NetworkConnInput = {
  port_id?: Maybe<Scalars["String"]>
  max_conn_speed: NetworkSpeed
  protocol: Protocol
}

export type NetworkConn = {
  __typename?: "NetworkConn"
  port_id?: Maybe<Scalars["String"]>
  max_conn_speed: NetworkSpeed
  protocol: Protocol
}

export type ComputerConnInput = {
  port_id?: Maybe<Scalars["String"]>
  port_kind: ComputerConnKind
  front_port?: Scalars["Boolean"]
}

export type ComputerConn = {
  __typename?: "ComputerConn"
  port_id?: Maybe<Scalars["String"]>
  port_kind: ComputerConnKind
  front_port: Scalars["Boolean"]
}

export type AnalogConnInput = {
  port_id: Scalars["String"]
  port_kind?: Analog
  signal_lines?: Scalars["Int"]
  port_usage?: AnalogUsage
}

export type AnalogConn = {
  __typename?: "AnalogConn"
  port_id: Scalars["String"]
  port_kind: Analog
  port_usage: AnalogUsage
  signal_lines: Scalars["Int"]
}

