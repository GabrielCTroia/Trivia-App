import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Colors from '../../styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as NHooks from 'react-navigation-hooks';


export type HeaderBarProps = {
  type?: 'light' | 'dark';
}

export const HeaderBar: FunctionComponent<HeaderBarProps> = ({ type = 'dark' }) => {
  const { goBack } = NHooks.useNavigation();

  return (
    <TouchableOpacity style={styles.headerBar} onPress={() => goBack()}>
      <Ionicons
        name="ios-arrow-back"
        color={(type === 'dark') ? Colors.lightShade : Colors.darkBlueColorLighter}
        size={32}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});