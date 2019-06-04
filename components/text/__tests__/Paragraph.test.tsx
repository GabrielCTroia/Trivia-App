import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Paragraph } from '../Paragraph';

it('renders correctly', () => {
  const tree = renderer.create(<Paragraph>Snapshot test!</Paragraph>).toJSON();

  expect(tree).toMatchSnapshot();
});
