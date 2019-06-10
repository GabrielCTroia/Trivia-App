import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { ListItem } from '../ListItem';
import { Text } from 'react-native';

it('renders correctly', () => {
  const tree = renderer.create(<ListItem content="test" />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with left side', () => {
  const tree = renderer.create(
    <ListItem
      content="test"
      leftSide={<Text>left side test</Text>}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with right side', () => {
  const tree = renderer.create(
    <ListItem
      content="test"
      rightSide={<Text>right side test</Text>}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with all sides', () => {
  const tree = renderer.create(
    <ListItem
      content="test"
      leftSide={<Text>left side test</Text>}
      rightSide={<Text>right side test</Text>}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
