import { TextStyle, StyleSheet } from "react-native";

export const extraLargeFontSize = 60;
export const largeFontSize = 40;
export const baseFontSize = 16;

export const baseText: TextStyle = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  fontFamily: 'roboto-regular',
  fontSize: baseFontSize,
}

export const headerText: TextStyle = {
  ...baseText,
  fontSize: extraLargeFontSize,
  fontWeight: 'bold',
  fontFamily: 'roboto-black',
}

export const subheaderText: TextStyle = {
  ...baseText,
  fontSize: largeFontSize,
  fontWeight: 'bold',
  fontFamily: 'roboto-black',
}

export const centeredText: TextStyle = {
  textAlign: 'center',
}
