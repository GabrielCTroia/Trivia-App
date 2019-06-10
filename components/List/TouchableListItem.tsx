import React, { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem, ListItemProps } from './ListItem';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../../styles/Colors';


export type TouchableListItemProps = ListItemProps & {
  onPress: () => void;
};

export const TouchableListItem: FunctionComponent<TouchableListItemProps> = (props) => {
  const icon = <Ionicons name="ios-arrow-forward" color={Colors.lightShade} size={22} />;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <ListItem
        rightSide={icon}
        style={props.style}
        {...props}
      />
    </TouchableOpacity>
  );
}
