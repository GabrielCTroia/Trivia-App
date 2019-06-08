import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { Easing, Animated } from 'react-native';
import { ResultsScreen } from '../screens/ResultsScreen';

const iosTransitionSpec = {
  duration: 500,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing,
}

const transitionConfig = () => {
  return {
    transitionSpec: iosTransitionSpec,
    screenInterpolator: (sceneProps: any) => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const height = layout.initHeight;

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [height, 0],
      })

      return { transform: [{ translateY }] }
    },
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Quiz: QuizScreen,
  Results: ResultsScreen,
}, { transitionConfig });

export default createAppContainer(createSwitchNavigator({
  Main: HomeStack,
}));