import * as React from 'react';
import { StyleSheet, Animated, PanResponder, ViewProps } from 'react-native';
import { VoidFunction } from '../../util';


export type CardProps = {
  onSwipeLeft: VoidFunction;
  onSwipeRight: VoidFunction;
} & ViewProps;

interface State {
  pan: Animated.ValueXY;
}

export class Card extends React.Component<CardProps, State> {

  private panResponder: any;

  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  }

  constructor(props: CardProps) {
    super(props);

    this.panResponder = null;

    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    var prevPanX = 0;
    this.state.pan.x.addListener(({ value }) => prevPanX = value);

    var prevPanY = 0;
    this.state.pan.y.addListener(({ value }) => prevPanY = value);

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({ x: prevPanX, y: prevPanY });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        if (prevPanX < -150) {
          Animated.spring(this.state.pan, {
            toValue: {
              x: -300,
              y: prevPanY,
            },
          }).start()

          this.props.onSwipeLeft();
        } else if (prevPanX > 150) {
          Animated.spring(this.state.pan, {
            toValue: {
              x: 300,
              y: prevPanY,
            }
          }).start()

          this.props.onSwipeRight();
        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
          }).start()
        }
      }
    });
  }

  private getAnimatedStyle() {
    const { pan } = this.state;

    // Calculate the x and y transform from the pan value
    const [translateX, translateY] = [pan.x, pan.y];

    return {
      transform: [{ translateX }, { translateY }],
      rotate: pan.x.interpolate({
        inputRange: [-150, 0, 150],
        outputRange: ["-20deg", "0deg", "20deg"]
      }),
      opacity: pan.x.interpolate({ inputRange: [-250, 0, 250], outputRange: [.7, 1, .7] })
    };
  }

  render() {
    return (
      <Animated.View
        style={[this.getAnimatedStyle(), styles.container, this.props.style]}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
});
