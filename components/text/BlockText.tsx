import * as React from 'react';
import { Text, StyleSheet, View, TextProperties } from 'react-native';

export interface BlockTextProps extends TextProperties { };

/**
 * This is a simple text inside a View.
 * Similar to <p>, <h1>, <h2>, etc...
 */
export class BlockText extends React.Component<BlockTextProps> {
  render() {
    const { style, ...restProps } = this.props;

    return (
      <View>
        <Text {...restProps} style={[styles.text, style]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    // custom styles
  }
});
