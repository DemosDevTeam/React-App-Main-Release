import 'react-native'
import React from 'react'

import firebaseApp from '../../firebaseApp'
import { Article } from '../../components'
import { ArticleScreen } from '../../Screens'

import TestRenderer from 'react-test-renderer'

const articleId = "test_article_id_1"
const articlePath = `articles/${articleId}`
const article = {
    title: "title"
}
const fb = firebaseApp.initializeApp()

beforeEach(() => {
    fb.database().ref(articlePath).data = article
})

test('render correctly', () => {
    const wrapper = shallow(<ArticleScreen />)
    expect(wrapper).toMatchSnapshot()
})

test('it fetches an article', async () => {
    const wrapper = shallow(
        <ArticleScreen 
            navigation={{
                getParam: (key) => (key == 'articleId') 
                    ? articleId 
                    : null
            }}
        />
    )

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.state('article')).toBeFalsy()

    // Article screen should try to fetch an article at least once
    expect(fb.database().ref(articlePath).once.mock.calls.length).toBe(1)
})

