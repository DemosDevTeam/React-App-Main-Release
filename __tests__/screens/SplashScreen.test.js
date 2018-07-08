import 'react-native'
import React from 'react'

import SplashScreen from '../../Screens/Home'

import renderer from 'react-test-renderer'

test('render correctly', () => {
    const tree = renderer.create(<SplashScreen />).toJSON()

    expect(tree).toMatchSnapshot()
})