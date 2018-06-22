import 'react-native';
import React from 'react';

import FeedCard from './FeedCard'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <FeedCard />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});