import React, { FunctionComponent } from "react";
import { ReactNode } from "react";
import { View, StyleSheet, Text, ViewProps } from "react-native";
import { Card } from "./Card";

export type CardStackProps = ViewProps & {
  cards: ReactNode[];
}

export const CardStack: FunctionComponent<CardStackProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.cards}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#efefef',
  },
});
