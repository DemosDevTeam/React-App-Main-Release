import 'react-native'
import React from 'react'


import { MainFeedScreen } from '../../Screens'

import renderer from 'react-test-renderer'

test('render correctly', () => {
    const wrapper = shallow(<MainFeedScreen />);
    expect(wrapper).toMatchSnapshot();

    // Check user auth
    // Database should be hit
})