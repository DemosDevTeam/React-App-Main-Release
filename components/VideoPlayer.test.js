import 'react-native'
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

import VideoPlayer from './VideoPlayer'

it('renders correctly', () => {
  const tree = renderer.create(
    <VideoPlayer />
  );
});