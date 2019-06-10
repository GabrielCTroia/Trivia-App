import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { QuizScreen } from '../QuizScreen';
import { NavigationScreenProp } from 'react-navigation';

it('renders correctly', () => {
  const mockNavigation = {
    state: {
      params: {},
    }
  } as unknown as NavigationScreenProp<any, any>;

  const tree = renderer.create(<QuizScreen navigation={mockNavigation} />).toJSON();

  expect(tree).toMatchSnapshot();
});
