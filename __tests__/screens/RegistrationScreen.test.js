import 'react-native'
import React from 'react'

import { RegistrationScreen } from '../../Screens'

import renderer from 'react-test-renderer'

jest.mock('../../firebaseApp')

test('render correctly', () => {
    const tree = renderer.create(<RegistrationScreen />).toJSON()

    expect(tree).toMatchSnapshot()
})