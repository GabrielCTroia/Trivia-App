import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { HeaderBar } from '../HeaderBar';

// beforeEach()



// TODO: Test fails for weird reason. need to investigate why the useNavigation
//  hook doesn't work.
it('renders correctly', () => {
  const tree = renderer.create(<HeaderBar />).toJSON();

  expect(tree).toMatchSnapshot();
});
