import 'react-native';
import React from 'react';
import { BlockText } from '../BlockText';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<BlockText>Snapshot test!</BlockText>).toJSON();

  expect(tree).toMatchSnapshot();
});
