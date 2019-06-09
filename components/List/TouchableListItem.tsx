import React, { FunctionComponent } from "react";
import { ViewProps, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem, ListItemProps } from "./ListItem";
import { Ionicons } from '@expo/vector-icons';
import * as Colors from "../../styles/Colors";


export type TouchableListItemProps = ViewProps & ListItemProps & {
  onPress: () => void;
};

export const TouchableListItem: FunctionComponent<TouchableListItemProps> = ({ style: propsStyle, ...props }) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ListItem
        rightSide={<Ionicons style={{fontWeight: 'bold'}} name="ios-arrow-forward" color={Colors.lightShade} size={22} />}
        style={[styles.listItem, propsStyle]}
        {...props}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    // shadowColor: '#ccc',
    // shadowOffset: { width: 5, height: 5 },
    // shadowRadius: 1,
    // shadowOpacity: .5,
    // borderBottomColor: Colors.yellowColor,
    // borderBottomWidth: 1,
  }
});