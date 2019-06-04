import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  TouchableOpacityProps,
  Text,
} from 'react-native';

interface IProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle,
}

export class StyledButton extends React.Component<IProps> {
  render() {
    return (<TouchableOpacity onPress={this.props.onPress}>
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignContent: 'center',
  },

  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 20,
  }
})