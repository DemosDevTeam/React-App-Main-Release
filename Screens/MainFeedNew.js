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
import compose from '../components/util/compose' 
import { hasLoader, hasError } from '../components/util/hoc';

class MainFeed extends React.Component {
    state = {
        articles: { }
    }

    componentDidMount = async () => {
        try {
            const articles = await this._fetchArticlesMock();
            this.setState({ articles });
        } catch (error) {
            console.error(error);
        }
    }

    fetchArticles = async () => {
        // firebaseApp.database().ref('/tags')
        // Fetches articles sorted by data;
    }

    _fetchArticlesMock = async () => {
        return new Promise((resolve, reject) => {
            const articles = {
                "articleid1": {
                    title: "Calls for Equality at UNC",
                    videoId: 'https://youtu.be/FF8wzQV5u_0',
                    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                },
                "articleid2": {
                    title: 'Should Rosemary get streetlights?',
                    videoId: 'jgMfYgsRvQ8',
                    excerpt: 'Lorem ipsum',
                    pinned: true,
                    tags: ['Safety', 'Education']
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
            articlesJsx = Object.entries(articles).map(([article_id, article]) => {
                const { title, videoId, excerpt, pinned, tags } = article;

                return (<FeedItem
                    key={article_id}
                    title={title}
                    videoUri={videoId}
                    excerpt={excerpt}
                    pinned={false}
                    tags={tags}
                />);
            })
        }

        return (
            <ScrollView>
                {articlesJsx}
            </ScrollView>
        );

    }
}

export default compose(
    hasLoader,
)(MainFeed)