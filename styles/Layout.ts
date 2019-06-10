import { Dimensions } from 'react-native';
import { Constants } from 'expo';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const isSmallDevice = screenWidth < 375;

export const screenHorizontalPadding = 20;
export const screenVerticalPadding = 20;
export const insetPadding = 20;

export const screenLayout = {
  flex: 1,
  paddingLeft: screenHorizontalPadding,
  paddingRight: screenHorizontalPadding,
  paddingTop: Constants.statusBarHeight,
}
export const screenLayoutWithoutHeader = {
  ...screenLayout,
  paddingTop: Constants.statusBarHeight + 62,
}

export const screenBorderRadius = 45;
