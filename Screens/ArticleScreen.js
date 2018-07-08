import React from 'react'

import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

import { Article, CommentCard } from '../components'

import firebaseApp from '../firebaseApp'

class ArticleScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            article: undefined
        }
    }

    componentDidMount = async () => {
        const { navigation } = this.props

        const article = navigation.getParam('article', undefined);
        const articleId = navigation.getParam('articleId', undefined);

        console.log(article, articleId)

        // If an article was passed in use that
        // Else check if an id was passed and fetch from database
        // Else throw an error
        if (article) {
            this.setState({ article })
        } else if (articleId) {
            const [err, articleSnapshot] = await to(this.fetchArticle(articleId));

            if (!articleSnapshot.val() || err) {
                throw new Error(err)
            }

            this.setState({ article: articleSnapshot.val() })
        } else {
            throw new Error("No article or article id params")
        }
    }

    fetchArticle = async (articleId) => {
        // TODO: City is currently hard coded
        return await firebaseApp.database().ref(`videos/greensboro/${articleId}`).once('value');
    }
    
    render() {
        const { article } = this.state

        /*
        const loading = (article) 
            ? <Article article={article} />
            : <ActivityIndicator /> 
        */

        return (
            <ScrollView style={{flex: 1}}> 
                <Text>{JSON.stringify(article)}</Text>
            </ScrollView>
        );
    }
}

export default ArticleScreen;