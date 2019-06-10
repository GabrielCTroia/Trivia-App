import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { HomeScreen } from '../HomeScreen';
import { NavigationScreenProp } from 'react-navigation';

it('renders correctly', () => {
  const mockNavigation = {} as unknown as NavigationScreenProp<any, any>;

  const tree = renderer.create(<HomeScreen navigation={mockNavigation} />).toJSON();

  expect(tree).toMatchSnapshot();
});
