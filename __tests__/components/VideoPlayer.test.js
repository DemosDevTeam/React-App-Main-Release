import 'react-native'
import React from 'react';

jest.useFakeTimers()

import { VideoPlayer } from '../../components'

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <VideoPlayer />
  );

  expect(tree).toMatchSnapshot()
});