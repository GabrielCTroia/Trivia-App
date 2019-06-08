import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { CardStack } from '../CardStack';
import { Text } from 'react-native';

it('renders correctly', () => {
  const items = [
    {
      id: 1,
      title: 'Item 1',
    },
    {
      id: 2,
      title: 'Item 1',
    },
    {
      id: 3,
      title: 'Item 1',
    }
  ]

  const tree = renderer.create(
    <CardStack
      items={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={(item) => <Text>{item.title}</Text>}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
