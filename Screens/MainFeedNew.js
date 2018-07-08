/**
 * Main Feed (smart)
 * Molecule
 * Displays list of relevant articles to the user
 * requires authentication
 */

import React from 'react'

import { View, ScrollView, Text } from 'react-native'

import firebaseApp from '../firebaseApp'

import { FeedItem } from '../components'
import { to } from '../components/util';

class MainFeed extends React.Component {
    static navigationOptions = {
        visible: false
    }

    state = {
        articles: { }
    }

    componentDidMount = async () => {
        // Fetch all recent articles
        let err, articles;
        [err, articles] = await to(this.fetchArticles());

        if (!articles && err) {
            throw new Error("Failed to fetch articles")
        }

        this.setState({ articles });
    }

    fetchArticles = async () => {
        return firebaseApp.database().ref('/videos/Greensboro').once('value')
            .then(snapshot => {
                let articles = {}; 

                snapshot.forEach(child => {
                    articles[child.key] = child.val();
                })

                return articles
            })
    }

    _fetchArticlesMock = async () => {
        return new Promise((resolve, reject) => {
            const articles = {
                "articleid1": {
                    title: "Calls for Equality at UNC",
                    videoUri: 'https://youtu.be/FF8wzQV5u_0',
                    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                },
                "articleid2": {
                    title: 'Should Rosemary get streetlights?',
                    videoUri: 'https://www.youtube.com/embed/fSqkhN9Rqk0',
                    excerpt: 'Lorem ipsum',
                    pinned: true,
                }
            };

            resolve(articles);
        });
    }
    
    render() {
        let day;

        const { articles } = this.state; 

        let articlesJsx;
   
        // Empty check
        if (!articles || Object.entries(articles).length == 0) {
            articlesJsx = (
                <View>
                    <Text>Oh no! The political sphere is ruminating... (No articles available)</Text>
                </View>
            )
        } else {
            const { navigation } = this.props

            articlesJsx = Object.entries(articles).map(([articleId, article]) => (
                <FeedItem
                    key={articleId}
                    article={article}
                    onPress={() => navigation.navigate('Article', {
                        articleId,
                        article: {
                            'id': articleId, 
                            ...article
                        } 
                    })}
                />
            ))
        }

        return (
            <ScrollView styles={{flex: 1, justifyContent: 'space-between'}}>
                {articlesJsx}
            </ScrollView>
        );

    }
}

export default MainFeed