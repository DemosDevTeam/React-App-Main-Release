import React from 'react';

import { Article } from '../../components'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  /*
  const title = "Injustice";
  const video_source = "";
  const pinned = false;
  const excerpt = "";
  */

  const tree = renderer.create(
    <Article />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});