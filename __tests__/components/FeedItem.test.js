import React from 'react';

import { FeedItem } from '../../components'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  /*
  const title = "Injustice";
  const video_source = "";
  const pinned = false;
  const excerpt = "";
  */

  const wrapper = shallow(<FeedItem />);

  expect(wrapper).toMatchSnapshot();
});