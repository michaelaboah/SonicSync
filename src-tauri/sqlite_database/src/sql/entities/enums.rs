#[allow(non_camel_case_types)]
use num_derive::FromPrimitive;
use serde::{Deserialize, Serialize};

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum Categories {
    #[default]
    GENERIC,
    CONSOLE,
    PROCESSOR,
    MONITORING,
    SPEAKER,
    AMPLIFIER,
    COMPUTER,
    NETWORK,
    RADIO,
    MICROPHONES,
    // SPK_HARDWARE,
}
#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum MidiType {
    USB,
    #[default]
    SERIAL,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum Analog {
    #[default]
    XLR_ANALOG,
    XLR_DIGITAL,
    TS,
    TRS,
    TRRS,
    TRI_PIN_PHOENIX,
    DUAL_PIN_PHOENIX,
    NL2,
    NL4,
    NL8,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum NetworkType {
    #[default]
    Ethernet,
    Wifi,
    Cellular,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum Protocol {
    #[default]
    IP,
    DANTE,
    AES_67,
    AVB,
    AVB_MILAN,
    OPTOCORE,
    ULTRANET,
    A_NET,
}
#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum SampleRate {
    #[default]
    HD,
    SD,
    UHD,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum ComputerPortType {
    #[default]
    USB_B,
    USB_A,
    USB_C,
    HDMI,
    MINI_HDMI,
    DISPLAYPORT,
    MINI_DISPLAYPORT,
    MIRCO_B,
    SD_CARD,
    FIREWIRE,
    USB_C_THUNDERBOLT,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum TransmitterConnector {
    #[default]
    TRRS,
    SHURE_TA4,
    MICRODOT,
    TRI_PIN,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum MicrophoneType {
    #[default]
    DYNAMIC,
    PRE_POLORAIZED_CONDENSOR,
    CONDENSOR,
    RIBBON,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum NetworkSpeeds {
    #[default]
    GIGABIT,
    TEN_GIGABIT,
    SUPERSPEED,
}

#[derive(
    Debug, Default, sqlx::Type, Deserialize, PartialEq, Serialize, Clone, Copy, FromPrimitive,
)]
#[repr(i64)]
pub enum PowerConnector {
    #[default]
    IEC,
    EDISON,
    EDISON_20A,
    POWERCON_20A,
    POWERCON_32A,
    POWERCON_TRUE1,
    POWERCON_TRUE1_TOP,
    L6_20,
    L6_30,
    L6_50,
    L6_60,
    POE,
    DC_12V,
}
