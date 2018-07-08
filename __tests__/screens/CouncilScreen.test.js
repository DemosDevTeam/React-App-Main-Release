import 'react-native'
import React from 'react'

import { CouncilScreen } from '../../Screens'

import renderer from 'react-test-renderer'

test('render correctly', () => {
    const tree = renderer.create(<CouncilScreen />).toJSON()

    expect(tree).toMatchSnapshot()
})