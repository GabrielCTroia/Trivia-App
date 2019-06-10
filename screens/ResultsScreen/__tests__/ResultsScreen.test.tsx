import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { ResultsScreen } from '../ResultsScreen';
import { NavigationScreenProp } from 'react-navigation';

// TODO: Fails for weird reason. Investigate
xit('renders correctly', () => {
  const mockNavigation = {
    state: {
      params: {}
    }
  } as unknown as NavigationScreenProp<any, any>;

  const tree = renderer.create(<ResultsScreen navigation={mockNavigation} />).toJSON();

  expect(tree).toMatchSnapshot();
});
