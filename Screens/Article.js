import React from 'react'

import { View } from 'react-native'

import { ArticleCard, CommentCard } from '../components'

export default class ArticleScreen extends React.Component {
    render() {
        return (
            <View>
                <ArticleCard />
                <CommentCard />
            </View>
        );
    }
}