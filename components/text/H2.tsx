import * as React from 'react';
import { BlockText, BlockTextProps } from './BlockText';
import { StyleSheet } from 'react-native';

export class H2 extends React.Component<BlockTextProps> {
  render() {
    const { style: passedStyle, ...restProps } = this.props;

    return <BlockText {...restProps} style={[styles.container, passedStyle]} />
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 40,
    fontWeight: "bold",
    // fontFamily: 'Roboto',
  }
});