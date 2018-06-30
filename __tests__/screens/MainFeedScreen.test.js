import 'react-native'
import React from 'react'


import { MainFeedScreen } from '../../Screens'

import renderer from 'react-test-renderer'

jest.mock('../../db')

test('render correctly', () => {
    const tree = renderer.create(<MainFeedScreen />).toJSON();
    expect(tree).toMatchSnapshot();

    // Check user auth
    // Database should be hit
})