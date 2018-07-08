import 'react-native';
import React from 'react';

import { Feedback } from '../../components'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <Feedback />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});