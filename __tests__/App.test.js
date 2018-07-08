import 'react-native'
import React from 'react'

import App from '../App'

import renderer from 'react-test-renderer'

describe('<App />', () => {
    test('it renders', () => {
        let wrapper = shallow(<App />)

        expect(wrapper).toMatchSnapshot()
    });
})