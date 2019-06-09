import React, { FunctionComponent } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  Text,
  TextStyle,
} from 'react-native';
import * as Colors from '../../styles/Colors';


export enum ButtonTypes {
  clear = 'clear',
  success = 'success',
  positive = 'positive',
  warning = 'warning',
  danger = 'danger',
}

type StyledButtonProps = TouchableOpacityProps & {
  title: string;
  buttonType?: ButtonTypes;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const StyledButton: FunctionComponent<StyledButtonProps> = ({ buttonType = ButtonTypes.success, ...props }) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, styles[buttonType], props.style]}
  >
    <Text
      style={[styles.text, styles[`text${buttonType}`], props.textStyle]}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignContent: 'center',
    borderRadius: 16,
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.baseTextColorInverted,
  },
  ['text' + ButtonTypes.clear]: {
    color: Colors.baseTextColor,
  },

  [ButtonTypes.success]: {
    backgroundColor: Colors.successColor,
  },

  [ButtonTypes.positive]: {
    backgroundColor: Colors.positiveColor,
  },

  [ButtonTypes.clear]: {

  },

  [ButtonTypes.warning]: {
    backgroundColor: Colors.warningColor,
  },

  [ButtonTypes.danger]: {
    backgroundColor: Colors.dangerColor,
  },
})