import { TextStyle, StyleSheet } from "react-native";
import * as Colors from './Colors';

export const largestFontSize = 60;
export const extraLargeFontSize = 40;
export const largeFontSize = 32;
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
  fontFamily: 'roboto-black',
  color: Colors.headerTextColor,
}

export const headerTextInverted: TextStyle = {
  ...headerText,
  color: Colors.headerTextColorInverted,
}

export const subheaderText: TextStyle = {
  ...baseText,
  fontSize: largeFontSize,
  fontFamily: 'roboto-regular',
  color: Colors.subheaderTextColor,
}

export const centeredText: TextStyle = {
  textAlign: 'center',
}
