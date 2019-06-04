import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { StyledButton } from '../StyledButton';

it('renders correctly', () => {
  const tree = renderer.create(<StyledButton title="Snapshot Button" />).toJSON();

  expect(tree).toMatchSnapshot();
});
