import 'react-native'

import React from 'react'
import { View } from 'react-native'

import { catchComponent } from '../../components'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(
        catchComponent(<View />)
    );

    expect(tree).toMatchSnapshot()
})