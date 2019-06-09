import React, { FunctionComponent, ReactElement } from "react";
import { View, StyleSheet, ViewProps, Text } from "react-native";
import * as Colors from "../../styles/Colors";
import * as Effects from "../../styles/Effects";


export type ListItemProps = ViewProps & {
  content: string;
  leftSide?: ReactElement;
  rightSide?: ReactElement;
};

export const ListItem: FunctionComponent<ListItemProps> = ({ leftSide = null, rightSide = null, ...props }) => {
  return (
    <View style={[styles.container, props.style]}>
      {leftSide && <View style={styles.leftSide}>{leftSide}</View>}
      <Text style={styles.content}>
        {props.content}
      </Text>
      {rightSide && <View style={styles.rightSide}>{rightSide}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    borderColor: Colors.lightShade,
    borderBottomWidth: 1,

    flex: 1,
    flexDirection: 'row',
  },

  leftSide: {
    flex: .2,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    color: Colors.baseTextColor,
  },

  rightSide: {
    flex: .1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
});
