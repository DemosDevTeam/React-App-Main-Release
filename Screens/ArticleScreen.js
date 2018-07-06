import React from 'react'

import { View, ScrollView } from 'react-native'

import { ArticleCard, CommentCard } from '../components'

import firebaseApp from '../firebaseApp'

class ArticleScreen extends React.Component {

    async constructorDidMount() {
        const { navigation } = this.props

        const articleId = navigation.getParam('articleId', undefined);

        try {
            const articleSnapshot = await this.fetchArticle(articleId);
        } catch (error) {
            const {code, message} = error;

            console.error(code, message)
        }
    }

    fetchArticle = async (articleId) => {
        return await firebaseApp.database().ref(`articles/${articleId}`).once('value');
    }
    
    render() {
        return (
            <ScrollView>
                <ArticleCard />
            </ScrollView>
        );
    }
}

export default ArticleScreen;