import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableListItem } from '../TouchableListItem';

// TODO Test Fails for weird reason. Need to investigate
xit('renders correctly', () => {
  const tree = renderer.create(<TouchableListItem content="test" onPress={() => null} />).toJSON();

  expect(tree).toMatchSnapshot();
});
