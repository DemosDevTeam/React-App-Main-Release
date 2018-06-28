import 'react-native'
import React from 'react'

jest.mock('../../db')

import { MainFeedScreen } from '../../Screens'

import renderer from 'react-test-renderer'

test('render correctly', () => {
    const tree = renderer.create(<MainFeedScreen />).toJSON();
    expect(tree).toMatchSnapshot();

    // Check user auth
    // Database should be hit
})