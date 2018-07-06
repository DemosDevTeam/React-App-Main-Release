import 'react-native'
import React from 'react'

import { ArticleScreen } from '../../Screens'

import renderer from 'react-test-renderer'

jest.mock('../../firebaseApp')

test('render correctly', () => {
    const tree = renderer.create(<ArticleScreen />).toJSON()

    expect(tree).toMatchSnapshot()
})