import React, { FunctionComponent } from 'react';
import { ViewProps, StyleSheet, View } from 'react-native';
import * as Colors from '../../styles/Colors';

export type ProgressBarProps = ViewProps & {
  total: number;
  index: number;
  color?: string,
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({ color = Colors.baseTextColor, ...props }) => {
  const dots = Array(props.total).fill('.');

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.dots}>
        {dots.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, (i === props.index) && styles.currentDot, { backgroundColor: color }]}
          />
        ))}
      </View>
    </View>
  );
}

const dotSize = 8;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 15,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dot: {
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    width: dotSize,
    height: dotSize,
    borderRadius: 100 / 2,
    opacity: .5,
  },
  currentDot: {
    opacity: 1,
    width: dotSize * 1.2,
    height: dotSize * 1.2,
    marginTop: - dotSize * .1
  },
  hiddenDot: {
    display: 'none',
  },
});