/**
 * Main Feed (smart)
 * Molecule
 * Displays list of relevant articles to the user
 * requires authentication
 */

import React from 'react'

import { View, ScrollView, Text } from 'react-native'

import { database } from '../db'

import { FeedItem } from '../components'

export default class MainFeed extends React.Component {
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
        // Fetches articles sorted by data;
    }

    _fetchArticlesMock = async () => {
        return new Promise((resolve, reject) => {
            const articles = {
                "articleid1": {
                    title: "Calls for Equality at UNC",
                    videoId: 'jgMfYgsRvQ8',
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
                    videoId={videoId}
                    excerpt={excerpt}
                    pinned={false}
                    tags={tags}
                />);
            })
        }

        return (
            <ScrollView>
                <Text>Hello</Text>
                {articlesJsx}
                <Text>Goodbye</Text>
            </ScrollView>
        );

    }
}