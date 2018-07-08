import React from 'react'

import { View, ScrollView, ActivityIndicator } from 'react-native'

import { Article, CommentCard } from '../components'

import firebaseApp from '../firebaseApp'

class ArticleScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            article: undefined
        }
    }

    async constructorDidMount() {
        const { navigation } = this.props

        const articleId = navigation.getParam('articleId', undefined);

        try {
            if (!articleId) {
                throw new Error("No article id provided")
            }

            const articleSnapshot = await this.fetchArticle(articleId);

            if (articleSnapshot.val()) {
                this.setState({ article: articleSnapshot.val() })                
            }
        } catch (error) {
            const {code, message} = error;

            console.error(code, message)
        }
    }

    fetchArticle = async (articleId) => {
        return await firebaseApp.database().ref(`articles/${articleId}`).once('value');
    }
    
    render() {
        const { article } = this.state

        const loading = (article) 
            ? <Article 
                title={article.title}
                videoUri={article.videoUri}
                content={article.content}
                source={article.source}
            /> 
            : <ActivityIndicator /> 

        return (
            <ScrollView>
                {loading}
            </ScrollView>
        );
    }
}

export default ArticleScreen;